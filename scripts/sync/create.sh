#!/bin/bash

set -e

repositories=()
 mkdir -p ~/development/public/pactflow-example-consumer-java-kafka/.github/workflows

# repositories=(~/development/public/example-provider ~/development/public/pactflow-example-consumer-js-kafka/ ~/development/public/pactflow-example-consumer-java-kafka/ ~/development/public/pactflow-example-provider-java-kafka/ ~/development/public/pactflow-example-provider-springboot/)
repositories=(~/development/public/example-consumer-cypress/)

for repository in "${repositories[@]}"; do
  pushd $repository
  git reset HEAD
  git stash
  git checkout master
  git pull --rebase origin master
  mkdir -p .github/workflows
  cp /Users/matthewfellows/development/dius/docs.pactflow.io/.github/workflows/trigger_partner_docs_update.yml .github/workflows/
  git add .github/workflows/
  git commit -m "build: trigger partner docs update on content change"
  git push origin master
  popd
done