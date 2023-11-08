---
id: tutorials
title: Tutorials
---

We've created a few short, in-browser tutorials using the Killercoda platform to get you up and running quickly depending on your level.

The courses are written in Node and Java, however, extensive experience with the languages will not be required for the workshop.

_NOTE: To complete the workshop, you will need to authenticate to Killercoda (the online learning platform) with GitHub, Google, Twitter or LinkedIn._

![Node Tutorial](/workshops/katacoda-screenshot.png)

## Prerequisites

To complete these tutorials, you must have:

- a PactFlow account (register for a free account at <https://pactflow.io/try-for-free>)
- a [read/write API Token](/docs/getting-started/#configuring-your-api-token) from your PactFlow account
- a basic understanding of APIs, unit testing and how to operate a linux terminal

## Getting Started with PactFlow

_Level: Beginner_

In this tutorial, we guide you through getting started with Pact and PactFlow.

You will create your first contract, publish it to PactFlow and verify it on your provider.

### Goals

Ultimately, our goal is to get you up and integrated with PactFlow as quickly as possible!

You will:

1. Learn the basic concepts of Pact.
1. Get hands-on experience with the key aspects of writing, publishing and verifying pacts.
1. See how PactFlow fits into the picture so that you can get up and running quickly.

### Tutorial

| Language | Link                                                                   |
| -------- | ---------------------------------------------------------------------- |
| Node JS  | <https://killercoda.com/pactflow/scenario/pactflow-getting-started-js>   |
| Java     | <https://killercoda.com/pactflow/scenario/pactflow-getting-started-java> |

## Gating deployments with PactFlow

_Level: Intermediate_

In the scenario, we extend the workshop from above, learning how to gate deployments using the `can-i-deploy` tool in the process.

### Goals

Learn how to prevent releasing incompatible changes to production, by using integrating `can-i-deploy` into your CI/CD process.

You will:

1. Build on a basic contract testing example
1. Learn how PactFlow fits into the picture
1. Understand important Pact CLI tools
1. Learn how deployments work with PactFlow

### Tutorial

You can complete the course at <https://killercoda.com/pactflow/scenario/pactflow-can-i-deploy-js>.

## Bi-Directional Contract Testing

_Level: Intermediate_

Learn how to implement a Bi-Directional Contract Testing workflow from end-to-end, including integration with your CI/CD system.

### Goals

You will learn how:

1. To use OpenAPI as part of a contract testing strategy
1. API testing tools such as ReadyAPI/SoapUI/Dredd or Postman can be used with PactFlow
1. To publish contracts (such as a pact file or an OpenAPI document) to PactFlow
1. To prevent deploying breaking changes to an environment, such as production
1. To use existing mocking tools (such as Mountebank or Wiremock) to create a consumer contract

### Agenda

You will:

1. Create and document an API using [OpenAPI Specification](https://www.openapis.org/)
1. Write tests for the API using the Dredd API testing tool
1. Publish the _provider contract_ (an OpenAPI document) to PactFlow
1. Deploy the provider to production
1. Write the API consumer
1. Write tests for an API client using Mountebank to mock the API, and convert those mocks into a _consumer contract_
1. Publish the consumer contract to PactFlow
1. Deploy the consumer to production
1. Learn about PactFlow's breaking change detection system

### Tools used

- Node - for the applications being tested
- [Mountebank](https://mbtest.org) - for API mocking
- [Dredd](https://dredd.org/en/latest/index.html) - for API Testing
- Github Actions - for CI/CD pipeline

### Tutorial

You can complete the course at <https://killercoda.com/pactflow/scenario/pactflow-bi-directional-contracts-intro>.
