---
title: Bi-directional Contracts Guide
sidebar_label: Overview
---

## Introduction

Bi-directional contracts is a Pactflow only feature that allows teams to generate a contract from existing mocks (such as Wiremock) and to verify API providers using the functional API testing tools they are already using (such as Postman). Teams can use our plug-and-play adapters for popular tools or write their own.

When contract-testing with Pact, you need to write and maintain a separate set of tests that are responsible for ensuring systems are compatible.

Bi-directional contracts provides the ability to “upgrade” your existing tools into a powerful contract-testing solution, simplifying adoption and reducing the time to implement contract testing across your architecture.

:::info

Bi-directional contracts is currently in **developer preview**, and supports pact files (consumer) and OpenAPI Specification (provider)

:::

## Use Cases

| Use Case                                            |  Description                                                    | How Bi-Directional Contracts Help |
|-----------------------------------------------------|-----------------------------------------------------------------|-----------------------------------|
| Retrofitting contract-testing on an existing system | Writing many Pact tests to cover all scenarios can be time-consuming | Bi-directional contracts lets you re-use existing tools to get greater coverage faster |
| API Gateways | Pass through systems can be cumbersome to test with Pact (particularly handling state and mocking systems) | Using specifications as the contract simplifies the approach |
| Internal APIs with large numbers of consumers |  |
| Testing against 3rd party APIs | Pact is not ideally suited to 3rd party APIs because 3rd parties are unlikely to validate your Pacts | By pulling in the third party's API specification (OAS) regularly, you can continually ensure your consumers are compatible |
| Public APIs (documented via OpenAPI Specifications) | Open Banking |aoeu  |
| Internal microservices documented with an OpenAPI Specification | |
| Monolith to microservice migrations | For example, gradually splitting of microservices using the "strangler" pattern, or to a complete new design | Contract testing helps you migrate from your legacy applications to a modernised architecture by preventing breaking changes. When existing contract tests pass, you know it's safe to cutover. |


## Comparison to Pact

### When to use

Here is an at-a-glance view of

|             |Traditional | Consumer Driven Contract Testing | Bi-Directional Contract Testing  |
| ----------- | -------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Approach**    | E2E testing | Consumer driven contract testing<br/><br/>_(e.g. Pact, Spring Cloud Contract)_ | Specification or code generated contract tests<br/><br/>_(e.g. OAS, Postman Collections, Wiremock, Mountebank, GraphQL, Protobuf)_ |
| **Summary**     | Worst cost and maintenance, best guarantees                          | Strongest contract-testing outcomes, but comes with a learning curve.  | Weaker guarantees than CDC, but decouples teams and can be used with third parties/unknown consumers.                                                                                                                                                                                                                                                                                  |
| **When to use** | Avoid where possible.<br/><br/>To supplement CDC and functional tests. | **Use case**: Green fields projects.<br/><br/>**Author**: Developer/SDET<br/><br/>**Context**: When there is good buy-in from teams.<br/><br/>When there is access to code (white-box testing mode).<br/><br/>When stronger guarantees are warranted. | **Use case**:<br/><br/><ul><li>Retrofitting contract-tests onto existing systems</li><li>API Gateways</li><li>3rd Party API Testing</li></ul><br/>**Author**: Anyone (Developers, Testers)<br/><br/>**Context**: When you can’t do Pact or code-based contract tests e.g. black-box testing required or no access to code.<br/><br/>When you can BYO tools and extract further value from existing investment in them |

### Trade-offs

|                     | Traditional | Consumer Driven Contract Testing                           | Bi-directional Contract Testing                                                                                                |
| ------------------- | ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
|                     | E2E Testing | Contract test<br/><br/>_(e.g. Pact, Spring Cloud Contract)_ | Specification or code generated contract tests<br/><br/>_(e.g. OAS, Postman Collections, Wiremock, Mountebank, GraphQL, Protobuf)_ |
| **Outcomes**                | | |
| Guarantees          | ++++        | +++                                   | +                                                                                                                              |
| Flakiness           | \---        | +++                                   | +++                                                                                                                            |
| Cost of maintenance | \---        | ++                                    | +++                                                                                                                            |
| Learning curve      | ++++        | \-                                    | +                                                                                                                              |
| Team coupling       | \---        | +                                     | +++                                                                                                                            |
| **Testing Properties**                | | |
| Isolation                         | \- | +++ | + | + |
| Complexity                        | \- | + | +++ | ++ |
| Test data setup                   | \- | ++ | +++ | +++ |
| Testing data semantics            | + | \- | \- | + |
| Feedback time                     | \- | ++ | +++ | ++ |
| Stability                         | \- | ++ | +++ | ++ |
| Reveal unused interfaces / fields | \- | +++ | + | + |
| Well fittedness                   | \- | +++ | \- | \- |
| Unknown consumers                 | + | \- | + | \- |
:::note understanding the trade-off table

More `+` is better, more `-` is worse. For example, E2E testing has the highest `Guarantee` but the worst with regards to`Flakiness`

:::

## How it works

In the following animation, you can see a high level overview of the process.

<video width="100%" controls="controls">
  <source src="/workshops/bi-directional/video.mp4" type="video/mp4" />
</video>

:::info

The testing process may be initiated from either the consumer side (_consumer driven_) or provider side (_specification first_)

:::

### Steps

_Consumer_

1. Consumer tests its behaviour against a mock (such as Pact or Wiremock)
2. The `Consumer Contract` is produced, in the form of a pact file, that captures _only_ the actual interactions generated by the consumer code
3. The `Consumer Contract` is uploaded to Pactflow
4. When we call "can-i-deploy" the cross-contract validation process kicks off on Pactflow, to ensure any consumer consumes a valid subset of the provider contract.

_Provider_

1. Provider starts with its specification (e.g. an OpenAPI specification) referred to as the `Provider Contract`. This may be created by hand or generated by code (e.g. swagger codegen)
2. The `Provider Contract` is tested against the provider, using a functional API testing tool (such as RestAssured, Dredd, or Postman) or
3. The `Provider Contract` is uploaded to Pactflow
4. When we call "can-i-deploy" the cross-contract validation process kicks off on Pactflow, to ensure the provider doesn't break any of its consumers

<!-- ![Consumer Test](/workshops/bi-directional/consumer-scope.png "Consumer Test")
![Contract Upload](/workshops/bi-directional/bi-directional-upload.png "Contract Upload")
![Provider Test](/workshops/bi-directional/provider-scope.png "Provider Test") -->

<!-- When you run the CI pipeline (see below for doing this), the pipeline should perform the following activities (simplified):

![Provider Pipeline](/workshops/bi-directional/provider-pipeline.png "Provider Pipeline")
![Provider Pipeline](/workshops/bi-directional/consumer-pipeline.png "Provider Pipeline") -->

## Contract support

### OpenAPI Specification

#### Warning - here be dragons 🐉

* You must ensure `additionalProperties` in your OAS is set to `false` on any response body, to ensure a consumer won't get false positives if they add a new field that isn't actually part of the spec (see
https://bitbucket.org/atlassian/swagger-mock-validator/issues/84/test-incorrectly-passes-when-mock-expects for an interesting read on why this is necessary. TL;DR - it's JSON Schemas fault)
*  you are responsible for ensuring sufficient OAS coverage. To highlight this point, in our example, we do _not_ test the 404 case on the provider, but the consumer has a pact for it and it's tests still pass! _NOTE: We plan to address this problem in the future_
* _implementing_ a spec is not the same as being _compatible_ with a spec. Most tools only tell you that what you’re doing is _not incompatible_ with the spec. _NOTE: We plan to address this problem in the future_

### GraphQL

TBC
### gRPC/Protobufs

TBC


## Postman Collections

###