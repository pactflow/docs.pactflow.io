#!/bin/bash 

sed s/{ECR}/$DEV_ACCOUNT/g .buildkite/pipeline.yml
