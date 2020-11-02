#!/usr/bin/env ruby

require 'octokit'
require 'base64'
require 'fileutils'
require 'pathname'
require_relative 'support'

SOURCE_REPO = 'pactflow/docs.pactflow.io'
DESTINATION_DIR = relative_path_to('website')
TRANSFORM_PATH = -> (path) { File.join(DESTINATION_DIR, path.downcase) }
INCLUDE = [
  ->(path) { path.match("ci-cd") }
]
IGNORE = []

CUSTOM_ACTIONS = []


FileUtils.mkdir_p DESTINATION_DIR

sync(SOURCE_REPO, INCLUDE, IGNORE, TRANSFORM_PATH, CUSTOM_ACTIONS)
