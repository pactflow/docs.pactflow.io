---
title: Bi-Directional Contract Testing
---

A Bi-Directional Contract Testing is a test that compares your provider contract (eg. an OpenAPI/Swagger document) and your consumer contract (pact).

This section contains information about the Bi-Directional Contract Testing UI on Pactflow.

## Overview tab

Bi-Directional Contract Testing results are listed one the overview tab.

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

## Bi-Directional Contract Testing Detail Page

Bi-Directional Contract Testing detail page holds detailed schema comparison results between a provider contract versus a consumer contract (pact) along with metadata, participant information and provider self-verification results.

&nbsp;

![Bi-directional Contract Test Detail Screen](/ui/bdct-cross-comparison.png)

&nbsp;

### Contract Comparison Tab
An overview of the Bi-Directional Contract Testing.

### Consumer Contract Tab
Show verification result of the consumer contract by the provider contract.

Clicking on interaction item toggles interaction detail in relation of the current Bi-Directional Contract Testing.

Note: When a classic pact test is performed along with Bi-Directional Contract Testing, the classic pact test result will be displayed under this tab.

### Provider Contract Tab
Show provider contract detail and provider self verification result. Currently, only OpenAPI/Swagger is supported. 


## Contract Incompatibility Messages
When provider and consumer contracts are incompatible, incompatibility messages and mismatches are listed at [Contract Comparison Tab](#contract-comparison-tab). You can also find incompatibility messages under interaction items at [Consumer Contract Tab](#consumer-contract-tab)

| Error Messsage | Description |
| ---------- | ----------- |
| Request accept header is incompatible | Pact request's accept header content is incompatible with provider contract |
| Request misses authorization header | Pact request's authorization header is missing |
| Request body is incompatible | Pact request's body content is incompatible with provider contract |
| Request content type header is incompatible | Pact request's content type header is incompatible with provider contract |
| Request header is incompatible | Pact request's header content is incompatible with provider contract|
| Request contains unknown path or method | Pact contains unknown request's path or method compared with provider contract |
| Request query is incompatible | Pact request query content is incompatible with provider contract |
| Response body is incompatible | Pact response's body content is incompatible with provider contract |
| Response body contains unknown information | Pact response's body contains unknown content compared with provider contract|
| Response request is incompatible | Pact response's request content is incompatible with provider contract|
| Reponse header contains unknown information | Pact response's header contains unknown content compared with provider contract |

:::info we are working hard to improve this view even further.
Currently this page supports showing one verification per consumer version, whichever provider version was most recently published will be the verification displayed.

Each verification is still generated behind the scenes though, and will work as expected when using 'can-i-deploy' in your build pipeline or via CLI.

We are still working to improve aspects of the Bi-Directional contract UI, including the 'Matrix' view, which will offer a more complete display of each verification that is available.

You can check our [roadmap](https://github.com/pactflow/roadmap/projects/1) for progress, or to vote for new items
:::