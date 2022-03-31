---
custom_edit_url: https://github.com/pactflow/example-consumer-wiremock/edit/master/README.md
title: Example Java Wiremock Consumer
sidebar_label: Example Java Wiremock Consumer
---

<!-- This file has been synced from the pactflow/example-consumer-wiremock repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-consumer-wiremock


![Build](https://github.com/pactflow/example-consumer-wiremock/workflows/Build/badge.svg)

[![Can I deploy Status](https://testdemo.pactflow.io/pacticipants/pactflow-example-consumer-wiremock/branches/master/latest-version/can-i-deploy/to-environment/production/badge)](https://testdemo.pactflow.io/pacticipants/pactflow-example-consumer-wiremock/branches/master/latest-version/can-i-deploy/to-environment/production/badge)

This is an example of a Java consumer that uses Wiremock (with Junit5), [Pactflow](https://pactflow.io) and Travis CI to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

It is using a public tenant on Pactflow, which you can access [here](https://test.pact.dius.com.au) using the credentials `dXfltyFMgNOFZAxr8io9wJ37iUpY42M`/`O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1`.

See the canonical consumer example here: https://github.com/pactflow/example-consumer
See also the full [Pactflow CI/CD Workshop](https://docs.pactflow.io/docs/workshops/ci-cd) for which this can be substituted in as the "consumer".

## Bi-directional provider

This project is currently compatible with the following providers:

* Java Springboot tested via RestAssured: https://github.com/pactflow/example-provider-restassured
* JS express tested via Dredd: https://github.com/pactflow/example-bi-directional-contracts-provider

## Pre-requisites

**Software**:

* Tools listed at: https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/
* A pactflow.io account with an valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)
#### Environment variables

To be able to run some of the commands locally, you will need to export the following environment variables into your shell:

* `PACT_BROKER_TOKEN`: a valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token) for Pactflow
* `PACT_BROKER_BASE_URL`: a fully qualified domain name with protocol to your pact broker e.g. https://testdemo.pactflow.io
* `PACT_PROVIDER`: You can use this to override the name of the provider you want to test for this. It defaults to `pactflow-example-provider-restassured` for compatibility with the [Java RestAssured](https://github.com/pactflow/example-provider-restassured) provider

### Usage

* `make test` - run the tests locally
* `make fake_ci` - run the CI process locally
