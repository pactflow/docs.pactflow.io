---
title: Bi-Directional Contract (Preview)
---

A bi-directional contract is a test result by comparing between your provider contract (eg. OpenAPI Swagger document) and your consumer contract (pact).

This section contains information of bi-directional UI on Pactflow.

## Dashboard

Bi-directional results are listed at dashboard. 

A test result for bi-directional contract is known as `Contract Comparison`; wheareas a classic pact test result is a `Contract Replay`


&nbsp;

![Bi-directional Contract Overview Screen](/ui/bdc-dashboard.png)

&nbsp;

<div class="status-table">

| Status | Description |
|-------------|-------------|
| ![success](/ui/success.png) | The consumer contract is compatible with provider's contract.|
| ![failed](/ui/failed.png) | The consumer contract is imcompatible with provider's contract.|
| ![unverified](/ui/unverified.png) | No scheme comparison has been found for the consumer contract. |

</div>

## Contract detail

Bi-directional contract detail page holds detailed comparison result between a provider contract vs a consumer contract (pact), along with metadata and participant information.

&nbsp;

![Bi-directional Contract Detail Screen](/ui/bdc-detail.png)

&nbsp;

### Contract Comparison Tab
An overview of the bi-directional contract test.

### Consumer Contract Tab
Show verification result of the consumer contract by the provider's contract.

Clicking on interaction item toggles interaction detail in relation of the current bi-directional contract test.

### Provider Self Verification Tab
Show verification result of the provider contract by provider itself.

### Provider Contract Tab
Show provider contract detail, currently only support OpenAPI Swagger.



