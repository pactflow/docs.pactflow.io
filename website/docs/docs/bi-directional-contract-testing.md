---
title: Bi-Directional Contract Testing Guide
sidebar_label: Overview
---

## Introduction

Bi-Directional Contract Testing is a type of **static contract testing** where two contracts - one representing consumer expectations, and another representing the provider's capability - are compared to ensure they are compatible.

Teams generate a consumer contract from a mocking tool (such as Pact or Wiremock) and API providers verify a provider contract (such as an OAS) using a functional API testing tool (such as ReadyAPI). PactFlow then statically compares the contracts down to the field level to ensure compatibility.

Bi-Directional Contract Testing (BDCT) allows you to "upgrade" your existing tools into a powerful contract-testing solution. It simplifies adoption and reduces contract testing implementation time across your architecture.

BDCT is a feature exclusive to PactFlow and is not available in the Pact OSS project.

:::info
**A note for Pact users**: when contract testing with Pact, you need to write and maintain a separate set of (Pact) tests responsible for ensuring systems are compatible. The tests on the consumer side produce a consumer contract containing example scenarios to be supported for the consumer to work. These scenarios are then replayed against an actual running provider in a **record and replay** style interaction. If the Provider responds correctly, the contract is valid.

With BDCT, the key difference is that a Provider uploads its own **provider contract** advertising its full capability which is statically compared to the consumer contract expectations. The consumer contract is never replayed against the provider code base. This creates a [simpler](#comparison-to-pact) and decoupled workflow. See the [trade-offs](#trade-offs) for more information.

BDCT is not intended to replace Pact testing, but to provide an alternative in cases where Pact may not be best suited.

:::

<div style={{textAlign: 'center'}}>
  <iframe  width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLwy9Bnco-IpfddOl7vk7xfmGSjMMCiSbi" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
</div>

## Use Cases

| Use Case                                                                           | Description                                                                                                                                                                                                                                                                                                  | How Bi-Directional Contract Testing Help                                                                                                                                                        |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Retrofitting contract-testing onto an existing system                              | Writing many Pact tests to cover all scenarios can be time-consuming                                                                                                                                                                                                                                         | Bi-Directional Contract Testing lets you re-use existing tools to get greater coverage faster                                                                                                   |
| API Gateways                                                                       | Pass through systems can be cumbersome to test with Pact (particularly handling state and mocking systems)                                                                                                                                                                                                   | Using specifications as the contract simplifies the approach                                                                                                                                    |
| Internal APIs with large numbers of consumers                                      | Many consumers can make testing with Pact difficult, due to challenges with provider states and release co-ordination                                                                                                                                                                                        | Bi-Directional Contract Testing is ideally suited as it decouples teams, and is particularly useful with fairly stable APIs (for example, Auth)                                                         |
| Testing against 3rd party APIs                                                     | Pact is not ideally suited to 3rd party APIs because 3rd parties are unlikely to validate your Pacts                                                                                                                                                                                                         | By pulling in the third party's API specification (OAS) regularly, you can continually ensure your consumers are compatible                                                                     |
| Internal microservices following a contract-first approach (OpenAPI Specification) | Contract testing is ideally suited to internal service-to-service testing                                                                                                                                                                                                                                    | Bi-Directional Contract Testing can speed this process up by re-using the OAS as per the provider spec                                                                                              |
| Web-based contract tests (for example, Cypress, MSW)                                       | Web applications use mocking/stubbing heavily, which could result in getting out of sync with the Provider API implementation. Further, using Pact from these tools can [lead to challenges](https://pactflow.io/blog/a-disastrous-tale-of-ui-testing-with-pact/) if not carefully implemented | Bi-Directional Contract Testing removes the need for additional Pact tests and the problem associated with too many interactions in a contract                                                  |
| Monolith to microservice migrations                                                | For example, gradually splitting of microservices using the "strangler" pattern, or to a completely new design                                                                                                                                                                                                 | Contract testing helps you migrate from legacy applications to a modernised architecture by preventing breaking changes. When existing contract tests pass, you know it's safe to cutover. |

<!-- | Public APIs (documented via OpenAPI Specifications) | Open Banking | Pact is not ideally suited to public APIs because you don't have consumers creating tests. With Bi-Directional Contract Testing, you could allow consumers to use contract-testing in a more decoupled way | -->

## Comparison to Pact

### When to use

Here is an at-a-glance view of the key differences in approaches to achieve the benefits of _contract testing_.

This is not intended as an overall guide to a comprehensive testing strategy and ignores the differences in value of each approach outside the scope of contract testing.

:::info

**Remember**: Contract tests focus on the messages that flow between a consumer and provider, while functional tests also ensure that the correct side effects have occurred. For example, imagine an endpoint for a collection of `/orders` that accepts a POST request to create a new order. 

A contract test would ensure that the consumer and provider had a shared and accurate understanding of the request and response required to create an order.

A functional test for the provider would ensure that when a given request was made, an Order with the correct attributes was actually persisted to the underlying datastore. A contract test do not check for side effects.
:::

[Read more](https://docs.pact.io/consumer/contract_tests_not_functional_tests) on the aim and scope of contract tests.

|                 | Traditional                                 | Consumer Driven Contract Testing                                                                                                                                                                                                                      | Bi-Directional Contract Testing                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Approach**    | E2E testing                                 | Consumer driven contract testing<br/><br/>_(for example, Pact, Spring Cloud Contract)_                                                                                                                                                                        | Specification or code generated contract tests<br/><br/>_(for example, OAS, Postman Collections, Wiremock, Mountebank, GraphQL, Protobuf)_                                                                                                                                                                                                                                                                                                                                 |
| **Summary**     | The lowest cost and maintenance, with the best guarantees | Strongest contract-testing outcomes but comes with a learning curve.                                                                                                                                                                                 | Weaker guarantees than CDC but decouples teams and can be used with third parties/unknown consumers.                                                                                                                                                                                                                                                                                                                                                              |
| **When to use** | To supplement CDC and functional tests.     | **Use case**: Green fields projects.<br/><br/>**Author**: Developer/SDET<br/><br/>**Context**: When there is good buy-in from teams.<br/><br/>When code is accessible (white-box testing mode).<br/><br/>When stronger guarantees are warranted. | **Use case**:<br/><br/><ul><li>Retrofitting contract-tests onto existing systems</li><li>API Gateways</li><li>3rd Party API Testing</li><li>Contract first / API first workflows</li></ul><br/>**Author**: Anyone (Developers, Testers)<br/><br/>**Context**: When you can’t do Pact or code-based contract tests for example, black-box testing required or no access to code.<br/><br/>When you can BYO tools and extract further value from existing investments |

### Trade-offs

|                                   | Traditional | Consumer Driven Contract Testing                            | Bi-Directional Contract Testing                                                                                                    |
| --------------------------------- | ----------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
|                                   | E2E Testing | Contract test<br/><br/>_(for example, Pact, Spring Cloud Contract)_ | Specification or code generated contract tests<br/><br/>_(for example, OAS, Postman Collections, Wiremock, Mountebank, GraphQL, Protobuf)_ |
| **Outcomes**                      |             |                                                             |
| Guarantees                        | ++++        | +++                                                         | +                                                                                                                                  |
| Flakiness                         | \---        | +++                                                         | +++                                                                                                                                |
| Cost of maintenance               | \---        | ++                                                          | +++                                                                                                                                |
| Learning curve                    | ++++        | \-                                                          | +                                                                                                                                  |
| Team coupling                     | \---        | +                                                           | +++                                                                                                                                |
| **Testing Properties**            |             |                                                             |
| Isolation                         | \-          | +++                                                         | +                                                                                                                                  |
| Complexity                        | \-          | +                                                           | +++                                                                                                                                |
| Test data setup                   | \-          | ++                                                          | +++                                                                                                                                |
| Testing data semantics            | +           | \-                                                          | \-                                                                                                                                 |
| Feedback time                     | \-          | ++                                                          | +++                                                                                                                                |
| Stability                         | \-          | ++                                                          | +++                                                                                                                                |
| Reveal unused interfaces / fields | \-          | +++                                                         | +                                                                                                                                  |
| Well fittedness                   | \-          | +++                                                         | \-                                                                                                                                 |
| Unknown consumers                 | +           | \-                                                          | +                                                                                                                                  |

:::note understanding the trade-off table

More `+` is better, more `-` is worse. For example, E2E testing has the highest `Guarantee` but the worst with regards to `Flakiness`

:::

## How it works

In the following animation, you can see a high-level overview of the process.

<video width="100%" controls="controls">
  <source src="/workshops/bi-directional/video.mp4" type="video/mp4" />
</video>

:::info

The testing process may be initiated from either the consumer side (_consumer driven_) or the provider side (_specification first_)

:::

### Steps

_Provider_

1. Provider starts with its specification (for example, an OpenAPI specification) called the `Provider Contract`. This may be created by hand or generated by code (for example, swagger codegen).
2. The `Provider Contract` is tested against the provider, using a functional API testing tool (such as ReadyAPI, SoapUI, RestAssured, Dredd, or Postman) or generated by code (such as via Swashbuckle, Spring Docs).
3. The `Provider Contract` is uploaded to PactFlow.
4. When we call `can-i-deploy` the cross-contract validation process in PactFlow generates a `Verification Result` ensuring the provider doesn't break any of its consumers.
5. If that passes, we deploy the provider and record the deployment via the `pact-broker record-deployment` command.

_Consumer_

1. Consumer tests its behaviour against a mock (such as Pact or Wiremock).
2. The `Consumer Contract` is produced, in the form of a pact file, that captures _only_ the actual interactions generated by the consumer code.
3. The `Consumer Contract` is uploaded to PactFlow.
4. When we call `can-i-deploy` the cross-contract validation process in PactFlow generates a `Verification Result` determining if the consumer consumes a valid subset of the provider contract.
5. If that passes, we deploy the consumer and record the deployment via the `pact-broker record-deployment` command.

### Terminology

- **Consumer**: An application uses the functionality or data from another application to do its job. For applications that use HTTP, the consumer is always the application that initiates the HTTP request (for example, the web front end), regardless of the direction of data flow. For applications that use queues, the consumer is the application that reads the message from the queue.

- **Provider**: An application (often called a service) that provides functionality or data for other applications to use, often via an API. For HTTP applications, the provider is the application that returns the response. For applications that use queues, the provider (also called the producer) is the application that writes the messages to the queue.

- A **consumer contract** is a collection of interactions that describe how the Consumer expects the Provider to behave. Each Consumer will have its own unique consumer contract for each Provider.

- A **provider contract** specifies the Provider's capability. In this workshop, it will take the form of an OpenAPI document. However, it may in be other formats such as a GraphQL schema, a SOAP XSD, a protobuf definition etc.

- **Cross-contract validation** or **contract comparison**: the process by which PactFlow confirms that the consumer contract is a valid subset of a provider contract. For example, it will ensure that all request/responses defined in a pact file and valid resources and match the schemas in a provider OAS file.

## Contract support

### Pact

Consumer contracts must currently be specified in a pact format. You may use any tool, including Pact, to generate a pact file.

Read the documentation on using [Pact as a consumer contract](/docs/bi-directional-contract-testing/contracts/pact) for more on how to convert mocks into the Pact format.

### OpenAPI Specification

Provider contracts may be specified using an OpenAPI Specification.

Read the documentation using [OpenAPI Specification as provider contract](/docs/bi-directional-contract-testing/contracts/oas) for more.
