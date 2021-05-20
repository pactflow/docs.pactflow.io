---
title: Pactflow Code Demos
sidebar_label: Overview
---

## Introduction

We have created a number of example projects and demo material that you can use as references for your rolling out your contract-testing initiatives.

## Resources

Here are some useful resources when it comes to engaging your teams to help with Pact or contract-testing related initiatives:

| Resource | Description | Download |
| ---- | ----------- | -------- | -------- |
| Demo Pack | A general demo pack for introducing Pact & the concepts of contract testing | <a href="/resources/pactflow-demo-pack_2020.pdf" target="_blank">pdf</a> \| <a href="/resources/pactflow-demo-pack_2020.pptx" target="_blank">pptx</a> |


## Scenarios

### Product Catalog System (HTTP/Messages)

Our standard example is a product catalog website (see React above) which consumes a basic Products API implementing the following HTTP interface. All demo languages implement this interface so that we can easily mix and match technologies.

| Endpoint | Example Response |
| -------- | ---------------- |
| `GET /products` | `[{"id":"09","type":"CREDIT_CARD","name":"Gem Visa","version":"v1"},{"id":"10","type":"CREDIT_CARD","name":"28 Degrees","version":"v1"},{"id":"11","type":"PERSONAL_LOAN","name":"MyFlexiPay","version":"v2"}]`
| `GET /product/1` | `{"id":"09","type":"CREDIT_CARD","name":"Gem Visa","version":"v1"}`

:::info
The single get product endpoint is not a spelling mistake, and is used to show evolution to more standard resource based design
:::

## Demos

### Consumers

| Language | Use Case | Framework/Tech | Description |
| --------- | ------- | ----------- | -------------- |
| JS/NodeJS | Web | [React](/docs/examples/js/consumer/readme) | React JS website relying on a Products API |
| JS/NodeJS | Web | [Cypress](/docs/examples/cypress/readme) | Example demonstrating how Cypress could be used to generate consumer pacts |
| JS/NodeJS | AWS/SNS/Messages | [SNS Lambda](/docs/examples/aws/sns/consumer/readme) | AWS Lambda SNS Consumer |
| Java | Messages | [Kafka](/docs/examples/kafka/java/consumer) | Java Kafka consumer |
| NodeJS | Messages | [Kafka](/docs/examples/kafka/js/consumer) | NodeJS Kafka consumer |
| Java | SOAP | [Java](/docs/examples/soap/java/consumer) | Java SOAP API consumer (_note: only compatible with the SOAP provider_) |
| .NET | API | [.NET](/docs/examples/dotnet/consumer/readme) | .NET Products API consumer |
| Golang | API | [Golang](/docs/examples/golang/consumer/readme) | Go API Client |
| JS | OpenAPI | [Pact / Record Replay with Nock](/docs/examples/bi-directional/consumer/recordreplay/readme) | React JS website |
| Java | OpenAPI | [Wiremock](/docs/examples/bi-directional/consumer/wiremock/readme) | Java API client |

### Providers

| Language | Use Case | Framework/Tech | Description |
| --------- | ------- | ----------- | -------------- |
| JS/NodeJS | API | [Express JS](/docs/examples/js/provider/readme) | ExpressJS API provider |
| JS/NodeJS | AWS/SNS/Messages | [ExpressJS / AWS SNS](/docs/examples/aws/sns/provider/readme) | AWS Lambda SNS Provider |
| Java | API | [Spring Boot](/docs/examples/java/provider-springboot/readme) | Java Spring Boot API provider |
| Java | Messages | [Kafka](/docs/examples/kafka/java/provider) | Java Kafka message provider |
| Java | SOAP | [Java](/docs/examples/soap/java/provider)  | Java SOAP API provider (_note: only compatible with the SOAP consumer_) |
| .NET | API | [.NET](/docs/examples/dotnet/provider/readme) | .NET API provider |
| Golang | API | [Golang](/docs/examples/golang/provider/readme) | Gin API Provider |
| JS | OpenAPI Spec | [ExpressJS / Dredd](/docs/examples/bi-directional/provider/dredd/readme) | ExpressJS API Provider tested with Dredd+OAS |
| JS | OpenAPI Spec | [Postman + ExpressJS](/docs/examples/bi-directional/provider/postman/readme) | Spring Boot API Provider tested with Postman+OAS |
| Java | OpenAPI Spec | [RestAssured + SpringBoot](/docs/examples/bi-directional/provider/restassured/readme) | SpringBoot API Provider tested with Dredd+OAS |