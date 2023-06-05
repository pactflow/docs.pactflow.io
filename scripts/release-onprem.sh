#!/bin/bash

# Usage: release-diff-saas.sh [DEV_TAG]
# If no dev tag is supplied, it will assume the version that is currently in the dev environment is being deployed

DEV_TAG=$1
PROJECT_DIR=$(cd "$(dirname $0)"/../.. && pwd)
export AWS_PROFILE=${AWS_PROFILE:-pact-dev}
REPOSITORY=pact-broker-saas


function get_label() {
  repository_name=$1
  tag=$2
  label=$3
  aws ecr batch-get-image --repository-name=$repository_name --image-id imageTag=$tag --output json |
    jq -r '.images[].imageManifest' |
    jq '.config.digest' |
    xargs -I{} aws ecr get-download-url-for-layer --repository-name=$repository_name --layer-digest={} |
    jq '.downloadUrl' |
    xargs curl -s |
    jq ".config.Labels[\"${label}\"]"
}


cd $PROJECT_DIR

if [ -z "$DEV_TAG" ]; then
  echo
  echo "Calculating the release diff between the current prod environment and the current dev environment..."
  DEV_DIGEST=$(aws ecr list-images --repository-name  $REPOSITORY --filter tagStatus=TAGGED | jq -r '.imageIds[] | select(.imageTag=="deployed-dev") | .imageDigest')
  DEV_TAG=$(aws ecr list-images --repository-name  $REPOSITORY --filter tagStatus=TAGGED | jq -r ".imageIds[] | select(.imageDigest==\"$DEV_DIGEST\") | .imageTag" | grep -v deploy | grep -v latest)
else
  echo
  echo "Calculating the release diff between the current prod environment and the specified tag ${DEV_TAG}..."
fi

DEV_DB_SCHEMA_MIGRATION_SHA=$(get_label $REPOSITORY $DEV_TAG "db.migration.schema.sha")
DEV_DB_DATA_MIGRATION_SHA=$(get_label $REPOSITORY $DEV_TAG "db.migration.data.sha")

PROD_DIGEST=$(aws ecr list-images --repository-name  $REPOSITORY --filter tagStatus=TAGGED | jq -r '.imageIds[] | select(.imageTag=="deployed-prod") | .imageDigest')
PROD_TAG=$(aws ecr list-images --repository-name  $REPOSITORY --filter tagStatus=TAGGED | jq -r ".imageIds[] | select(.imageDigest==\"$PROD_DIGEST\") | .imageTag" | grep -v deploy | grep -v latest)
PROD_DB_SCHEMA_MIGRATION_SHA=$(get_label $REPOSITORY $PROD_TAG "db.migration.schema.sha")
PROD_DB_DATA_MIGRATION_SHA=$(get_label $REPOSITORY $PROD_TAG "db.migration.data.sha")

git fetch origin master 2>/dev/null

old_pact_broker_git_sha=$(git show $PROD_TAG:PACT_BROKER_GIT_SHA)
current_pact_broker_git_sha=$(cat "${PROJECT_DIR}"/PACT_BROKER_GIT_SHA)

echo
echo "Pactflow SaaS API release ${DEV_TAG}"
echo "------------------------------------"
echo
echo Open this URL to see a diff of dev vs prod: https://github.com/pactflow/pactflow-application/compare/$PROD_TAG...$DEV_TAG

echo
echo "GENERAL PACTFLOW CHANGES"
echo "========================"
git log \
  --pretty=format:"%h %s%x09" --date=short \
  --grep="^(feat|fix)(\\(.*\\))?:" -E \
  $PROD_TAG...$DEV_TAG \
  app_shared/lib  pact_broker_fork/lib\
  | grep -v "Merge pull request"

echo
echo
echo "SAAS SPECIFIC CHANGES"
echo "======================"
git log \
  --pretty=format:"%h %s%x09" --date=short \
  --grep="^(feat|fix)(\\(.*\\))?:" -E \
  $PROD_TAG...$DEV_TAG \
  app_saas \
  | grep -v "Merge pull request"


echo
echo
echo "PACT BROKER CHANGES"
echo "==================="

oss_diff_command="git log   --pretty=format:\"%h %s%x09\" --date=short   --grep=\"^(feat|fix)(\\(.*\\))?:\" -E   ${old_pact_broker_git_sha}...${current_pact_broker_git_sha}"
if [ -d ../../pact-foundation/pact_broker ]; then
  cd ../../pact-foundation/pact_broker
  eval $oss_diff_command
  cd $PROJECT_DIR
else
  echo "To get a list of changes for the OSS Pact Broker code, check out the pact_broker project and run:"
  echo "${oss_diff_command}"
fi

echo

echo
echo "JIRA ISSUES"
echo "==========="

git log \
  --pretty=format:"%B" \
  --grep="PACT-" --grep="CC-" -E \
  $PROD_TAG...$DEV_TAG | tr ' ' '\n' | grep -e "PACT-" -e "CC-" | sed 's%^%https://smartbear.atlassian.net/browse/%'

echo
echo

echo "DATABASE MIGRATIONS"
echo "==================="

if [ "${DEV_DB_SCHEMA_MIGRATION_SHA}" = ${PROD_DB_SCHEMA_MIGRATION_SHA} ]; then
  echo "* There will be no schema migrations"
else
  echo "* There ARE schema migrations that will be applied during this release. Expect the deployment to take at least 10 minutes longer than usual."
fi


if [ "${DEV_DB_DATA_MIGRATION_SHA}" = ${PROD_DB_DATA_MIGRATION_SHA} ]; then
  echo "* There will be no data migrations"
else
  echo "* There ARE data migrations that will be applied during this release. Expect the deployment to take at least 10 minutes longer than usual."
fi

echo
echo
