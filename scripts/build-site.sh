#!/bin/bash

set -e

ScriptDir=$(dirname $0)

whoami
ls -l website

cd $ScriptDir/../website && yarn install && yarn run build
