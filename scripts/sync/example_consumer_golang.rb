#!/usr/bin/env ruby

require 'octokit'
require 'base64'
require 'fileutils'
require 'pathname'
require_relative 'support'

SOURCE_REPO = 'pactflow/example-consumer-golang'
DESTINATION_DIR = relative_path_to('website/docs/docs/examples/golang/consumer/')
TRANSFORM_PATH = -> (path) { File.join(DESTINATION_DIR, path.downcase) }
INCLUDE = [
  ->(path) { %w{README.md}.include?(path) }
]
IGNORE = []

CUSTOM_ACTIONS = [
  [:all, ->(md_file_contents) {
    md_file_contents.enable_headers
    md_file_contents.extract_title
    md_file_contents.fields[:sidebar_label] = md_file_contents.fields[:title]
    md_file_contents.add_lines_at_start("## Source Code\n\nhttps://github.com/#{SOURCE_REPO}\n")
   }
  ]
]


FileUtils.mkdir_p DESTINATION_DIR

sync(SOURCE_REPO, INCLUDE, IGNORE, TRANSFORM_PATH, CUSTOM_ACTIONS)
