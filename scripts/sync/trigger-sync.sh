#!/bin/bash

curl -X POST https://api.github.com/repos/pactflow/partners.pactflow.io/dispatches \
      -H 'Accept: application/vnd.github.everest-preview+json' \
      -H "Authorization: Bearer $GITHUB_TOKEN" \
      -d '{"event_type": "pactflow-docs-updated"}'

echo "See https://github.com/pactflow/partners.pactflow.io/actions"