---
id: bi-directional-contract-testing
title: Bi-Directional Contract Testing Workshop
sidebar_label: Overview
---

_Level: Intermediate_

Learn how to implement a Bi-Directional Contract Testing workflow from end-to-end, including integration with your CI/CD system.

## Workshop Prerequisites

You must have:

- a Pactflow account (https://pactflow.io)
- obtained a [read/write API Token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token) from your Pactflow account
- a basic understanding of APIs, unit testing and how to operate a linux terminal

### Goals

You will learn how:

1. To use OpenAPI as part of a contract testing strategy
1. API testing tools such as Dredd or Postman can be used with Pactflow
1. To publish contracts (such as a pact file or an OpenAPI document) to Pactflow
1. To prevent deploying breaking changes to an environment, such as production
1. To use existing mocking tools (such as Mountebank or Wiremock) to create a consumer contract

### Ways of completing the workshop

1. See our online katacoda [tutorials](/docs/tutorials). The specific bi-directional course that covers the below agenda can be found [here](/docs/tutorials#bi-directional-contract-testing)
   - _NOTE: To complete the workshop, you will need to authenticate to Katacoda (the online learning platform) with GitHub, Google, Twitter or LinkedIn._
2. You can pick and choose an bi-directional consumer/provider example from our exhaustive [list](/docs/examples), and you will start by forking the repositories into your own Github account, setting up Github Actions as CI builds, and configuring the projects to point to your own Pactflow account. Don't worry, we will take you step by step in the workshop.

### Agenda

You will:

1. Create and document an API using [OpenAPI Specification](https://www.openapis.org/)
2. Write tests for the API using an API testing tool such as [RestAssured](/docs/examples/bi-directional/provider/restassured/),[Dredd](/docs/examples/bi-directional/provider/dredd/),[Postman](/docs/examples/bi-directional/provider/postman/) and [Schemathesis/Swashbuckle](/docs/examples/bi-directional/provider/dotnet/)
3. Publish the _provider contract_ (an OpenAPI document) to Pactflow
4. Deploy the provider to production
5. Write the API consumer
6. Write tests for an API client using tools such as [Mountebank](/docs/examples/bi-directional/consumer/mountebank/),[Nock](/docs/examples/bi-directional/consumer/recordreplay/),[Wiremock](/docs/examples/bi-directional/consumer/wiremock/),[Nock](/docs/examples/bi-directional/consumer/recordreplay/),[Cypress](/docs/examples/bi-directional/consumer/cypress/) and [Mock-Service-Worker](/docs/examples/bi-directional/consumer/msw/) or traditional Pact [.NET](/docs/examples/bi-directional/consumer/dotnet/) to mock the API, and convert those mocks into a _consumer contract_
7. Publish the consumer contract to Pactflow
8. Deploy the consumer to production
9. Learn about Pactflow's breaking change detection system

### Tools used

-  Node / Java or .NET - for the applications being tested
- [OpenAPI](https://swagger.io/specification/) - for API Documentation
- [Mountebank](https://mbtest.org) - for API mocking
- [Wiremock](https://wiremock.org/) - for API mocking
- [Nock](https://github.com/nock/nock) - for API mocking
- [Cypress](https://www.cypress.io/) - for API mocking
- [Mock-Service-Worker](https://mswjs.io/) - for API mocking
- [Dredd](https://dredd.org/en/latest/index.html) - for API Testing
- [Postman](https://www.postman.com/) - for API Testing
- [RestAssured](https://rest-assured.io/) - for API Testing
- [Swashbuckle](https://www.nuget.org/packages/Swashbuckle.AspNetCore.Swagger/) - for API Testing
- [Schemathesis](https://schemathesis.readthedocs.io/en/stable/) - for API Testing
- [Github Actions](https://docs.github.com/en/actions) - for CI/CD pipeline