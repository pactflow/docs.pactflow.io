---
title: Bi-Directional Contract Tests
---

A bi-directional contract test is a test that compares your provider contract (eg. an OpenAPI/Swagger document) and your consumer contract (pact).

This section contains information about the bi-directional contract test UI on Pactflow.

## Overview tab

Bi-directional contract test results are listed one the overview tab.

&nbsp;

![Bi-directional Contract Test Overview Screen](/ui/bdct-overview.png)

&nbsp;

<div class="status-table">

| Status | Description |
|-------------|-------------|
| ![success](/ui/success.png) | The consumer contract is compatible with provider's contract.|
| ![failed](/ui/failed.png) | The consumer contract is incompatible with provider's contract, or provider self verification is unsuccessful, or a classic pact test is failed along with a bi-directional contract test|
| ![unverified](/ui/unverified.png) | No schema comparison has been found for the consumer contract. |

</div>

## Bi-directional Contract Test Detail Page

Bi-directional contract test detail page holds detailed schema comparison results between a provider contract versus a consumer contract (pact) along with metadata, participant information and provider self-verification results.

&nbsp;

![Bi-directional Contract Test Detail Screen](/ui/bdct-cross-comparison.png)

&nbsp;

### Contract Comparison Tab
An overview of the bi-directional contract test.

### Consumer Contract Tab
Show verification result of the consumer contract by the provider contract.

Clicking on interaction item toggles interaction detail in relation of the current bi-directional contract test.

Note: When a classic pact test is performed along with bi-directional contract test, the classic pact test result will be displayed under this tab.

### Provider Contract Tab
Show provider contract detail and provider self verification result. Currently, only OpenAPI/Swagger is supported. 

