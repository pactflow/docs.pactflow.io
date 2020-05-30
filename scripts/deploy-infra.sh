#!/bin/bash

set -e

if [ "" = "$1" ]; then
  echo "Usage: "
  echo "  ./deploy-infra.sh environment"
  exit 1
fi

export AWS_DEFAULT_REGION=us-east-1

# Temporary override for the branch
export dev_PARAMETERS="HostedZone=Z18BXAWWKZMALA HostedZoneName=test.pactflow.io WebsiteCert=arn:aws:acm:us-east-1:838728264948:certificate/4895019c-e035-47a7-8605-ce7b2abd4e3c"

ENVIRONMENT=$1
STACKNAME=pactflow-docsite-${ENVIRONMENT}-infra
PARAMETER_VAR=${ENVIRONMENT}_PARAMETERS
PARAMETERS=${!PARAMETER_VAR}

ScriptDir=$(dirname $0)

aws cloudformation deploy \
  --stack-name $STACKNAME \
  --template-file $ScriptDir/../templates/infra.yaml \
  --parameter-overrides \
    Environment=$ENVIRONMENT \
    $PARAMETERS \
  --no-fail-on-empty-changeset \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags $TAGS
