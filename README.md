# docs.pactflow.io

PactFlow technical documentation

This doco site is generated with [Docusaurus](https://docusaurus.io/docs/)

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

## Annotated UI images

Images demonstrating the PactFlow UI have been annotated using Figma. Styles and examples can be found [here](https://www.figma.com/file/h2mJNirJdlS9NZmPpxXlA6/PactFlow-Doc-image-annotations?node-id=0%3A1).
Access for editing granted on request.
