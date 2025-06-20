#!/bin/bash

# Usage: release-notes-onprem.sh -v [version] -t [tag/sha] -r 1
# What will this do?
#
# This script helps retrieve tickets that are related to the release by:
# 1. Find relevant tickets based on commit messages
# 2. Format the release notes 
# 3. Create PR with release notes
#
# To do an actual release
# JIRA_TOKEN=... GITHUB_TOKEN=... release-notes-onprem.sh -v ... -r true
#
# Now the script can be re-run with --recompile-notes to recompile the notes without
# pulling the latest image or creating a new version in Jira
#
# the --debug flag will print out more information about the process

while [[ "$#" -gt 0 ]]
  do
    case $1 in
      # If no dev tag is supplied, it will assume the version that is currently in the dev environment is being deployed
      -t|--tag) DEV_TAG="$2"; shift;;
      # If jira is enabled, then it will create release version, and attach tickets to it
      -r|--release) IS_RELEASE="$2"; shift;;
      # This is required
      -v|--version) RELEASE_VERSION="$2"; shift;;
      # New optional parameter to recompile notes
      --recompile-notes) RECOMPILE_NOTES=true;;
      # Debugging
      --debug) DEBUG=true;;
    esac
    shift
done

if [ "$RECOMPILE_NOTES" = true ]; then
  echo "Running in recompile notes mode"
  echo "This assumes there is already: "
  echo "  - a branch for this release"
  echo "  - a version in Jira for this release"
  echo "  - latest image pulled from quay.io"
  echo "  - latest application code is pulled from git"
  echo "  - the script was run previously which creates a version in Jira"
  echo "-------------------------------------------------"
fi


####################
# Configurtation
####################
DOCS_ROOT_DIR=$(pwd)
PACTFLOW_APPLICATION_DIR=$(pwd)/scripts/release/.pactflow-application
ONPREM_PROD_IMAGE=quay.io/pactflow/enterprise:latest
JIRA_PROJECT_ID=17612
JIRA_URL=https://smartbear.atlassian.net
JIRA_USER=${JIRA_AUTH%%@*}
BRANCH_NAME=release/$RELEASE_VERSION

echo "Configuration: "
echo "  DOCS_ROOT_DIR: $DOCS_ROOT_DIR"
echo "  PACTFLOW_APPLICATION_DIR: $PACTFLOW_APPLICATION_DIR"
echo "  ONPREM_PROD_IMAGE: $ONPREM_PROD_IMAGE"
echo "  JIRA_PROJECT_ID: $JIRA_PROJECT_ID"
echo "  JIRA_URL: $JIRA_URL"
echo "  JIRA_USER: $JIRA_USER"
echo "  BRANCH_NAME: $BRANCH_NAME"

####################
# Previous relase number
####################

previous_release_number=$(git ls-tree -r --name-only HEAD website/docs/docs/on-premises/releases | while read filename; do
  echo "$(git log --date=unix -1 --format="%ad" -- $filename) $filename"
done | sort | tail -n1 | awk -F'/' '{print $NF}' | cut -d '.' -f 1-3)

echo "  Previous-release-number: $previous_release_number"

####################
# Validation
####################
if [ -z ${RELEASE_VERSION} ]; then 
  echo "Version has not be provided."
  exit 128
fi

if [ -z ${JIRA_AUTH} ]; then 
  echo "JIRA_AUTH not set, please set it with by exporting JIRA_AUTH=email:token, you can create a token here: https://id.atlassian.com/manage-profile/security/api-tokens"
  exit 128
fi

####################
# Checkout Application
####################

echo "------- Code checkout --------------------------"

if [ "$RECOMPILE_NOTES" = true ]; then
  # don't clone again if we are recompiling notes
  echo "Reusing cached application..."
  cd $PACTFLOW_APPLICATION_DIR
else
  echo "Fetching application code from git"
  if [ -d $PACTFLOW_APPLICATION_DIR ]; then
      rm -rf $PACTFLOW_APPLICATION_DIR
  fi
  git clone --shallow-since=$(date --date '9months ago' "+%Y-%m-%d") git@github.com:pactflow/pactflow-application.git $PACTFLOW_APPLICATION_DIR >/dev/null 2>&1
  cd $PACTFLOW_APPLICATION_DIR
  git fetch origin release/onprem-1.36.1

fi

echo "-------- Done -------------------------------"

####################
# Find SHA to diff against
####################

previous_tag=$(git tag -l --sort=-v:refname | grep -E $previous_release_number | head -n 1)
previous_tag_sha=$(git rev-list -n 1 $previous_tag)

if [ -z ${DEV_TAG} ]; then 
  DEV_TAG="$previous_tag_sha"
  echo "  Previous-tag: $previous_tag (inferring from previous release)"
fi
####################
# Find SHA to diff against
####################

if [ "$RECOMPILE_NOTES" = true ]; then
  if [ "$DEBUG" = true ]; then
    echo "Reusing cached docker image... $ONPREM_PROD_IMAGE"
  fi
else
  if [ "$DEBUG" = true ]; then
    echo "Pulling latest image... $ONPREM_PROD_IMAGE"
  fi
  docker pull $ONPREM_PROD_IMAGE >/dev/null 2>&1
fi

PROD_TAG=$(docker inspect $ONPREM_PROD_IMAGE | jq -r '.[0].Config.Env[] | select(startswith("PACTFLOW_GIT_SHA="))' | cut -d "=" -f2)

if [ -z ${DEV_TAG} ]; then 
  DEV_TAG="HEAD"
fi

echo "  Prod-git-tag: $PROD_TAG"
echo "  Dev-git-tag: $DEV_TAG"

####################
# Create branch that will merged and create version in Jira
####################
if [ -n "$IS_RELEASE" ]; then  
  if [ "$RECOMPILE_NOTES" = true ]; then
    if [ "$DEBUG" = true ]; then
      echo "Reusing branch for this release..."
    fi
    cd $DOCS_ROOT_DIR
    current_branch=$(git branch --show-current)
    if [ "$current_branch" != "$BRANCH_NAME" ]; then
      echo "Switching to branch $BRANCH_NAME"
      git checkout $BRANCH_NAME
    fi
    cd $PACTFLOW_APPLICATION_DIR
  else
    if [ "$DEBUG" = true ]; then
      echo "Creating a branch for this release..."
    fi
    cd $DOCS_ROOT_DIR
    git checkout -b $BRANCH_NAME
    cd $PACTFLOW_APPLICATION_DIR
  fi

  # when recompiling notes, we don't want to create a new version in Jira
  # we fetch the ID of the version that was created in the previous run
  #

  if [ "$RECOMPILE_NOTES" = true ]; then
    if [ "$DEBUG" = true ]; then
      echo "Fetching version ID for $RELEASE_VERSION"
    fi
    response=$(curl -s --request GET \
       --url "$JIRA_URL/rest/api/3/project/$JIRA_PROJECT_ID/versions" \
       --user "$JIRA_AUTH" \
       --header 'Accept: application/json' \
       --header 'Content-Type: application/json')
    version_id=$(echo $response | jq -r ".[] | select(.name == \"$RELEASE_VERSION\") | .id")
    if [ -z "$version_id" ]; then
      echo "  ERROR: Version $RELEASE_VERSION not found in Jira"
      echo "  the option --recompile-notes is only valid if the version was created in the previous run"
      exit 128
    fi
  else
    if [ "$DEBUG" = true ]; then
      echo "Creating ${RELEASE_VERSION} in Jira ${JIRA_PROJECT_ID}"
    fi
    payload_version="{\"archived\":false,\"name\":\"${RELEASE_VERSION}\",\"projectId\":${JIRA_PROJECT_ID},\"released\":false,\"description\":\"OnPrem Release for ${RELEASE_VERSION} by $JIRA_USER\"}"
    payload_issue="{\"update\": {\"fixVersions\": [{\"add\": {\"name\": \"${RELEASE_VERSION}\"}}]}}"
    if [ "$DEBUG" = true ]; then
      echo "payload_issue is $payload_issue"
      echo "payload_version is $payload_version"
    fi
    echo "  JIRA_AUTH: $JIRA_AUTH"

    response=$(curl -s --request POST \
        --url "$JIRA_URL/rest/api/3/version" \
        --user "$JIRA_AUTH" \
        --header 'Accept: application/json' \
        --header 'Content-Type: application/json' \
        --data "${payload_version}"
    )
    if [ "$DEBUG" = true ]; then
      echo "create version response is $response"
    fi
    error_message=$(echo $response | jq '.errorMessages')
    if [ "$error_message" != "null" ]; then
      #
      # if you need to delete a version, which was created accidentally
      # curl --request DELETE \
      #  --url 'https://smartbear.atlassian.net/rest/api/3/version/41330' \ 
      #  --user "$JIRA_AUTH" \
      #  --header 'Accept: application/json'
      #
      #  replace 41330 with version ID you want to delete
      #  you can see the version ID in jira UI

      echo "Error creating version: $error_message $response"
      echo "Note: if you need to delete a version, which was created accidentally, you can use the following command: "
      echo "curl --request DELETE --url 'https://smartbear.atlassian.net/rest/api/3/version/{id}' --user \"$JIRA_AUTH\" --header 'Accept: application/json'"
      exit 128
    else
      echo "created version $RELEASE_VERSION"
    fi
  fi
fi

jira_parse_release_notes_from_file() {
  local jira_id=$1
  local file="jira_${jira_id}.json"

  if [ ! -f "$file" ]; then
    echo "Error: File $file not found"
    return 1
  fi

  local type
  type=$(jq -r 'try .fields.customfield_11009.content[].type catch "error"' "$file")
  if [ "$type" = "error" ]; then
    echo "Error: Failed to parse JSON in $file"
    return 1
  fi

  local data
  case $type in
    "paragraph")
      data=$(jq -r 'try .fields.customfield_11009.content[].content[].text catch "error"' "$file")
    ;;
    "bulletList")
      data=$(jq -r 'try [.fields.customfield_11009.content[].content[].content[].content[] | .text] | join(", ") catch "error"' "$file")
    ;;
    "doc")
      data=$(jq -r 'try .fields.customfield_11009.content[].content[].content[].content[].content[].text catch "error"' "$file")
    ;;
    *)
      echo "Error: Unsupported content type $type in $file"
      return 1
    ;;
  esac

  if [ "$data" = "error" ]; then
    echo "  ERROR: Failed to parse content in $file"
    return 1
  fi

  echo "$data"
}



####################
# Find all related tickets
####################
fixes=""
features=""
migrations=""
review=""

echo "------- Jira tickets --------------------------"

for i in $(git log $PROD_TAG...$DEV_TAG | grep -Eo '(PACT-|CC-)([0-9]+)' | sort | uniq); do
  echo "

  Jira ID -> $i"
  curl -s --request GET \
       --url "$JIRA_URL/rest/api/3/issue/$i?fields=customfield_11009,customfield_18528,customfield_17522,customfield_17521,status" \
       --user "$JIRA_AUTH" \
       --header 'Accept: application/json' \
       --header 'Content-Type: application/json' > jira_"$i".json
  response=$(cat jira_"$i".json)

  if [ "$DEBUG" = true ]; then
    echo "response for $i is $response"
  fi

  # Valid Scenario: We may have merged code for a ticket that has not been marked as done in Jira since there is 
  # more work required to complete it but we still want to attach a version to the ticket which tells Jira that 
  # part of the code has been released to production.
  status=$(echo $response | jq '.fields.status.name' | tr -d '"')
  if [ "$status" = "Done" ] || [ "$status" = "Released" ]; then
    platform=$(echo $response | jq '.fields.customfield_17522.value' | tr -d '"')
    if [ "$platform" = "saas" ]; then
      echo "   --> Skipping ticket $i as it is a SaaS ticket"
      continue
    fi

    release_type=$(echo $response | jq '.fields.customfield_18528.value' | tr -d '"')
    ticket_note=$(echo $response | jq '.fields.customfield_11009' | tr -d '"')

    note="null"
    if [ "$ticket_note" != "null" ]; then
      note=$(jira_parse_release_notes_from_file "$i")
      if [ $? -eq 0 ]; then
        if [ "$DEBUG" = true ]; then
          echo "Parsed content: $note"
        fi
        echo "   --> Found release note for $i"
      else
        echo "Failed to parse release notes for JIRA ID $i"
      fi
      if [ "$release_type" = "Feature" ] && [ "$ticket_note" != "null" ] && [ "$note" != "null" ]; then
        features+="\n* "$note" - [$i](https://smartbear.atlassian.net/browse/$i)"
      elif [ "$release_type" = "Fix" ] && [ "$ticket_note" != "null" ] && [ "$note" != "null" ]; then
        fixes+="\n* "$note" - [$i](https://smartbear.atlassian.net/browse/$i)"
      fi
    else
      review+="\n* $i - release note not found - [$i](https://smartbear.atlassian.net/browse/$i)"
      echo "   --> No release note found for $i"
    fi

    migration_note=$(echo $response | jq '.fields.customfield_17521.value' | tr -d '"')
    if [ "$migration_note" != "null" ]; then
      migrations+=$migration_note
    fi
  else
    echo "   --> Status of $i is not Done or Released (Stauts: $status)"
  fi

  if [ -n "$IS_RELEASE" ]; then
    if [ "$RECOMPILE_NOTES" = true ]; then
      if [ "$DEBUG" = true ]; then
        echo "Not updating jira for $i as we are recompiling notes"
      fi
    else
      curl --request PUT \
         --url "$JIRA_URL/rest/api/3/issue/$i" \
         --user "$JIRA_AUTH" \
         --header 'Accept: application/json' \
         --header 'Content-Type: application/json' \
         --data "${payload_issue}"
     
    fi
  fi
done

if [[ -z $fixes ]]; then
    fixes="\nN/A"
fi

if [[ -z $features ]]; then
    features="\nN/A"
fi

if [[ -z $migrations ]]; then
    migrations="\nN/A"
fi

echo "Done."

####################
# Write the release notes, output to screen
####################
release_note_file=${DOCS_ROOT_DIR}/website/docs/docs/on-premises/releases/${RELEASE_VERSION}.md

echo
echo -e "---
title: ${RELEASE_VERSION}
---

## Release date

$(date +"%d %B %Y")

## Features
${features}

## Fixes
${fixes}

## Migration notes
${migrations}

" > $release_note_file

if [[ -z $review ]]; then
    review="\nN/A"
fi

echo -e "Please review the following tickets that have no release notes attached: 
${review}"

cat $release_note_file

####################
# Update things for the site
####################
sed "s/\/\/on-prem-release-placeholder/\/\/on-prem-release-placeholder\n            'docs\/on-premises\/releases\/$RELEASE_VERSION',/" ${DOCS_ROOT_DIR}/website/sidebars.js > ${DOCS_ROOT_DIR}/website/sidebars_temp
mv ${DOCS_ROOT_DIR}/website/sidebars_temp ${DOCS_ROOT_DIR}/website/sidebars.js

echo -e "---
slug: $(date +"%Y-%m-%d")-on-premises-$RELEASE_VERSION
title: On-premises release v$RELEASE_VERSION
tags: [on-premises, release]
---

A new PactFlow on-premises release ($RELEASE_VERSION) is now available ([see details](/docs/on-premises/releases/$RELEASE_VERSION)).
" >> ${DOCS_ROOT_DIR}/website/notices/$(date +"%Y-%m-%d")-on-premises-$RELEASE_VERSION.md

####################
# Copy the content into the environment_variables.md file in docs.pactflow.io.
####################

echo -e "---
title: Environment variables
---
" > $DOCS_ROOT_DIR/website/docs/docs/on-premises/environment-variables.md

# Remove any H1 headings
echo "$(cat $PACTFLOW_APPLICATION_DIR/app_onprem/ENVIRONMENT_VARIABLES.md | grep -v "^# [^\s]")" >> $DOCS_ROOT_DIR/website/docs/docs/on-premises/environment-variables.md


####################
# GitHub integration
####################
cd ${DOCS_ROOT_DIR}

if [ -z ${GITHUB_TOKEN} ]; then 
  GITHUB_TOKEN=$(aws ssm get-parameter --name /prod/github/docs.pactflow.io/auth | jq -r .Parameter.Value)
fi

if [ -z ${GITHUB_TOKEN} ]; then 
  echo "No Github Token provided, you will need to manually create push and create a Pull Request."
  git status
  exit 0
fi


####################
# Create branch that will merged and create version in Jira
####################
if [ -n "$IS_RELEASE" ]; then
  echo "Creating Pull Request..."
  git add ${DOCS_ROOT_DIR}/website/sidebars.js \
    ${DOCS_ROOT_DIR}/website/notices/$(date +"%Y-%m-%d")-on-premises-$RELEASE_VERSION.md \
    $release_note_file \
    website/docs/docs/on-premises/environment-variables.md
  git commit -m "chore: release notes for $RELEASE_VERSION"
  git push origin $BRANCH_NAME
  curl -s \
    --output /dev/null \
    --request POST \
    --header "Accept: application/vnd.github+json" \
    --header "Authorization: Bearer $GITHUB_TOKEN"\
    --header "X-GitHub-Api-Version: 2022-11-28" \
    --url "https://api.github.com/repos/pactflow/docs.pactflow.io/pulls" \
    --data '{"title":"Release '"$RELEASE_VERSION"'","body":"Release notes for '"$RELEASE_VERSION"'","head":"'"$BRANCH_NAME"'","base":"master"}'
    echo "Done."
fi
