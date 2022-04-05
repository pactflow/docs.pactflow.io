---
custom_edit_url: https://github.com/pactflow/example-consumer/edit/master/README-bi-directional.md
title: Example JS Nock Consumer
sidebar_label: Example JS Nock Consumer
---

<!-- This file has been synced from the pactflow/example-consumer repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-consumer


<!-- The copy below exists in the main readme, but is duplicated here so it can be pulled into https://docs.pactflow.io/docs/examples/bi-directional/consumer/recordreplay/ -->

![Build](https://github.com/pactflow/example-consumer/workflows/Build/badge.svg)

[![Can I deploy Status](https://testdemo.pactflow.io/pacticipants/pactflow-example-consumer/branches/master/latest-version/can-i-deploy/to-environment/production/badge)](https://testdemo.pactflow.io/pacticipants/pactflow-example-consumer/branches/master/latest-version/can-i-deploy/to-environment/production/badge)

This is an example of a Node consumer using Pact to create a consumer driven contract, and sharing it via [Pactflow](https://pactflow.io).

It implements a "Product" website, to demonstrate the new bi-directional contract capability of Pactflow (previously referred to as Provider driven contracts, or collaborative contracts). See the [Provider](https://github.com/pactflow/example-pactflow-example-provider-dredd) counterpart.

It is using a private tenant on Pactflow, which you can access [here](https://testdemo.pactflow.io/). The latest version of the Example Pactflow Consumer/Example Pactflow Provider (Dredd) pact is published [here](https://testdemo.pactflow.io/overview/provider/pactflow-example-provider-dredd/consumer/pactflow-example-consumer).

In the following diagram, you can see how the consumer testing process works - it's the same as the current Pact process! (We do show an alternative using Nock's record/replay functionality)

When we call "can-i-deploy" the cross-contract validation process kicks off on Pactflow, to ensure any consumer consumes a valid subset of the OAS for the provider.

![Consumer Test](https://raw.githubusercontent.com/pactflow/example-consumer/master/docs/consumer-scope.png)

When you run the CI pipeline (see below for doing this), the pipeline should perform the following activities (simplified):

![Consumer Pipeline](https://raw.githubusercontent.com/pactflow/example-consumer/master/docs/consumer-pipeline.png)

### Pre-requisites

**Software**:

* Tools listed at: https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/
* A pactflow.io account with an valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)


#### Environment variables

To be able to run some of the commands locally, you will need to export the following environment variables into your shell:

* `PACT_BROKER_TOKEN`: a valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token) for Pactflow
* `PACT_BROKER_BASE_URL`: a fully qualified domain name with protocol to your pact broker e.g. https://testdemo.pactflow.io
* `PACT_PROVIDER=pactflow-example-provider-dredd`: this changes the default provider to the Dredd based provider (https://github.com/pactflow/example-provider-dredd)
* `PACT_PROVIDER=pactflow-example-provider-postman`: ... Postman (https://github.com/pactflow/example-provider-postman)
* `PACT_PROVIDER=pactflow-example-provider-restassured`: ... Rest Assured (https://github.com/pactflow/example-provider-restassured)
### Usage

#### Pact use case

* `make test` - run the pact test locally
* `make fake_ci` - run the CI process locally

#### BYO Tool use case with Nock (record/replay example)

NOTE: The nock recordings are already in the project, in the `./fixtures` directory, see below for how to obtain these recordings.

* `make clean` - ensure previous pacts are cleared
* `make test_nock` - run the nock test locally
* `make fake_ci_nock` - run the nock version of the CI process locally

*Re-record nock fixtures*

You first need to start up the provider API in order to obtain nock recordings. The API must be running on `http://localhost:3001` for this step to work.

For the default [Provider](https://github.com/pactflow/example-provider-dredd) designed for this workshop, you can simply start it up by running `npm start` in the root directory of the provider project, as per its README.


* `npm run test:record` - this will run nock in record mode, and your api client will issue real requests to the API 
* `npm run test:nock` - run the nock tests in replay only mode, validating all stubs were used in the process, and writing a pact file if successful
