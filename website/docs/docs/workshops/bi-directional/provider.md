---
title: Bi-directional Contracts - Provider Testing Guide
sidebar_label: Provider
---

## Principles

1. It is important you use a _mock_ and not a _stub_. The crucial difference is that a mock validates behaviour, a stub does not. We need to ensure that your consumer code actually calls the mock, otherwise we will serialise a contract with invalid expectations.
1.

## Writing Provider Contracts

### Pre-requisities

TBC

* OAS v2
* OAS v3


### Step 1: Authoring or generating your OpenAPI  Specification

TBC

### Step 2: Choose an API testing tool

TBC

### Step 3: Testing your API

TBC

### Step 4: Publish your contract and verification results

TBC

### Step 5: Run can-i-deploy

TBC

### Step 6: Deploy your application

TBC


## Integrating it into your CI/CD pipeline

TBC


## Other

### Other examples of how to do this form of testing

* https://hazelcast.com/blog/contract-first-development-using-restassured-and-openapi/
* https://www.openapi4j.org/operation-validator-adapters/spring.html
* https://springframework.guru/should-i-use-spring-rest-docs-or-openapi/
* https://github.com/OpenAPITools/openapi-generator (generate rest assured tests from spec)