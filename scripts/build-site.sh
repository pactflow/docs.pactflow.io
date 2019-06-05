#!/bin/bash

set -e

ScriptDir=$(dirname $0)

cat /etc/passwd
whoami
ls -l website

cd $ScriptDir/../website && yarn install && yarn run build
