#!/bin/bash

set -e

cd crawl && node updateCrawlerCreds.js && npx algolia-webcrawler --config doc-scaper.config.json