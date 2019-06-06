#!/bin/bash

set -e

ScriptDir=$(dirname $0)

rm -rf website/build/prod
mkdir -p website/build/prod

aws s3 sync s3://$dev_BUCKET website/build/prod

find website/build/prod
