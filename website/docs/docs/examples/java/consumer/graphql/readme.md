---
custom_edit_url: https://github.com/pactflow/example-consumer-java-graphql/edit/master/README.md
title: Example Java GraphQL Consumer
sidebar_label: Example Java GraphQL Consumer
---

<!-- This file has been synced from the pactflow/example-consumer-java-graphql repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-consumer-java-graphql


![Build](https://github.com/pactflow/example-consumer-java-junit/workflows/Build/badge.svg)

[![Can I deploy Status](https://test.pactflow.io/pacticipants/pactflow-example-consumer-java-junit/branches/master/latest-version/can-i-deploy/to-environment/production/badge.svg)](https://test.pactflow.io/overview/provider/pactflow-example-consumer-java-graphql/consumer/pactflow-example-consumer-java-junit)

[![Pact Status](https://test.pactflow.io/pacts/provider/pactflow-example-consumer-java-graphql/consumer/pactflow-example-consumer-java-junit/latest/badge.svg)](https://test.pactflow.io/pacts/provider/pactflow-example-consumer-java-graphql/consumer/pactflow-example-consumer-java-junit/latest) (latest pact)

[![Pact Status](https://test.pactflow.io/pacts/provider/pactflow-example-consumer-java-graphql/consumer/pactflow-example-consumer-java-junit/latest/prod/badge.svg)](https://test.pactflow.io/pacts/provider/pactflow-example-consumer-java-graphql/consumer/pactflow-example-consumer-java-junit/latest/prod) (prod/prod pact)

This is an example of a Java GraphQL consumer that uses Pact with Junit, [Pactflow](https://pactflow.io) and GitHub Actions to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

It is using a public tenant on Pactflow, which you can access [here](https://test.pactflow.io) using the credentials `dXfltyFMgNOFZAxr8io9wJ37iUpY42M`/`O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1`.

See also the full [Pactflow CI/CD Workshop](https://docs.pactflow.io/docs/workshops/ci-cd) for which this can be substituted in as the "consumer".

## Pre-requisites

**Software**:

## Dependencies

- Docker
- A [PactFlow](https://pactflow.io) account
- A [read/write API Token](https://docs.pactflow.io/#configuring-your-api-token) from your PactFlow account
- Java 19+ installed
- A linux based environment (e.g. MacOSX, Linux, Windows Subsystem for Linux)

## Usage

```sh
make test
```
