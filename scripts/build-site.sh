#!/bin/bash

set -e
set -x

ScriptDir=$(dirname $0)

pushd $ScriptDir/../website

yarn install && yarn run build

BUCKET_VAR=${ENVIRONMENT}_BUCKET
BUCKET=${!BUCKET_VAR}

aws s3 sync ./build/doc-site s3://$BUCKET \
  --acl public-read \
  --cache-control "max-age=60, s-max-age=60, must-revalidate" \
  --delete

popd
