---
title: Tooling integration - SwaggerHub
sidebar_label: SwaggerHub
---

:::note Pre-requisites
To use this feature, you will need:

* A [Pactflow](https://pactflow.io) account (create a [free account](https://pactflow.io/pricing/)).
* A [SwaggerHub](https://swaggerhub.com) account (create a [free account](https://try.smartbear.com/)).
:::

In this guide, you'll learn how to use Pactflow and [SwaggerHub](https://swaggerhub.com/) together, to add contract testing to your design first API development workflow.

## Benefits

Pactflow and SwaggerHub can be combined to increase the quality of your design-first API development workflow, and help navigate the complexity of microservice rollouts.

SwaggerHub is foundation of a repeatable process for API Development, providing a secure collaborative environment for your API design process:

1. It unifies teams around a single source of truth - **the OAS** - and enables standardisation across your services
1. Allows teams to work **independently**
2. **Unlocks automation** such as code-generation and mock services

Pactflow brings increased visibility into how consumers use your API, enabling:

1. API consumer and API producer development teams to work in independently and **safely**
2. **Prevent breaking changes** to your API and releasing an incompatible API consumer
3. A reduction in the need for **API versioning**, avoiding the need to create and maintain multiple versions of an API, and communicating the change to consumers.

Together, they allow faster feedback cycles from design through to development, test and release.

## Pre-requisites

* A [Pactflow](https://pactflow.io) account (create a [free account](https://pactflow.io/pricing/)).
* A [SwaggerHub](https://swaggerhub.com) account (create a [free account](https://try.smartbear.com/)).

## Integration Guide

### 1. Design your first API in SwaggerHub

Follow this [guide](https://support.smartbear.com/swaggerhub/docs/tutorials/getting-started.html) to create your first API in SwaggerHub.

Next steps: now that we have agreed on our design, we can get started on our implementation.

:::note
We can actually begin to work on all of next major sections (3, 4 and 5) in parallel. In this guide, we will work through the steps sequentially however to simplify the explanation.
:::

### 2. Setup your API Mock Environment (Optional)

[SwaggerHub feature reference](https://support.smartbear.com/swaggerhub/docs/integrations/api-auto-mocking.html).

> The API Auto Mocking integration creates and maintains a semi-static mock of your API based on the responses and examples defined in your OpenAPI 3.0 or 2.0 definition. The mock is updated every time you save your API.
> The mock helps you test your API when designing it, that is, before it is implemented by developers. Also, the mock allows developers to start building client applications even before the API back end is ready.

![Design First - Provider Auto Mock workflow](/img/integrations/swaggerhub/design-first-provider-automock.png)

1. Create a new [Auto Mock](https://support.smartbear.com/swaggerhub/docs/integrations/api-auto-mocking.html) virtualisation server (also referred to as "VirtServer").

### 3. Test your Provider (Auto Mock)

For the general Provider test and release workflow, see our [Provider Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/provider).
#### 3.1 Select a Testing Tool

Now that we have an agreed API definition and an implementation (in this case, a Mock of the provider), we can start to build out our test cases whilst the implementation is underway. We will be able to re-use these tests when the real provider is ready for testing.

Start by [choosing](http://localhost:3000/docs/bi-directional-contract-testing/provider#step-2-choose-an-api-testing-tool) an API testing tool. See our [examples](/docs/examples) for an idea of how to do this.

#### 3.2. Publish to Pactflow

[Publish](/docs/bi-directional-contract-testing/contracts/oas#publishing-the-provider-contract--results-to-pactflow) your OAS and the test results from your chosen API testing tool to Pactflow. 

#### 3.3. Check `can-i-deploy` if it's safe to release

Check if it's safe to release to your chosen test or staging environment using the [`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) command.

#### 3.4. Release

You can now deploy your Auto Mock. In this case, because the Auto Mock is a hosted service from SwaggerHub you don't actually need to perform a real deployment. However, we need to tell Pactflow that it has been deployed and will be used as the provider in a nominated environment.

Use the [record-deployment](/docs/bi-directional-contract-testing/deploying) command to record that you have done this with Pactflow.

### 4. Consumer Workflow

![Design First - Consumer workflow](/img/integrations/swaggerhub/design-first-consumer.png)

[Consumer Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/consumer)

#### 4.1 Create our Consumer

We can start the build of our consumer. We have the choice to build from our own framework, or generate an [OAS compliant client SDK](https://support.smartbear.com/swaggerhub/docs/apis/generating-code/client-sdk.html).

We can optionally use the server mocks from step (2).

#### 4.2 Test our Consumer

We can now test our consumer. This is the stage where we will capture the *consumer contract*. You can choose to use Pact, or convert your preferred mocks into a contract file.

See this [guide](http://localhost:3000/docs/bi-directional-contract-testing/consumer) and one of our BDCT [examples](/docs/examples) for an idea of how to do this.

#### 4.3. Publish to Pactflow

[Publish](https://docs.pact.io/getting_started/sharing_pacts) your contsumer contract to Pactflow. We suggest to use the standard [Pact CLI tools](https://docs.pact.io/implementation_guides/cli#distributions) for this step.

#### 4.4. Check `can-i-deploy` if it's safe to release

Check if it's safe to release to your chosen test or staging environment using the [`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) command.

#### 4.5. Release

You can now deploy your consumer to the same environment as your Auto Mock.

Use the [record-deployment](/docs/bi-directional-contract-testing/deploying) command to record that you have done this with Pactflow.

We now have a consumer deployed to a test environment, that uses the Auto Mock. The consumer can't yet be deployed to production, because the provider has not yet been built and released.
### 5. (Real) Provider Workflow

![Design First - Provider workflow](/img/integrations/swaggerhub/design-first-provider.png)

We can now repeat this process, but with the real provider which we can deploy to real environments.

For the general Provider test and release workflow, see our [Provider Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/provider).

#### 5.1 Build the provider

We can start the build of our provider. We have the choice to build from our own framework, or generate [OAS compliant server stubs](https://support.smartbear.com/swaggerhub/docs/apis/generating-code/server-stub.html).

#### 5.2 Run the tests

Using the test framework created in 3.1, we can test our real implementation.

#### 5.3. Publish to Pactflow

[Publish](/docs/bi-directional-contract-testing/contracts/oas#publishing-the-provider-contract--results-to-pactflow) your OAS and the test results from your chosen API testing tool to Pactflow. 

#### 5.4. Check `can-i-deploy` if it's safe to release

Check if it's safe to release to your chosen test or staging environment using the [`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) command.

#### 5.5. Release

You can now deploy your real provider to the nominated test environment. 

Use the [record-deployment](/docs/bi-directional-contract-testing/deploying) command to record that you have done this with Pactflow.

### Next steps

We can repeat steps 3-5 for the various environments and as we iterate on the design and implementation.