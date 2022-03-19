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

The config is stored in ./scripts/crawl/crawlconf.json

You will need to set an api admin key which you can get [here](https://www.algolia.com/account/api-keys/all?applicationId=LY8MHW6MWQ)

```bash
export PACTFLOW_ALGOLIA_KEY=xyz
export PACTFLOW_ALGOLIA_APP_ID=LY8MHW6MWQ
```

and it can be run by 

```bash
make crawl
```