#!/usr/bin/env ruby

require 'octokit'
require 'base64'
require 'fileutils'
require 'pathname'
require_relative 'support'

SOURCE_REPO = 'pactflow/example-bi-directional-consumer-playwright-js'.freeze
DESTINATION_DIR = relative_path_to('website/docs/docs/examples/bi-directional/consumer/playwright_js')
TRANSFORM_PATH = ->(path) { File.join(DESTINATION_DIR, path.downcase) }
INCLUDE = [
  ->(path) { %w[README.md].include?(path) }
].freeze
IGNORE = [].freeze

CUSTOM_ACTIONS = [
  [:all, lambda { |md_file_contents|
           md_file_contents.enable_headers
           md_file_contents.extract_title
           md_file_contents.fields[:sidebar_label] = md_file_contents.fields[:title]
           md_file_contents.add_lines_at_start("## Source Code\n\nhttps://github.com/#{SOURCE_REPO}\n")
         }]
].freeze

FileUtils.mkdir_p DESTINATION_DIR

sync(SOURCE_REPO, INCLUDE, IGNORE, TRANSFORM_PATH, CUSTOM_ACTIONS, 'main')
