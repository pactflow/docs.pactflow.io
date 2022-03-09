#!/usr/bin/env ruby

require 'addressable'
require 'octokit'
require 'base64'
require 'fileutils'
require 'pathname'

module UrlAbsolutizer
  extend self

  def absolutize_links(contents, source_repository_slug, path_transformer, contents_source_path, source_paths, branch)
    contents.gsub(/\]\(([^)]+)\)/) do |match|
      url = match[2..-2]

      transformed_path = path_transformer.call(url.delete_prefix('/'))
      if url.start_with?('http', '#')
        match
      elsif source_paths.include?(url.delete_prefix('/'))
        "](#{transformed_path})"
      elsif url.split(' ').length > 2
        # Markdown Image format
        parts = url.split(' ')
        absolute_url = Addressable::URI.parse("https://raw.githubusercontent.com/#{source_repository_slug}/#{branch}/#{parts[0]}").to_s
        "](#{absolute_url})"
      else
        path_from_root = if url.start_with?('.')
                           File.join(File.dirname(contents_source_path), url)
                         else
                           url.delete_prefix('/')
        end

        # absolute_url = (Addressable::URI.parse("https://raw.githubusercontent.com/#{source_repository_slug}/#{branch}/#{parts[0]}")).to_s
        absolute_url = (Addressable::URI.parse("https://raw.githubusercontent.com/#{source_repository_slug}/#{branch}/") + path_from_root).to_s
        "](#{absolute_url})"
      end
    end
  end
end

class MarkdownFileContents
  attr_accessor :lines, :fields, :comments, :headers

  def initialize(lines, fields = {}, comments = [], headers = false)
    @lines = lines
    @fields = fields
    @comments = comments
    @headers = headers
    @headers = headers
  end

  def extract_title
    heading_underline_index = lines.find_index { |line| line.start_with?('======') }

    if heading_underline_index && heading_underline_index > 0
      lines.delete_at(heading_underline_index)
      title = lines.delete_at(heading_underline_index - 1).strip
      fields[:title] = title
    else
      heading_index = lines.find_index { |line| line.start_with?('#') }
      if heading_index
        title = lines.delete_at(heading_index).gsub(/^#+/, '').strip
        fields[:title] = title
      else
        raise "Could not find a heading for page with head lines #{lines[0..5].join}"
      end
    end
  end

  def enable_headers
    self.headers = true
  end

  def to_s
    comments_maybe_newlines = comments.dup
    comments_maybe_newlines << '' if lines.first && lines.first.strip != ''
    if headers
      ['---', header_lines, '---', '', comments_maybe_newlines, lines].flatten.join("\n") + "\n"
    else
      [lines, '', comments_maybe_newlines].flatten.join("\n") + "\n"
    end
  end

  def find_and_replace(find, replace)
    @lines = lines.collect { |line| line.gsub(find, replace) }
  end

  def remove_lines_including(substring)
    @lines = lines.select { |line| !line.include?(substring) }
  end

  def add_lines_at_start(*new_lines)
    @lines = new_lines + lines
  end

  def clean_up_changelog
    @lines = lines.collect do |line|
      if line.start_with?('#')
        line
      elsif line.strip.size.zero?
        line
      elsif line.include?('feat:') || line.include?('fix:') || line.include?('Merge pull request')
        line
      end
    end.compact
  end

  def absolutize_links(repository_slug, path_transformer, contents_source_path, source_paths, branch)
    @lines = lines.collect { |line| UrlAbsolutizer.absolutize_links(line, repository_slug, path_transformer, contents_source_path, source_paths, branch) }
  end

  private

  # Not necessary for pages that are already in docusaurus format
  def header_lines
    fields.collect do |k, v|
      "#{k}: #{v}"
    end.compact
  end
end

PROJECT_ROOT = File.expand_path(File.join(__FILE__, '..', '..', '..'))

def relative_path_to(path)
  Pathname.new(File.join(PROJECT_ROOT, path)).relative_path_from(Pathname.pwd)
end

def edit_comment_for(slug)
  "<!-- This file has been synced from the #{slug} repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->"
end

def get_file_list(repository_slug, include_conditions, exclude_conditions = [], branch)
  client = Octokit::Client.new(access_token: ENV['GITHUB_ACCESS_TOKEN'])
  client.auto_paginate = true
  tree = client.tree(repository_slug, branch, recursive: true).tree
  if include_conditions.any? || exclude_conditions.any?
    filter_file_list(tree, include_conditions, exclude_conditions)
  else
    tree
  end
end

def filter_file_list(file_list, include_conditions, exclude_conditions = [])
  file_list.select do |file|
    include_conditions.any? { |lambda| lambda.call(file.path) } && !exclude_conditions.any? { |lambda| lambda.call(file.path) }
  end
end

def each_file(files)
  files.each do |file|
    file_resource = file.rels[:self].get
    yield file.path, Base64.decode64(file_resource.data.content) unless file_resource.data.content.nil?
  end
end

def select_actions(custom_actions, path)
  custom_actions
    .select { |selector, _| selector == :all || selector == path || (selector.respond_to?(:call) && selector.call(path)) }
    .collect(&:last)
end

def process_file(path, content, path_transformer, custom_actions, comment, source_file_paths = nil, source_repository_slug = nil, branch = 'master')
  destination = path_transformer.call(path)
  fields = { custom_edit_url: "https://github.com/#{source_repository_slug}/edit/#{branch}/#{path}" }
  md_file_contents = MarkdownFileContents.new(content.split("\n"), fields, [comment])
  select_actions(custom_actions, path).each { |action| action.call(md_file_contents) }
  if source_file_paths && source_repository_slug
    md_file_contents.absolutize_links(source_repository_slug, path_transformer, path, source_file_paths, branch)
  end

  puts "Writing file #{destination}"
  FileUtils.mkdir_p(File.dirname(destination))
  File.open(destination, 'w') { |file| file << md_file_contents.to_s }
  md_file_contents
end

def sync(source_repository_slug, include_filter, ignore_filter, path_transformer, actions, branch = 'master')
  file_list = get_file_list(source_repository_slug, include_filter, ignore_filter, branch)
  processed_files = each_file(file_list) do |path, content|
    process_file(path, content, path_transformer, actions, edit_comment_for(source_repository_slug), file_list.collect(&:path), source_repository_slug, branch)
  end
end
