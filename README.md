# docs.pactflow.io

Pactflow technical documentation

This doco site is generated with [https://docusaurus.io/docs/](Docusaurus)

There are two main directories. All the website assets (pages, css, images) is in `website` and the
documentation pages are found in `docs`.

Refer to [website/README.md](website/README.md)

## Development

`docker-compose up`

## Environments

Test: [docs.test.pactflow.io](https://docs.test.pactflow.io)

Prod: docs.pactflow.io


## Search

Search is provided by Algolia and the dashboard is [here](https://www.algolia.com/apps/LY8MHW6MWQ/dashboard)

The site is currently crawled, on demand, using an OSS package called [aloglia-webcrawler](https://github.com/DeuxHuitHuit/algolia-webcrawler) as the offical crawler isn't free for commercial purposes.

The config is stored in ./scripts/crawl/doc-scraper.config.json

You will need to set an api admin key which you can get [here](https://www.algolia.com/account/api-keys/all?applicationId=LY8MHW6MWQ)

```bash
export PACTFLOW_ALGOLIA_KEY=xyz
```

and it can be run by 


```bash
make crawl
```

Note:- The config file will be updated with an Admin API key, please do not check this into git. :)