---
id: swaggerhub
title: SwaggerHub Integration
---

:::note Pre-requisites
To use this feature, you will need:

* A [Pactflow](https://pactflow.io) account (create a [free account](https://pactflow.io/pricing/)).
* A [SwaggerHub](https://swaggerhub.com) Team or Enterprise account (create a [free account](https://try.smartbear.com/) and try out the feature for 14 days).
:::

For more information on the integration and setup instructions, visit the [SwaggerHub documentation](https://support.smartbear.com/swaggerhub/docs/apis/pactflow-contract-testing.html).

## Introduction

SwaggerHub supports integration with Pactflow, enabling API designers to avoid releasing breaking changes by using PactFlow to get visibility into their APIs and how they are consumed, all from within the SwaggerHub Editor.

![Subscriptions Screen](/img/integrations/swaggerhub/launch-promo-798x426.gif)

## Setting up the integration

The SwaggerHub integration is scoped to an individual API in SwaggerHub. You will need to configure the integration for each API that you would like to check with Pactflow.

To setup the integration and run compatibility checks you will need the following:

* An read-write [API Token](/docs/user-interface/settings/api-tokens) associated with a User or System Account that has been assigned the [SwaggerHub role](/docs/permissions/predefined-roles#swaggerhub) or equivalent permissions.
* A provider contract [published](/docs/bi-directional-contract-testing/contracts/oas#publishing-the-provider-contract--results-to-pactflow) to Pactflow 

To prevent breaking changes to your consumers, you will of course need one or more consumer contracts [published](/docs/bi-directional-contract-testing/publishing) to Pactflow also, however this is not strictly required to setup the integration.

To setup the integration, navigate to your API in SwaggerHub and click the "Pactflow" button. This will take you to the setup screen if you haven't already configured your account.

:::note
If the button does not appear, it means you are not on an eligible plan.
:::

After entering your Pactflow Base URL and Token, you can select the pacticipant (provider application) that maps to the API in SwaggerHub.

![Configuration screen](/img/integrations/swaggerhub-setup1.png)

For the full setup instructions, visit the [SwaggerHub documentation](https://support.smartbear.com/swaggerhub/docs/apis/pactflow-contract-testing.html).

## Checking Compatibility

### Running the compatibility check

The compatibility check can be invoked by pressing the "Pactflow" button, and choosing "Check Compatibility". 

![Compatibility check screen](/img/integrations/swaggerhub-check.png)

If the check has been run previously and the current API has not been modified, the result from the last check will be shown. 

:::note
Unlike the `can-i-deploy` command in the bi-directional contract testing flow, this check _does not_ ensure that the provider self-verification results have been provided in order to get a passing status check. That is, it simply checks if the selected consumer contracts are compatible with the given provider contract.

If you need this behaviour, the `can-i-deploy` check will ensure that the provider has confirmed it adheres to its provider contract.
:::

### Compatible result

If there are no incompatibilities, you will see the following screen:

![Configuration screen](/img/integrations/swaggerhub-compatible1.png)

To see which consumers you are compatible with, choose "View Compatibility Check Result":

![Configuration screen](/img/integrations/swaggerhub-compatible2.png)

### Incompatible result

If one or more consumers are incompatible with the changes, you will see the following screen:

![Configuration screen](/img/integrations/swaggerhub-incompatible1.png)

Click "View Compatibility Check Result" to expand the error information in order to diagnose and remediate any issues.

![Configuration screen](/img/integrations/swaggerhub-incompatible2.png)

### Contracts covered by the check

Consumer contracts must be using the [branches](https://docs.pact.io/pact_broker/branches) and [releases](https://docs.pact.io/pact_broker/recording_deployments_and_releases) feature - it is not compatible with the use of [tags](https://docs.pact.io/pact_broker/tags). 

The compatibility check uses the following selection criteria:

* The latest version for each consumer's main branch
* Any consumer version that is deployed or released to an environment

In selector terminology, this would be:

* `{ "mainBranch": true }`
* `{ "deployedOrReleased": true }`

This means each application (pacticipant) should explicitly set their main branch (e.g. `main`, `developer` or `master`) and publish contracts for that branch, as well as using the [`record-deployment`](https://docs.pact.io/pact_broker/recording_deployments_and_releases#recording-deployments) command.

See the documentation on [selectors](https://docs.pact.io/pact_broker/advanced_topics/consumer_version_selectors) for additional information on how these work.

### Interpreting failures

The following is a sample error response from the check. 

* Line `4` tells you the extent of the compatibility failures
* Lines `6` and `21` are sub-headings for sub-sections that show the errors for a given selector
* Within these sub-sections, the errors are then organised by Route, and then consumer.
  * In this example you can see the Route for `GET /product/{id}` is incompatible with the version of the `product-catalog-ui` consumer that is in development (line `11`) and the version that has been deployed to Production (Line `26`)
  * The error details include a message, the location in the API that the error relates to (if known), the location in the consumer contract, and the example value in the consumer contract.

The hierachy of the document is thus:
  * Selector scope (e.g. applications currently in development, or applications deployed to a particular environment)
  * Resource impacted, in the form `OPERATION path` (e.g. `GET /product/{id}`)
  * Consumer impacted (e.g. `product-catalog-ui`)
  * Error

```md showLineNumbers
Compatibility Check
-------------------

This API is incompatible with some consumer contracts

Consumer applications currently in development
==============================================

### Incompatible routes

1. GET /product/{id}

* Incompatible with product-catalog-ui

Error message: Response body is incompatible with the response body schema in the spec file: should NOT have additional properties - id
API location: [root].paths./product/{id}.get.responses.200.content.application/json.schema.additionalProperties
Consumer contract value: {"id":"10","type":"CREDIT_CARD","name":"28 Degrees"}
Consumer contract location: [root].interactions[0].response.body


Consumer applications in Production Environment
===============================================

### Incompatible routes

1. GET /product/{id}

* Incompatible with product-catalog-ui

Error message: Response body is incompatible with the response body schema in the spec file: should NOT have additional properties - id
API location: [root].paths./product/{id}.get.responses.200.content.application/json.schema.additionalProperties
Consumer contract value: {"id":"10","type":"CREDIT_CARD","name":"28 Degrees"}
Consumer contract location: [root].interactions[0].response.body
```

See [compatibility checks](/docs/bi-directional-contract-testing/compatibility-checks) in the Bi-Directional Contract Testing section for more on these errors.


## Integrating SwaggerHub into your CI/CD pipelines

The SwaggerHub integration supports integration in the SwaggerHub Editor. To setup automation into your CI/CD workflows, follow [this guide](/docs/bi-directional-contract-testing/tools/swaggerhub).

## Troubleshooting

### 401 error when invoking the integration

```
{"code":400,"message":"Failed execute PactFlow check. Failed with error code: 401"}
```

The user associated with the API token has been disabled or the token has expired. 


### 403 error when invoking the integration

You receive the following error when running the compatibility check:

```
{"code":400,"message":"Failed execute PactFlow check. Failed with error code: 403"}
```

Your API token is read-only or is missing the relevant permissions (see #setting-up-the-integration)
