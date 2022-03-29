#!/bin/bash

set -e

docker run -it -e "CONFIG=$(cat crawl/crawlconf.json | jq -r tostring)" \
-e API_KEY=${PACTFLOW_ALGOLIA_KEY} \
-e APPLICATION_ID=${PACTFLOW_ALGOLIA_APP_ID} \
algolia/docsearch-scraper:v1.13.0

# Uses algolia's legacy crawler
# https://docsearch.algolia.com/docs/legacy/run-your-own/
# https://docsearch.algolia.com/docs/legacy/config-file/