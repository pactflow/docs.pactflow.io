---
title: Provider Testing Guide
sidebar_label: Provider
---

## Principles

* Testing the provider API is your responsibility, Pactflow simply ensures the specification is compatible with any consumers
* Garbage in, Garbage out - Pactflow trusts any provider contract that is provided. This is true, whether or not it has actually been tested.
* When using the BYO functional API testing strategy, you must take responsibility for ensuring your API is compatible with (and ideally, implements) any specification.
* Code based approaches are generally preferred because they are less likely to drift from implementation. For example, using tools that generate OAS definitions from code/types are more likely to be reliable
* When supported, test based approaches such as postman collections, may also be more reliable, as they have embedded testing information in them. Pactflow will be able to only compare responses that have been tested and therefore are reliable.

## Writing Provider Contracts

![Provider Test](/workshops/bi-directional/1-bi-directional-provider-testing-scope.png "Provider Test")

### Step 1: Authoring or generating your OpenAPI  Specification

You must have, or be able to produce, one of the following OpenAPI Specification (OAS) formats:

* OAS v2
* OAS v3

If you don't have an OAS, it's possible you can convert from a format you already have or from your code (e.g. via types/annotations) before uploading to Pact.

For example, there are tools that can convert Postman collections or RAML documents to OAS.

### Step 2: Choose an API testing tool

There are many tools out. You may want to choose a black-box style functional API testing tool like Dredd or Postman, or white-box style tools such as RestAssured or Supertest.

The key consideration is that you also ensure your API is compatible with an OAS.

### Step 3: Verifying the Provider Contract (Testing your API)

Configure your CI pipeline to run these tests on every change. We suggest running these tests against a locally running server so that you have control and therefore determinism in your tests.

Running against a dedicated testing environment will likely result in flakey tests.

### Step 4: Publish your Provider Contract and verification results

After your tests have completed (pass/fail), you should upload the specification and results to Pactflow.

:::note

We will be supporting this via our CLI tools, but currently you must make both API calls directly. 

:::

1. `create_branch_version` ([API Reference](https://github.com/pact-foundation/pact_broker/blob/master/lib/pact_broker/doc/views/index/pacticipant-branch-version.markdown)) / [Example via Makefile](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/d562158cd0920eb57e5ba7007e65db4a9f08cbe9/Makefile#L26) / [Example Script](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/master/scripts/create_branch_version.sh)
   1. This will associate the `version` with a  `branch` label 
2. `publish_contracts` ([API Reference](https://github.com/pact-foundation/pact_broker/blob/master/lib/pact_broker/doc/views/index/publish-contracts.markdown)) / [Example via Makefile](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/d562158cd0920eb57e5ba7007e65db4a9f08cbe9/Makefile#L32) / [Example Script](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/master/scripts/publish.sh)
   1. This will associate the `version` with a `provider contract`

See [publishing your OpenAPI Provider Contract to Pactflow](./contracts/oas#publishing-the-provider-contract--results-to-pactflow) for full details and examples.

### Step 4: Run can-i-deploy

[`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy/) gives you immediate feedback if you are safe to release a version of an application to a specified environment (such as `production`).

We recommend using the `pact-broker can-i-deploy` command from [CLI Tools](https://docs.pact.io/implementation_guides/cli/#distributions) for this step. 

Our [examples](https://github.com/pactflow/example-bi-directional-provider-postman/blob/984f635a2317faea9137d9aa52a17f77324e5568/Makefile#L74) use the Docker version of this to simplify administration.

The output from the command will provide a link to the verification result in Pactflow. Interpreting these results is contract specific.

Here is our pipeline to date on the first run of a provider:

![Provider Pipeline First Run](/workshops/bi-directional/2-bi-directional-provider-pipeline-first-run.png "Provider Pipeline First Run")

### Step 5: Deploy your application

If `can-i-deploy` returns a successful response, you can deploy your application. 

Once your application is deployed, you can notify Pactflow of the release - we recommend that you set the branch property when you publish provider contracts, and use [record-deployment](https://docs.pact.io/pact_broker/recording_deployments_and_releases#recording-deployments) or [record-release](https://docs.pact.io/pact_broker/recording_deployments_and_releases#recording-releases) when you deploy/release.

Our [examples](https://github.com/pactflow/example-bi-directional-provider-postman/blob/984f635a2317faea9137d9aa52a17f77324e5568/Makefile#L82) use the Docker version of this to simplify administration.

_Golden rule of deployments:_

> The Pact Broker needs to know which versions of each application are in each environment so it can return the correct contracts for verification and determine whether a particular application version is safe to deploy.

> `record-deployment` automatically marks the previously deployed version as undeployed, and is used for APIs and consumer applications that are deployed to known instances.

> `record-release` does NOT change the status of any previously released version, and is used for mobile applications and libraries that are made publicly available via an application store or repository.

## Integrating it into your CI/CD pipeline

A simplified view of a CI/CD pipeline for Pact looks like this:

![Provider Pipeline](/workshops/bi-directional/3-bi-directional-provider-pipeline-with_consumer.png "Provider Pipeline")

The standard [principles](https://docs.pact.io/pact_nirvana) are still relevent. Our [CI/CD workshop](/docs/workshops/ci-cd) is a useful reference (NOTE: the CI/CD workshop uses the consumer-driven mode using Pact).

## Other

### Other examples of how to do this form of testing

* https://hazelcast.com/blog/contract-first-development-using-restassured-and-openapi/
* https://www.openapi4j.org/operation-validator-adapters/spring.html
* https://springframework.guru/should-i-use-spring-rest-docs-or-openapi/
* https://github.com/OpenAPITools/openapi-generator (generate rest assured tests from spec)