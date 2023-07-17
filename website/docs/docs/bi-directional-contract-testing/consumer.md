---
title: Consumer Testing Guide
sidebar_label: Consumer
---

## Principles

It is important for you to use a _mock_ and not a _stub_. The crucial difference is that a mock validates behaviour, whereas a stub does not. We need to ensure that your consumer code calls the mock, otherwise we will serialise a contract with invalid expectations.

## Writing Consumer Contracts

![Consumer Test](/workshops/bi-directional/1-bi-directional-consumer-testing-scope.png "Consumer Test")

### Prerequisite: choose a mocking tool

If you're not using Pact, you need to pick a tool that can extract the mocking information from or use a pre-existing [adapter](#community-adapters), to convert it to a pact file.

Some tools have options to serialise mocks to files, and others will require you to introspect via their APIs. You should consider this in advance.

### Step 1: Write your consumer tests

Once you have chosen your tool, you must implement consumer side tests. It is important that you exercise all the API behaviour your system expects to ensure you have optimal coverage.

One notably deviation from Pact advice is that you need not concern yourself with finding the minimal set of tests for a contract and are free to use mocks for any functional testing. In fact, this is encouraged.

(Reference to standard contract testing advice: <https://docs.pact.io/consumer/contract_tests_not_functional_tests/>)

### Step 2: Convert your mocks (writing the pact adapter)

_NOTE: If you chose Pact in Step 1, you could skip to Step 3._

Read the [documentation](./contracts/pact) on how to generate a pact contract from your mocks.

:::info

We will be building adapters for common mocking tools as we expand this feature. See current [community contributed adapters](#community-adapters) below.

:::

### Step 3: Publish your contract

Uploading a pact file is the same as the standard [Pact process](https://docs.pact.io/pact_broker/publishing_and_retrieving_pacts/).

We recommend using the `pact-broker publish` command from [CLI Tools](https://docs.pact.io/implementation_guides/cli/#distributions) for this step. Our examples use the Docker version to simplify administration.

![Contract Upload](/workshops/bi-directional/1-bi-directional-how_it_works_overview.png "Contract Upload")

### Step 4: Run can-i-deploy

[`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy/) gives you immediate feedback if you are safe to release a version of an application to a specified environment (such as `production`).

We recommend using the `pact-broker can-i-deploy` command from [CLI Tools](https://docs.pact.io/implementation_guides/cli/#distributions) for this step. Our examples use the Docker version to simplify administration.

The command output will provide a link to the verification results in PactFlow. Interpreting these results is contract specific.

Here is our pipeline to date for the first run of a consumer:

![Consumer Pipeline First Run](/workshops/bi-directional/2-bi-directional-consumer-pipeline-first-run.png "Consumer Pipeline First Run")

### Step 5: Deploy your application

If `can-i-deploy` returns a successful response, you can deploy your application. Once your application is deployed, you can notify PactFlow of the release - see the [recording deployments & releases] (<https://docs.pact.io/pact_broker/recording_deployments_and_releases>) docs

_Golden rule:_

> Associate with the branch name when publishing pacts or verification results and record the deployment or release into any environment.

## Integrating it into your CI/CD pipeline

A simplified view of a CI/CD pipeline for Pact looks like this:

![Consumer Pipeline](/workshops/bi-directional/3-bi-directional-consumer-pipeline-deployed.png "Consumer Pipeline")

The standard [principles](https://docs.pact.io/pact_nirvana) are still relevant. Our [CI/CD workshop](/docs/workshops/ci-cd) is a useful reference (NOTE: the CI/CD workshop uses consumer-driven mode using Pact).

## Community Adapters

All the official and community adapters and guides can be found at [tooling integration](/docs/bi-directional-contract-testing/tools).
