#!/bin/bash

set -e

ScriptDir=$(dirname $0)

cd $ScriptDir/../website && yarn install && yarn run build
