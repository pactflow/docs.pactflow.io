---
title: Provider Testing Guide
sidebar_label: Provider
---

## Principles

- Testing the provider API is your responsibility. PactFlow simply ensures the specification is compatible with any consumers
- Garbage in, Garbage out - PactFlow trusts any provider contract provided. This is true, whether it has been tested or not.
- When using the BYO functional API testing strategy, you must ensure your API is compatible with (and ideally, implements) any specification.
- Code-based approaches are generally preferred because they are less likely to drift from implementation. For example, using tools that generate OAS definitions from code/types is more reliable
- When supported, test-based approaches such as ReadyAPI Functional test suites/postman collections, may also be more reliable, as they have embedded testing information in them. Uploading only the tested parts of the provider contract to PactFlow improves the guarantees we can provide.

## Writing Provider Contracts

![Provider Test](/workshops/bi-directional/1-bi-directional-provider-testing-scope.png "Provider Test")

### Step 1: Authoring or generating your OpenAPI Specification

You must have, or be able to produce, one of the following OpenAPI Specification (OAS) formats:

- OAS v2.0
- OAS v3.0.x (3.1 is not yet supported)

If you don't have an OAS, you can convert from a format you already have or from your code (e.g. via types/annotations) before uploading to Pact.

For example, there are tools that convert Postman collections or RAML documents to OAS.

### Step 2: Choose an API testing tool

There are many tools available. You may want to choose a black-box style functional API testing tool like ReadyAPI/SoapUI/Dredd or Postman, or white-box style tools such as RestAssured or Supertest.

The key consideration is ensuring your API is compatible with an OAS.

### Step 3: Verifying the Provider Contract (Testing your API)

Configure your CI pipeline to run these tests on every change. We suggest running these tests against a locally running server so that you have control and therefore determinism in your tests.

Running against a dedicated testing environment will likely result in flaky tests.

### Step 4: Publish your Provider Contract and verification results

After your tests have completed (pass/fail), you should upload the specification and results to PactFlow.

See [publishing your OpenAPI Provider Contract to PactFlow](https://docs.pactflow.io/docs/bi-directional-contract-testing/contracts/oas#publishing-the-provider-contract--results-to-pactflow) for details and examples.

### Step 4: Run can-i-deploy

[`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy/) gives you immediate feedback if you are safe to release a version of an application to a specified environment (such as `production`).

We recommend using the `pact-broker can-i-deploy` command from [CLI Tools](https://docs.pact.io/implementation_guides/cli/#distributions) for this step.

Our [examples](https://github.com/pactflow/example-bi-directional-provider-postman/blob/984f635a2317faea9137d9aa52a17f77324e5568/Makefile#L74) use the Docker version to simplify administration.

The command output will provide a link to the verification results in PactFlow. Interpreting these results is contract specific.

Here is our pipeline to date for the first run of a provider:

![Provider Pipeline First Run](/workshops/bi-directional/2-bi-directional-provider-pipeline-first-run.png "Provider Pipeline First Run")

### Step 5: Deploy your application

If `can-i-deploy` returns a successful response, you can deploy your application.

Once your application is deployed, you can notify PactFlow of the release - we recommend setting the branch property when you publish provider contracts and use [record-deployment](https://docs.pact.io/pact_broker/recording_deployments_and_releases#recording-deployments) or [record-release](https://docs.pact.io/pact_broker/recording_deployments_and_releases#recording-releases) when you deploy/release.

Our [examples](https://github.com/pactflow/example-bi-directional-provider-postman/blob/984f635a2317faea9137d9aa52a17f77324e5568/Makefile#L82) use the Docker version to simplify administration.

_Golden rule of deployments:_

> The Pact Broker needs to know which versions of each application are in each environment. So, it can return the correct contracts for verification and determine whether a particular application version is safe to deploy.

> `record-deployment` automatically marks the previously deployed version as undeployed and is used for APIs and consumer applications deployed to known instances.

> `record-release` does NOT change the status of any previously released version and is used for mobile applications and libraries made publicly available via an application store or repository.

## Integrating it into your CI/CD pipeline

A simplified view of a CI/CD pipeline for Pact looks like this:

![Provider Pipeline](/workshops/bi-directional/3-bi-directional-provider-pipeline-with_consumer.png "Provider Pipeline")

The standard [principles](https://docs.pact.io/pact_nirvana) are still relevant. Our [CI/CD workshop](/docs/workshops/ci-cd) is a useful reference (NOTE: the CI/CD workshop uses the consumer-driven mode using Pact).

## Other

### Other examples of how to do this form of testing

- <https://hazelcast.com/blog/contract-first-development-using-restassured-and-openapi/>
- <https://www.openapi4j.org/operation-validator-adapters/spring.html>
- <https://springframework.guru/should-i-use-spring-rest-docs-or-openapi/>
- <https://github.com/OpenAPITools/openapi-generator> (generate rest assured tests from spec)
