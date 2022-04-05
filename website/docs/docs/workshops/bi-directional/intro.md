In the scenario, you will learn the basics of bi-directional contract testing with Pactflow.

The course is written in NodeJS, however, extensive experience with the language will not be required for the workshop.

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

## Agenda

You will:

1. Create and document an API using [OpenAPI Specification](https://www.openapis.org/)
1. Write tests for the API using the Dredd API testing tool
1. Publish the _provider contract_ (an OpenAPI document) to Pactflow
1. Deploy the provider to production
1. Write the API consumer
1. Write tests for an API client using Mountebank to mock the API, and convert those mocks into a _consumer contract_
1. Publish the consumer contract to Pactflow
1. Deploy the consumer to production
1. Learn about Pactflow's breaking change detection system

### Tools used

- Node - for the applications being tested
- [Mountebank](https://mbtest.org) - for API mocking
- [Dredd](https://dredd.org/en/latest/index.html) - for API Testing
- Github Actions - for CI/CD pipeline