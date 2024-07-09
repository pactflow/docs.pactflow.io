---
title: Bi-Directional Contract Testing
---

This section describes the Bi-directional Contract Testing screens in PactFlow. Bi-Directional Contract Testing is a type of **static contract testing** where two contracts - one representing consumer expectations, and another representing provider capability - are compared to ensure they are compatible. Refer to the [docs](/docs/bi-directional-contract-testing) for more information on this feature.

## Overview tab

When you open the overview page, if the selected integration uses the bi-directional contract testing feature, a "view contracts" button will appear that takes you to the detailed view.

&nbsp;

![Bi-directional Contract Test Overview Screen](/ui/bdct-overview.png)

&nbsp;

<div class="status-table">

| Status | Description | Action Required |
|-------------|-------------|-|
| ![success](/ui/success.png) | The consumer contract is compatible with the provider's contract.| N/A |
| ![failed](/ui/failed.png) | The consumer contract is incompatible with the provider's contract, the provider self-verification is unsuccessful, or a classic pact test has failed. | Review the [detail page](#detail-page) to understand the failure cause. |
| ![unverified](/ui/unverified.png) | No schema comparison has been found for the consumer contract. | Either a consumer contract has yet to be published, or PactFlow has not verified yet. Wait a few minutes and try again (PactFlow generates results in the background), or run a [`Can I Deploy`](/docs/ui-old/can-i-deploy) query for the application in question to force PactFlow to generate a result. |

</div>

:::info scope of this screen
Currently this page supports showing one verification per consumer version. Whichever provider version was most recently published will be the verification displayed.

Each verification is still generated behind the scenes though, and will work as expected when using `can-i-deploy` in your build pipeline or via CLI.
:::

## Detail Page

The detail page displays a comprehensive breakdown of the comparison results between a provider contract and its consumer contract (pact), along with metadata, pacticipant information and provider self-verification results.

&nbsp;

![Bi-directional Contract Test Detail Screen](/ui/bdct-cross-comparison.png)

&nbsp;

### Contract Comparison Tab

This tab shows any errors and warnings grouped by the affected resource in the OpenAPI document. The grouping is in the form `{verb} {path}`, for example, `get /products/{id}`. This is a helpful view if you are more familiar with the OpenAPI Document.

There may be more than one interaction in the consumer contract that is incompatible with a given route.

When provider and consumer contracts are incompatible, warnings, error messages and any mismatches (for Pact verifications) are listed here. You can also find incompatibility messages under interaction items on the [Consumer Contract Tab](#consumer-contract-tab), grouped by the interactions defined in the consumer contract. This is a more helpful view for consumer teams diagnosing problems.

![Bi-directional Contract Test Error](/ui/bdct-cross-comparison-error.png)

For interpreting the errors and warnings displayed on these screens, refer to the [compatibility checks](/docs/bi-directional-contract-testing/compatibility-checks) guide.

### Consumer Contract Tab

Displays the verification result of comparing the consumer contract against the provider contract, from the perspective of the consumer contract.

Clicking the interaction item toggles the interaction detail in relation to the current Bi-Directional Contract Testing.

:::note
When you perform a classic pact test with Bi-Directional Contract Testing, the classic pact test result displays here.
:::

![Bi-directional Contract Test Error](/ui/bdct-cross-comparison-error-consumer-tab.png)

For interpreting the Bi-Directional Contract Testing related errors and warnings displayed on these screens, refer to the [compatibility checks](/docs/bi-directional-contract-testing/compatibility-checks) guide.

### Provider Contract Tab

Displays the verification result of comparing the consumer contract against the provider contract, from the perspective of the provider contract.

![Bi-directional Contract Test Error](/ui/bdct-cross-comparison-error-provider-tab.png)




## Matrix View Tab

When a pact is published, a comparison will be generated asychronously with the latest provider contract from each branch, and for the provider contract of each deployed/released provider version. These results will be used to populate the data for the matrix page.

Should a [`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) query be made for a combination of application versions for which a comparsion has not been generated, the comparsion will be performed synchronously, and the results returned in the response.

