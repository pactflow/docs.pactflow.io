#!/bin/bash

set -e
set -x

ScriptDir=$(dirname $0)

ls -l

rm -rf website/build/prod
mkdir -p website/build/prod

aws s3 sync s3://$dev_BUCKET website/build/prod

find website/build/prod
