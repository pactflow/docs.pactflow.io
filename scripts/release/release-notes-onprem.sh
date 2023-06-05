#!/bin/bash

# Usage: release-diff-saas.sh [DEV_TAG]
# If no dev tag is supplied, it will assume the version that is currently in the dev environment is being deployed

# 0. Validate params - 
#       version
# 1. create branch v1.24.0-release-notes
# 2. checkout pactflow application
# 3. get all issues, list them in output
# 4. create website/docs/docs/on-premises/releases/<version>.md
# 5. update  website/sidebars.js 
        # sed "s/\/\/on-prem-release-placeholder/\/\/on-prem-release-placeholder\n            'docs\/on-premises\/releases\/1.23.1',/" website/sidebars.js
# 6. create website/notices/<date>-on-premises-<version>.md
# 7. Output next steps (github PR approval)


while [[ "$#" -gt 0 ]]
  do
    case $1 in
      # If no dev tag is supplied, it will assume the version that is currently in the dev environment is being deployed
      -t|--tag) DEV_TAG="$2"; shift;;
      # If jira is enabled, then it will create release version, and attach tickets to it
      -r|--release) IS_RELEASE="$2"; shift;;
      -v|--version) RELEASE_VERSION="$2"; shift;;
    esac
    shift
done


# 2. checkout application

echo "PREPARING RELEASE"
echo "================="
echo "Please wait this may take some time..."
PACTFLOW_APPLICATION_DIR=$(pwd)/scripts/release/.pactflow-application
if [ -d $PACTFLOW_APPLICATION_DIR ]; then
    rm -rf $PACTFLOW_APPLICATION_DIR
fi
git clone git@github.com:pactflow/pactflow-application.git $PACTFLOW_APPLICATION_DIR >/dev/null 2>&1
cd $PACTFLOW_APPLICATION_DIR
echo "- Done checking out application."

# 3. get all the issues
ONPREM_PROD_IMAGE=quay.io/pactflow/enterprise:latest


docker pull $ONPREM_PROD_IMAGE >/dev/null 2>&1
PROD_TAG=$(docker inspect $ONPREM_PROD_IMAGE | jq -r '.[0].ContainerConfig.Env[] | select(startswith("PACTFLOW_GIT_SHA="))' | cut -d "=" -f2)
DEV_TAG="HEAD"
echo "- Done pulling image."

# Jira configuration in order to create version and assign tickets that will be released to it.
JIRA_PROJECT_ID=17612
JIRA_URL=https://smartbear.atlassian.net
if [ -z ${JIRA_AUTH} ]; then 
  echo "JIRA_AUTH not set, please set it with by exporting JIRA_AUTH=email:token, you can create a token here: https://id.atlassian.com/manage-profile/security/api-tokens"
  exit 128
fi
JIRA_USER=${JIRA_AUTH%%@*}


if [ -n "$IS_RELEASE" ]; then  
  
  echo
  echo
  echo "CREATING RELEASE VERSION"
  echo "========================"

  payload_version="{\"archived\":false,\"name\":\"${RELEASE_VERSION}\",\"projectId\":${JIRA_PROJECT_ID},\"released\":false,\"description\":\"OnPrem Release for ${RELEASE_VERSION} by $JIRA_USER\"}"
  payload_issue="{\"update\": {\"fixVersions\": [{\"add\": {\"name\": \"${RELEASE_VERSION}\"}}]}}"

  curl -s -o /dev/null --request POST \
     --url "$JIRA_URL/rest/api/3/version" \
     --user "$JIRA_AUTH" \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --data "${payload_version}"
  echo "${JIRA_VERSION_NAME} has been created (or was created previously)."
fi

echo
echo
echo "RELEASE NOTES"
echo "============="

for i in $(git log $PROD_TAG...$DEV_TAG | grep -Eo '(PACT-)([0-9]+)' | sort | uniq); do
   response=$(curl -s --request GET \
       --url "$JIRA_URL/rest/api/3/issue/$i?fields=customfield_11009,customfield_18528,customfield_17522,status" \
       --user "$JIRA_AUTH" \
       --header 'Accept: application/json' \
       --header 'Content-Type: application/json')

   note="${i} " 
   fixes=""
   features=""
   migration=""

### need to separate into 2 (features, fixes) and add migration notes

   platform=$(echo $response | jq '.fields.customfield_17522.value' | tr -d '"')
   if [ "$platform" = "saas" ]; then
      continue
   fi

   has_release_type=$(echo $response | jq '.fields.customfield_18528' | tr -d '"')
   if [ "$has_release_type" != "null" ]; then
     note+=$(echo $response | jq '.fields.customfield_18528.value' | tr -d '"')
   fi

   has_note=$(echo $response | jq '.fields.customfield_11009' | tr -d '"')
   if [ "$has_note" != "null" ]; then
     note+=": " 
     note+=$(echo $response | jq '.fields.customfield_11009.content[].content[].text' | tr -d '"')
   fi
   
   # Valid Scenario: We may have merged code for a ticket that has not been marked as done in Jira since there is 
   # more work required to complete it but we still want to attach a version to the ticket which tells Jira that 
   # part of the code has been released to production.
   status=$(echo $response | jq '.fields.status.name' | tr -d '"')
   if [ "$status" = "Done" ]; then
     echo $note
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

# 4. create $(pwd)/website/docs/docs/on-premises/releases/<version>.md



# 5. update $(pwd)website/sidebars.js 
        # sed "s/\/\/on-prem-release-placeholder/\/\/on-prem-release-placeholder\n            'docs\/on-premises\/releases\/1.23.1',/" website/sidebars.js
# 6. create $(pwd)/website/notices/<date>-on-premises-<version>.md
git status
# 7. Output next steps (github PR approval)