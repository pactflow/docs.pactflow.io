---
custom_edit_url: https://github.com/pactflow/example-bi-directional-consumer-dotnet/edit/${branch}/README.md
title: Example .NET Pact Consumer
sidebar_label: Example .NET Pact Consumer
---

<!-- This file has been synced from the pactflow/example-bi-directional-consumer-dotnet repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-bi-directional-consumer-dotnet


![Build](https://github.com/pactflow/example-consumer/workflows/Build/badge.svg)

This is an example of a .NET consumer using Pact to create a consumer driven contract, and sharing it via [Pactflow](https://pactflow.io).

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

* Test
  * Run tests (including the pact tests that generate the contract)
  * Publish pacts, tagging the consumer version with the name of the current branch
  * Check if we are safe to deploy to prod (ie. has the pact content been successfully verified)
* Deploy (only from master)
  * Deploy app (just pretend for the purposes of this example!)
  * Record the deployment in the Pact Broker

## Usage

See the [Pactflow CI/CD Workshop](https://github.com/pactflow/ci-cd-workshop).

## Bi-directional Contracts Feature (BYO Tools)

_NOTE: if you're running the CI/CD workshop, you can ignore this section. This is an extension to the example that demonstrates a new [feature](https://github.com/pactflow/roadmap/issues/4) in developer preview._

This is an example of a .NET consumer using Pact to create a consumer driven contract, and sharing it via [Pactflow](https://pactflow.io).

It implements a "Product" website, to demonstrate the new bi-directional contract capability of Pactflow (previously referred to as Provider driven contracts, or collaborative contracts). See the [Provider](https://github.com/pactflow/example-pactflow-example-provider-dredd) counterpart.

In the following diagram, you can see how the consumer testing process works - it's the same as the current Pact process! (We do show an alternative using Nock's record/replay functionality)

When we call "can-i-deploy" the cross-contract validation process kicks off on Pactflow, to ensure any consumer consumes a valid subset of the OAS for the provider.

![Consumer Test](https://raw.githubusercontent.com/pactflow/example-bi-directional-consumer-dotnet/main/docs/consumer-scope.png)

When you run the CI pipeline (see below for doing this), the pipeline should perform the following activities (simplified):

![Consumer Pipeline](https://raw.githubusercontent.com/pactflow/example-bi-directional-consumer-dotnet/main/docs/consumer-pipeline.png)

### Pre-requisites

**Software**:

* Tools listed at: https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/
* A pactflow.io account with an valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)
* .NET core 3.1 SDK installed, this is the version of .NET core used for this example

#### Environment variables

To be able to run some of the commands locally, you will need to export the following environment variables into your shell:

* `PACT_BROKER_TOKEN`: a valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token) for Pactflow
* `PACT_BROKER_BASE_URL`: a fully qualified domain name with protocol to your pact broker e.g. https://testdemo.pactflow.io
* `PACT_PROVIDER=pactflow-example-provider-dredd`: this changes the default provider to the Dredd based provider (https://github.com/pactflow/example-provider-dredd)
* `PACT_PROVIDER=pactflow-example-provider-postman`: ... Postman (https://github.com/pactflow/example-provider-postman)
* `PACT_PROVIDER=pactflow-example-provider-restassured`: ... Rest Assured (https://github.com/pactflow/example-provider-restassured)
* `PACT_PROVIDER=pactflow-example-bi-directional-provider-dotnet`: ... .NET (https://github.com/pactflow/example-bi-directional-provider-dotnet)
### Usage

#### Pact use case

* `make test` - run the pact test locally
* `make fake_ci` - run the CI process locally
