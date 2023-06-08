#!/bin/bash

# Usage: release-notes-onprem.sh -v [version] -t [tag/sha] -r 1
# What will this do?
#
# This script helps retrieve tickets that are related to the release by:
# 1. Find relevant tickets based on commit messages
# 2. Format the release notes 
# 3. Create PR with release notes


while [[ "$#" -gt 0 ]]
  do
    case $1 in
      # If no dev tag is supplied, it will assume the version that is currently in the dev environment is being deployed
      -t|--tag) DEV_TAG="$2"; shift;;
      # If jira is enabled, then it will create release version, and attach tickets to it
      -r|--release) IS_RELEASE="$2"; shift;;
      # This is required
      -v|--version) RELEASE_VERSION="$2"; shift;;
    esac
    shift
done

####################
# Configurtation
####################
DOCS_ROOT_DIT=$(pwd)
PACTFLOW_APPLICATION_DIR=$(pwd)/scripts/release/.pactflow-application
ONPREM_PROD_IMAGE=quay.io/pactflow/enterprise:latest
JIRA_PROJECT_ID=17612
JIRA_URL=https://smartbear.atlassian.net
JIRA_USER=${JIRA_AUTH%%@*}
BRANCH_NAME=release/$RELEASE_VERSION

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
echo "Preparing, please wait, this may take some time..."
echo "Fetching application..."
if [ -d $PACTFLOW_APPLICATION_DIR ]; then
    rm -rf $PACTFLOW_APPLICATION_DIR
fi
git clone --shallow-since=$(date -v -2m "+%Y-%m-%d") git@github.com:pactflow/pactflow-application.git $PACTFLOW_APPLICATION_DIR >/dev/null 2>&1
cd $PACTFLOW_APPLICATION_DIR
echo "Done."


####################
# Find SHA to diff against
####################
echo "Pulling latest image..."
docker pull $ONPREM_PROD_IMAGE >/dev/null 2>&1
PROD_TAG=$(docker inspect $ONPREM_PROD_IMAGE | jq -r '.[0].ContainerConfig.Env[] | select(startswith("PACTFLOW_GIT_SHA="))' | cut -d "=" -f2)

if [ -z ${DEV_TAG} ]; then 
  DEV_TAG="HEAD"
fi
echo "Done."


####################
# Create branch that will merged and create version in Jira
####################
if [ -n "$IS_RELEASE" ]; then  
  
  echo "Creating a branch for this release..."
  cd $DOCS_ROOT_DIT
  git checkout -b $BRANCH_NAME
  cd $PACTFLOW_APPLICATION_DIR
  echo "Done."

  echo "Creating ${RELEASE_VERSION} in Jira..."
  payload_version="{\"archived\":false,\"name\":\"${RELEASE_VERSION}\",\"projectId\":${JIRA_PROJECT_ID},\"released\":false,\"description\":\"OnPrem Release for ${RELEASE_VERSION} by $JIRA_USER\"}"
  payload_issue="{\"update\": {\"fixVersions\": [{\"add\": {\"name\": \"${RELEASE_VERSION}\"}}]}}"
  curl -s -o /dev/null --request POST \
     --url "$JIRA_URL/rest/api/3/version" \
     --user "$JIRA_AUTH" \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --data "${payload_version}"
  echo "Done."
fi


####################
# Find all related tickets
####################
fixes=""
features=""
migrations=""
review=""

echo "Retreiving related tickets..."
for i in $(git log $PROD_TAG...$DEV_TAG | grep -Eo '(PACT-|CC-)([0-9]+)' | sort | uniq); do
   response=$(curl -s --request GET \
       --url "$JIRA_URL/rest/api/3/issue/$i?fields=customfield_11009,customfield_18528,customfield_17522,customfield_17521,status" \
       --user "$JIRA_AUTH" \
       --header 'Accept: application/json' \
       --header 'Content-Type: application/json')
   
   # Valid Scenario: We may have merged code for a ticket that has not been marked as done in Jira since there is 
   # more work required to complete it but we still want to attach a version to the ticket which tells Jira that 
   # part of the code has been released to production.
   status=$(echo $response | jq '.fields.status.name' | tr -d '"')
   if [ "$status" = "Done" ]; then

       platform=$(echo $response | jq '.fields.customfield_17522.value' | tr -d '"')
       if [ "$platform" = "saas" ]; then
          continue
       fi

       release_type=$(echo $response | jq '.fields.customfield_18528.value' | tr -d '"')
       has_note=$(echo $response | jq '.fields.customfield_11009' | tr -d '"')

       if [ "$release_type" = "Feature" ] && [ "$has_note" != "null" ]; then
         features+="\n* "$(echo $response | jq '.fields.customfield_11009.content[].content[].text' | tr -d '"')
       elif [ "$release_type" = "Fix" ] && [ "$has_note" != "null" ]; then
         fixes+="\n* "$(echo $response | jq '.fields.customfield_11009.content[].content[].text' | tr -d '"')
       else
         review+='\n- https://smartbear.atlassian.net/browse/'$i
       fi

       migration_note=$(echo $response | jq '.fields.customfield_17521.value' | tr -d '"')
       if [ "$migration_note" != "null" ]; then
          migrations+=$migration_note
       fi
   fi

   if [ -n "$IS_RELEASE" ]; then
     curl --request PUT \
         --url "$JIRA_URL/rest/api/3/issue/$i" \
         --user "$JIRA_AUTH" \
         --header 'Accept: application/json' \
         --header 'Content-Type: application/json' \
         --data "${payload_issue}"
    fi
done

if [[ -z $fixes ]]; then
  echo "test"
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
release_note_file=${DOCS_ROOT_DIT}/website/docs/docs/on-premises/releases/${RELEASE_VERSION}.md

echo
echo -e "
---
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

echo -e "Please review the following tickets that have no release notes attached: 
${review}"

cat $release_note_file

####################
# Update things for the site
####################
sed "s/\/\/on-prem-release-placeholder/\/\/on-prem-release-placeholder\n            'docs\/on-premises\/releases\/$RELEASE_VERSION',/" ${DOCS_ROOT_DIT}/website/sidebars.js > ${DOCS_ROOT_DIT}/website/sidebars_temp
mv ${DOCS_ROOT_DIT}/website/sidebars_temp ${DOCS_ROOT_DIT}/website/sidebars.js

echo -e "
---
slug: $(date +"%Y-%m-%d")-on-premises-{$RELEASE_VERSION}
title: On-premises release v{$RELEASE_VERSION}
tags: [on-premises, release]
---

A new PactFlow on-premises release ({$RELEASE_VERSION}) is now available ([see details](/docs/on-premises/releases/{$RELEASE_VERSION})).
" >> ${DOCS_ROOT_DIT}/website/notices/$(date +"%Y-%m-%d")-on-premises-$RELEASE_VERSION.md

####################
# Copy the content into the environment_variables.md file in docs.pactflow.io.
####################
cp $PACTFLOW_APPLICATION_DIR/app_onprem/ENVIRONMENT_VARIABLES.md $DOCS_ROOT_DIT/website/docs/docs/on-premises/environment-variables.md


####################
# GitHub integration
####################
if [ -z ${GITHUB_TOKEN} ]; then 
  echo "No Github Token provided, you will need to manually create push and create a Pull Request."
  git status
  exit 0
fi

git commit -m "chore: add release notes for "$RELEASE_VERSION \ 
  ${DOCS_ROOT_DIT}/website/sidebars.js \
  ${DOCS_ROOT_DIT}/website/notices/$(date +"%Y-%m-%d")-on-premises-$RELEASE_VERSION.md \
  $release_note_file \
  website/docs/docs/on-premises/environment-variables.md

git push origin $BRANCH_NAME

curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer {$GITHUB_TOKEN}"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/pactflow/docs.pactflow.io/pulls \
  -d '{"title":"Release '"$RELEASE_VERSION"'","body":"Release notes for '"$RELEASE_VERSION"'","head":"'"{$BRANCH_NAME}"'","base":"master"}'