#!/bin/bash

set -e
set -x

whoami

echo ------------------------------------------------------
ls -l
echo ------------------------------------------------------
ls -l /usr/local/bin
echo ------------------------------------------------------

ScriptDir=$(dirname $0)

cd $ScriptDir/../website && /usr/local/bin/yarn install && /usr/local/bin/yarn run build
