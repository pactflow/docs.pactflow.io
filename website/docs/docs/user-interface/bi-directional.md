---
title: Bi-Directional Contract Testing
---

This section describes the Bi-directional Contract Testing screens in PactFlow. Bi-Directional Contract Testing is a type of **static contract testing** where two contracts - one representing consumer expectations, and another representing provider capability - are compared to ensure they are compatible. Refer to the [docs](/docs/bi-directional-contract-testing) for more information on this feature.

The contract details page displays a comprehensive breakdown of the comparison results between a provider contract and its consumer contract (pact), along with metadata, pacticipant information and provider self-verification results.

![Bi-directional Contract Test Overview Screen](/ui/clarity/bdct-cross-contract-verification-green.png)

### Statuses

The following table describes the statuses displayed on this page:

<div class="status-table">

| Status | Description | Action Required |
|-------------|-------------|-|
| ✅ | The consumer contract is compatible with the provider's contract.| N/A |
| ❗️ | The consumer contract is incompatible with the provider's contract, the provider self-verification is unsuccessful, or a classic pact test has failed. | Review the [error details](#consumer-contract-tab) to understand the failure cause. |
| ⚠️ | No schema comparison has been found for the consumer contract. | Either a consumer contract has yet to be published, or PactFlow has not verified yet. Wait a few minutes and try again (PactFlow generates results in the background), or run a `can-i-deploy` query for the application in question to force PactFlow to generate a result. |

</div>

:::info scope of this screen
Currently this page supports showing one verification per consumer version. Whichever provider version was most recently published will be the verification displayed.

Each verification is still generated behind the scenes though, and will work as expected when using `can-i-deploy` in your build pipeline or via CLI.
:::


### Compatibility Tab

This tab shows any errors and warnings grouped by the affected resource in the OpenAPI document. The grouping is in the form `{verb} {path}`, for example, `get /products/{id}`. This is a helpful view if you are more familiar with the OpenAPI Document.

There may be more than one interaction in the consumer contract that is incompatible with a given route.

When provider and consumer contracts are incompatible, warnings, error messages and any mismatches (for Pact verifications) are listed here. You can also find incompatibility messages under interaction items on the [Consumer Contract Tab](#consumer-contract-tab), grouped by the interactions defined in the consumer contract. This is a more helpful view for consumer teams diagnosing problems.

![Bi-directional Contract Test Detail Screen](/ui/clarity/bdct-cross-contract-verification-red.png)

For interpreting the errors and warnings displayed on these screens, refer to the [compatibility checks](/docs/bi-directional-contract-testing/compatibility-checks) guide.

### Consumer Contract Tab

Displays the verification result of comparing the consumer contract against the provider contract, from the perspective of the consumer contract.

Clicking the interaction item toggles the interaction detail in relation to the current Bi-Directional Contract Testing.

:::note
When you perform a classic pact test with Bi-Directional Contract Testing, the classic pact test result displays here.
:::

![Bi-directional Contract Test Error](/ui/clarity/bdct-consumer-contract.png)

For interpreting the Bi-Directional Contract Testing related errors and warnings displayed on these screens, refer to the [compatibility checks](/docs/bi-directional-contract-testing/compatibility-checks) guide.

### Provider Contract Tab

This section displays the provider contract, self-verification result and the overall result of comparing the consumer contract against the provider contract, from the perspective of the provider.

![Bi-directional Contract Test - Provider Contract](/ui/clarity/bdct-provider-contract.png)

Provider contracts have two components - the OpenAPI document and the tests that check the API is compatible with the OpenAPI document (the self-verification result).

The status shown in this view indicates whether the OpenAPI document is compatible with the consumer *and* the self-verification results are successful.

