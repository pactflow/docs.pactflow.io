#!/bin/sh

if [ -z "${GITHUB_ACCESS_TOKEN}" ]; then
  echo "Please set GITHUB_ACCESS_TOKEN"
  exit 1
fi

scripts=$(find scripts/sync -name *.rb)

for script in "${scripts}"; do
  bundle exec "${script}"
done
