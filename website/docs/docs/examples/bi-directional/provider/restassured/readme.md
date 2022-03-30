---
custom_edit_url: https://github.com/pactflow/example-provider-restassured/edit/master/README.md
title: Example RestAssured Provider
sidebar_label: Example RestAssured Provider
---

<!-- This file has been synced from the pactflow/example-provider-restassured repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-provider-restassured


[![Build Status](https://github.com/pactflow/example-provider-restassured/actions/workflows/build.yml/badge.svg)](https://github.com/pactflow/example-provider-restassured/actions)

[![Can I deploy Status](https://testdemo.pactflow.io/pacticipants/pactflow-example-provider-restassured/branches/master/latest-version/can-i-deploy/to-environment/production/badge)](https://testdemo.pactflow.io/pacticipants/pactflow-example-provider-restassured/branches/master/latest-version/can-i-deploy/to-environment/production/badge)

[![pactflow-example-provider-restassured/pactflow-example-consumer](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-restassured/consumer/pactflow-example-consumer/latest/master/badge.svg)](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-restassured/consumer/pactflow-example-consumer/latest/master)

This is an example of a Spring boot API provider that uses RestAssured, [Pactflow](https://pactflow.io) and its [bi-directional contracts feature](https://pactflow.io/blog/bi-directional-contracts/) to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

It is using a public tenant on Pactflow, which you can access [here](https://testdemo.pactflow.io/) using the credentials `dXfltyFMgNOFZAxr8io9wJ37iUpY42M`/`O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1`. The latest version of the Example Pactflow Consumer/Example Pactflow Provider (RestAssured) pact is published [here](https://testdemo.pactflow.io/overview/provider/pactflow-example-provider-resassured/consumer/pactflow-example-consumer).

## Pre-requisites

**Software**:

* Tools listed at: https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/
* A pactflow.io account with an valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)
#### Environment variables

To be able to run some of the commands locally, you will need to export the following environment variables into your shell:

* `PACT_BROKER_TOKEN`: a valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token) for Pactflow
* `PACT_BROKER_BASE_URL`: a fully qualified domain name with protocol to your pact broker e.g. https://testdemo.pactflow.io

### Usage

* `make test` - run the tests locally
* `make fake_ci` - run the CI process locally

## Other examples of how to do this form of testing

* https://hazelcast.com/blog/contract-first-development-using-restassured-and-openapi/
* https://www.openapi4j.org/operation-validator-adapters/spring.html
* https://springframework.guru/should-i-use-spring-rest-docs-or-openapi/
* https://github.com/OpenAPITools/openapi-generator (generate rest assured tests from spec)
