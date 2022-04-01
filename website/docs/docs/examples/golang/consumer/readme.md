---
custom_edit_url: https://github.com/pactflow/example-consumer-golang/edit/master/README.md
title: Example Consumer
sidebar_label: Example Consumer
---

<!-- This file has been synced from the pactflow/example-consumer-golang repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-consumer-golang


![Build](https://github.com/pactflow/example-consumer-golang/workflows/Build/badge.svg)

[![Pact Status](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-golang/consumer/pactflow-example-consumer-golang/latest/badge.svg?label=provider)](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-golang/consumer/pactflow-example-consumer-golang/latest) (latest pact)

[![Pact Status](https://testdemo.pactflow.io/matrix/provider/pactflow-example-provider-golang/latest/prod/consumer/pactflow-example-consumer-golang/latest/prod/badge.svg?label=provider)](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-golang/consumer/pactflow-example-consumer-golang/latest/prod) (prod/prod pact)

This is an example of a Golang consumer using Pact to create a consumer driven contract, and sharing it via [Pactflow](https://pactflow.io).

It is using a public tenant on Pactflow, which you can access [here](https://testdemo.pactflow.io) using the credentials `dXfltyFMgNOFZAxr8io9wJ37iUpY42M`/`O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1`. The latest version of the Example Consumer/Example Provider pact is published [here](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-golang/consumer/pactflow-example-consumer-golang/latest).

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

* Test
  * Run tests (including the pact tests that generate the contract)
  * Publish pacts, tagging the consumer version with the name of the current branch
  * Check if we are safe to deploy to prod (ie. has the pact content been successfully verified)
* Deploy (only from master)
  * Deploy app (just pretend for the purposes of this example!)
  * Tag the deployed consumer version as 'prod'

## Usage

See the [Pactflow CI/CD Workshop](https://github.com/pactflow/ci-cd-workshop) for background.
