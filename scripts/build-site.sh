#!/bin/bash

set -e

ScriptDir=$(dirname $0)

cd $ScriptDir/../website && yarn install && yarn run build

BUCKET_VAR=${ENVIRONMENT}_BUCKET
BUCKET=${!BUCKET_VAR}

aws s3 sync $ScriptDir/../website/build/doc-site $BUCKET \
  --acl public-read \
  --cache-control "max-age=60, s-max-age=60, must-revalidate" \
  --delete
