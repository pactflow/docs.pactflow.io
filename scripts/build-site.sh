#!/bin/bash

set -e

ScriptDir=$(dirname $0)

pushd $ScriptDir/../website

BUCKET_VAR=${ENVIRONMENT}_BUCKET
BUCKET=${!BUCKET_VAR}

aws s3 sync . s3://$BUCKET \
  --acl public-read \
  --cache-control "max-age=60, s-max-age=60, must-revalidate" \
  --delete \
  --sse

popd
