#!/bin/bash 

cat .buildkite/pipeline.yml | sed s/{ECR}/$DEV_ACCOUNT/g | sed s/{PRODECR}/$PROD_ACCOUNT/g
