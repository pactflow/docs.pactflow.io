#!/usr/bin/env ruby

require 'optparse'
require 'fileutils'
require 'json'
require 'net/http'
require 'uri'
require 'date'

# Configuration
DOCS_ROOT_DIR = Dir.pwd
PACTFLOW_APPLICATION_DIR = "#{DOCS_ROOT_DIR}/scripts/release/.pactflow-application"
ONPREM_PROD_IMAGE = 'quay.io/pactflow/enterprise:latest'
JIRA_PROJECT_ID = 17612
JIRA_URL = 'https://smartbear.atlassian.net'

# Parse options
options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: release-notes-onprem.rb [options]"

  opts.on("-t", "--tag TAG", "Dev tag") { |v| options[:dev_tag] = v }
  opts.on("-r", "--release RELEASE", "Release") { |v| options[:is_release] = v }
  opts.on("-v", "--version VERSION", "Release version") { |v| options[:release_version] = v }
  opts.on("--recompile-notes", "Recompile notes") { options[:recompile_notes] = true }
  opts.on("--debug", "Debug mode") { options[:debug] = true }
end.parse!

# Validation
if options[:release_version].nil?
  puts "Version has not been provided."
  exit 128
end

if ENV['JIRA_AUTH'].nil?
  puts "JIRA_AUTH not set, please set it by exporting JIRA_AUTH=email:token"
  exit 128
end

JIRA_USER = ENV['JIRA_AUTH'].split('@').first
BRANCH_NAME = "release/#{options[:release_version]}"

# Helper methods
def run_command(command)
  puts command if options[:debug]
  `#{command}`
end

def jira_parse_release_notes_from_file(jira_id)
  file = "jira_#{jira_id}.json"
  unless File.exist?(file)
    puts "Error: File #{file} not found"
    return nil
  end

  data = JSON.parse(File.read(file))
  type = data.dig('fields', 'customfield_11009', 'content', 0, 'type') rescue 'error'
  return nil if type == 'error'

  case type
  when 'paragraph'
    data.dig('fields', 'customfield_11009', 'content').map { |c| c.dig('content', 0, 'text') }.join(' ')
  when 'bulletList'
    data.dig('fields', 'customfield_11009', 'content').map { |c| c.dig('content', 0, 'content', 0, 'text') }.join(', ')
  when 'doc'
    data.dig('fields', 'customfield_11009', 'content').map { |c| c.dig('content', 0, 'content', 0, 'content', 0, 'text') }.join(' ')
  else
    puts "Error: Unsupported content type #{type} in #{file}"
    nil
  end
end

# Main script
if options[:recompile_notes]
  puts "Running in recompile notes mode"
  puts "This assumes there is already:"
  puts "  - a branch for this release"
  puts "  - a version in Jira for this release"
  puts "  - latest image pulled from quay.io"
  puts "  - latest application code is pulled from git"
  puts "  - the script was run previously which creates a version in Jira"
  puts "-------------------------------------------------"
end

puts "Configuration:"
puts "  DOCS_ROOT_DIR: #{DOCS_ROOT_DIR}"
puts "  PACTFLOW_APPLICATION_DIR: #{PACTFLOW_APPLICATION_DIR}"
puts "  ONPREM_PROD_IMAGE: #{ONPREM_PROD_IMAGE}"
puts "  JIRA_PROJECT_ID: #{JIRA_PROJECT_ID}"
puts "  JIRA_URL: #{JIRA_URL}"
puts "  JIRA_USER: #{JIRA_USER}"
puts "  BRANCH_NAME: #{BRANCH_NAME}"

previous_release_number = run_command("git ls-tree -r --name-only HEAD website/docs/docs/on-premises/releases | while read filename; do echo \"$(git log --date=unix -1 --format=\"%ad\" -- $filename) $filename\"; done | sort | tail -n1 | awk -F'/' '{print $NF}' | cut -d '.' -f 1-3").strip
puts "  Previous-release-number: #{previous_release_number}"

puts "------- Code checkout --------------------------"
if options[:recompile_notes]
  puts "Reusing cached application..."
  Dir.chdir(PACTFLOW_APPLICATION_DIR)
else
  puts "Fetching application code from git"
  FileUtils.rm_rf(PACTFLOW_APPLICATION_DIR) if Dir.exist?(PACTFLOW_APPLICATION_DIR)
  run_command("git clone --shallow-since=$(date -v -6m \"+%Y-%m-%d\") git@github.com:pactflow/pactflow-application.git #{PACTFLOW_APPLICATION_DIR} >/dev/null 2>&1")
  Dir.chdir(PACTFLOW_APPLICATION_DIR)
end
puts "-------- Done -------------------------------"

previous_tag = run_command("git tag -l --sort=-v:refname | grep -E #{previous_release_number} | head -n 1").strip
previous_tag_sha = run_command("git rev-list -n 1 #{previous_tag}").strip

options[:dev_tag] ||= previous_tag_sha
puts "  Previous-tag: #{previous_tag} (inferring from previous release)"

if options[:recompile_notes]
  puts "Reusing cached docker image... #{ONPREM_PROD_IMAGE}" if options[:debug]
else
  puts "Pulling latest image... #{ONPREM_PROD_IMAGE}" if options[:debug]
  run_command("docker pull #{ONPREM_PROD_IMAGE} >/dev/null 2>&1")
end

prod_tag = run_command("docker inspect #{ONPREM_PROD_IMAGE} | jq -r '.[0].Config.Env[] | select(startswith(\"PACTFLOW_GIT_SHA=\"))' | cut -d \"=\" -f2").strip
options[:dev_tag] ||= 'HEAD'

puts "  Prod-git-tag: #{prod_tag}"
puts "  Dev-git-tag: #{options[:dev_tag]}"

if options[:is_release]
  if options[:recompile_notes]
    puts "Reusing branch for this release..." if options[:debug]
    Dir.chdir(DOCS_ROOT_DIR)
    current_branch = run_command("git branch --show-current").strip
    if current_branch != BRANCH_NAME
      puts "Switching to branch #{BRANCH_NAME}"
      run_command("git checkout #{BRANCH_NAME}")
    end
    Dir.chdir(PACTFLOW_APPLICATION_DIR)
  else
    puts "Creating a branch for this release..." if options[:debug]
    Dir.chdir(DOCS_ROOT_DIR)
    run_command("git checkout -b #{BRANCH_NAME}")
    Dir.chdir(PACTFLOW_APPLICATION_DIR)
  end

  if options[:recompile_notes]
    puts "Fetching version ID for #{options[:release_version]}" if options[:debug]
    response = Net::HTTP.get(URI("#{JIRA_URL}/rest/api/3/project/#{JIRA_PROJECT_ID}/versions"))
    version_id = JSON.parse(response).find { |v| v['name'] == options[:release_version] }['id'] rescue nil
    if version_id.nil?
      puts "  ERROR: Version #{options[:release_version]} not found in Jira"
      puts "  the option --recompile-notes is only valid if the version was created in the previous run"
      exit 128
    end
  else
    puts "Creating #{options[:release_version]} in Jira #{JIRA_PROJECT_ID}" if options[:debug]
    payload_version = {
      archived: false,
      name: options[:release_version],
      projectId: JIRA_PROJECT_ID,
      released: false,
      description: "OnPrem Release for #{options[:release_version]} by #{JIRA_USER}"
    }.to_json

    uri = URI("#{JIRA_URL}/rest/api/3/version")
    request = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
    request.basic_auth(ENV['JIRA_AUTH'].split(':').first, ENV['JIRA_AUTH'].split(':').last)
    request.body = payload_version
    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(request) }
    error_message = JSON.parse(response.body)['errorMessages'] rescue nil
    if error_message
      puts "Error creating version: #{error_message} #{response.body}"
      puts "Note: if you need to delete a version, which was created accidentally, you can use the following command: "
      puts "curl --request DELETE --url 'https://smartbear.atlassian.net/rest/api/3/version/{id}' --user \"$JIRA_AUTH\" --header 'Accept: application/json'"
      exit 128
    else
      puts "created version #{options[:release_version]}"
    end
  end
end

fixes = ""
features = ""
migrations = ""
review = ""

puts "------- Jira tickets --------------------------"
jira_ids = run_command("git log #{prod_tag}...#{options[:dev_tag]} | grep -Eo '(PACT-|CC-)([0-9]+)' | sort | uniq").split
jira_ids.each do |jira_id|
  puts "\n  Jira ID -> #{jira_id}"
  uri = URI("#{JIRA_URL}/rest/api/3/issue/#{jira_id}?fields=customfield_11009,customfield_18528,customfield_17522,customfield_17521,status")
  response = Net::HTTP.get(uri)
  File.write("jira_#{jira_id}.json", response)

  if options[:debug]
    puts "response for #{jira_id} is #{response}"
  end

  data = JSON.parse(response)
  status = data.dig('fields', 'status', 'name')
  next unless %w[Done Released].include?(status)

  platform = data.dig('fields', 'customfield_17522', 'value')
  next if platform == 'saas'

  release_type = data.dig('fields', 'customfield_18528', 'value')
  ticket_note = data.dig('fields', 'customfield_11009')

  note = jira_parse_release_notes_from_file(jira_id)
  if note
    puts "   --> Found release note for #{jira_id}"
    case release_type
    when 'Feature'
      features += "\n* #{note} - [#{jira_id}](https://smartbear.atlassian.net/browse/#{jira_id})"
    when 'Fix'
      fixes += "\n* #{note} - [#{jira_id}](https://smartbear.atlassian.net/browse/#{jira_id})"
    end
  else
    review += "\n* #{jira_id} - release note not found - [#{jira_id}](https://smartbear.atlassian.net/browse/#{jira_id})"
    puts "   --> No release note found for #{jira_id}"
  end

  migration_note = data.dig('fields', 'customfield_17521', 'value')
  migrations += migration_note if migration_note

  if options[:is_release] && !options[:recompile_notes]
    payload_issue = { update: { fixVersions: [{ add: { name: options[:release_version] } }] } }.to_json
    uri = URI("#{JIRA_URL}/rest/api/3/issue/#{jira_id}")
    request = Net::HTTP::Put.new(uri, 'Content-Type' => 'application/json')
    request.basic_auth(ENV['JIRA_AUTH'].split(':').first, ENV['JIRA_AUTH'].split(':').last)
    request.body = payload_issue
    Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(request) }
  end
end

fixes = "\nN/A" if fixes.empty?
features = "\nN/A" if features.empty?
migrations = "\nN/A" if migrations.empty?

puts "Done."

release_note_file = "#{DOCS_ROOT_DIR}/website/docs/docs/on-premises/releases/#{options[:release_version]}.md"
File.open(release_note_file, 'w') do |file|
  file.puts <<~EOF
    ---
    title: #{options[:release_version]}
    ---

    ## Release date

    #{Date.today.strftime("%d %B %Y")}

    ## Features
    #{features}

    ## Fixes
    #{fixes}

    ## Migration notes
    #{migrations}
  EOF
end

review = "\nN/A" if review.empty?
puts "Please review the following tickets that have no release notes attached: #{review}"

puts File.read(release_note_file)

# Update things for the site
sidebar_file = "#{DOCS_ROOT_DIR}/website/sidebars.js"
sidebar_temp_file = "#{DOCS_ROOT_DIR}/website/sidebars_temp"
run_command("sed \"s/\\/\\/on-prem-release-placeholder/\\/\\/on-prem-release-placeholder\\n            'docs\\/on-premises\\/releases\\/#{options[:release_version]}',/\" #{sidebar_file} > #{sidebar_temp_file}")
FileUtils.mv(sidebar_temp_file, sidebar_file)

notice_file = "#{DOCS_ROOT_DIR}/website/notices/#{Date.today.strftime("%Y-%m-%d")}-on-premises-#{options[:release_version]}.md"
File.open(notice_file, 'a') do |file|
  file.puts <<~EOF
    ---
    slug: #{Date.today.strftime("%Y-%m-%d")}-on-premises-#{options[:release_version]}
    title: On-premises release v#{options[:release_version]}
    tags: [on-premises, release]
    ---

    A new PactFlow on-premises release (#{options[:release_version]}) is now available ([see details](/docs/on-premises/releases/#{options[:release_version]})).
  EOF
end

# Copy the content into the environment_variables.md file in docs.pactflow.io.
env_vars_file = "#{DOCS_ROOT_DIR}/website/docs/docs/on-premises/environment-variables.md"
File.open(env_vars_file, 'w') do |file|
  file.puts <<~EOF
    ---
    title: Environment variables
    ---
  EOF
  file.puts File.read("#{PACTFLOW_APPLICATION_DIR}/app_onprem/ENVIRONMENT_VARIABLES.md").gsub(/^# [^\s]/, '')
end

# GitHub integration
Dir.chdir(DOCS_ROOT_DIR)
github_token = ENV['GITHUB_TOKEN'] || run_command("aws ssm get-parameter --name /prod/github/docs.pactflow.io/auth | jq -r .Parameter.Value").strip

if github_token.empty?
  puts "No Github Token provided, you will need to manually create push and create a Pull Request."
  run_command("git status")
  exit 0
end

if options[:is_release]
  puts "Creating Pull Request..."
  run_command("git add #{sidebar_file} #{notice_file} #{release_note_file} #{env_vars_file}")
  run_command("git commit -m \"chore: release notes for #{options[:release_version]}\"")
  run_command("git push origin #{BRANCH_NAME}")

  uri = URI("https://api.github.com/repos/pactflow/docs.pactflow.io/pulls")
  request = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
  request['Authorization'] = "Bearer #{github_token}"
  request.body = {
    title: "Release #{options[:release_version]}",
    body: "Release notes for #{options[:release_version]}",
    head: BRANCH_NAME,
    base: 'master'
  }.to_json
  Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(request) }
  puts "Done."
end
