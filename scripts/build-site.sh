#!/bin/bash

set -e

ScriptDir=$(dirname $0)

cd $ScriptDir/../website && yarn run build
