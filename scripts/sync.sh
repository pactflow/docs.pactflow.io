#!/bin/bash

set -e

ScriptDir=$(dirname $0)

aws s3 sync s3://$dev_BUCKET s3://$prod_BUCKET \
  --acl public-read \
  --cache-control "max-age=60, s-max-age=60, must-revalidate" \
  --delete
