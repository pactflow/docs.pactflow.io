---
custom_edit_url: https://github.com/pactflow/example-bi-directional-provider-dotnet/edit/${branch}/README.md
title: Example .NET Schemathesis Provider
sidebar_label: Example .NET Schemathesis Provider
---

<!-- This file has been synced from the pactflow/example-bi-directional-provider-dotnet repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-bi-directional-provider-dotnet


[![Build Status](https://travis-ci.com/pactflow/example-provider-restassured.svg?branch=master)](https://travis-ci.com/pactflow/example-provider-restassured)

This is an example of a .NET core API provider that uses [Pactflow](https://pactflow.io) and its [bi-directional contracts feature](https://pactflow.io/blog/bi-directional-contracts/) to ensure that it is compatible with the expectations its consumers have of it. This example uses [Swashbuckle](https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-6.0&tabs=visual-studio) to generate a Swagger document, and [Schemathesis](https://github.com/schemathesis/schemathesis) to verify the Swagger document against the endpoints available.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

## Pre-requisites

**Software**:

* Tools listed at: https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/
* A pactflow.io account with an valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)
* .NET core 3.1 SDK installed, this is the version of .NET core used for this example
#### Environment variables

To be able to run some of the commands locally, you will need to export the following environment variables into your shell:

* `PACT_BROKER_TOKEN`: a valid [API token](https://docs.pactflow.io/#configuring-your-api-token) for Pactflow
* `PACT_BROKER_BASE_URL`: a fully qualified domain name with protocol to your pact broker e.g. https://testdemo.pactflow.io

## Usage

### Publish example to your Pactflow

To publish this example to your own Pactflow account and view it in the UI follow these steps.

1. Make sure you have completed the pre-requisite steps of setting up your Pactflow account, and setting the environment variables `PACT_BROKER_TOKEN` and `PACT_BROKER_BASE_URL` with the token and URL from your Pactflow account. These environment variables are what is used in the Makefile simulated build pipeline process to determine which Pactflow instance to publish to.

2. Generate the dll for the project, this is the binary file that would be deployed to an environment. This step generates the Swagger doc for the project, which will be uploaded to Pactflow. Run the following command in the terminal on the root of the project:

    ```make publish_dll```

3. Use Schemathesis to verify that the API endpoints match the generated Swagger doc by running the verify_swagger target. This will generate a a Schemathesis report documenting the compatibility of the endpoints with the Swagger doc

    ```make verify_swagger```

4. If the Schemathasis test is successful run the publish_contract target, this will publish the Swagger document, Schemathesis report, and success status of the verification to your Pactflow account

### Using the fake CI
* `make test` - run the tests locally
* `make fake_ci` - run the CI process locally

## Other examples of how to do this form of testing

* https://hazelcast.com/blog/contract-first-development-using-restassured-and-openapi/
* https://www.openapi4j.org/operation-validator-adapters/spring.html
* https://springframework.guru/should-i-use-spring-rest-docs-or-openapi/
* https://github.com/OpenAPITools/openapi-generator (generate rest assured tests from spec)
