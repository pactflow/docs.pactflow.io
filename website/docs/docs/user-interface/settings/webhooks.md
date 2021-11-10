---
title: Webhooks
---

Here you will be able to create and edit your webhooks.

| Field | Description |
| ----- | ----------- |
| Team |  When creating or editing a webhook, users with the `webhook:manage:team` permission (by default, assigned to the `Test Maintainer` role) must assign a webhook to a team. Users with the `webhook:manage:*` permission (by default, assigned to the `Administrator` role) may choose not to assign a webhook to any team. Team selection affects which secrets are available for use in the webhook. See the [Secrets](#secrets) section below. |
| Description | A description of your webhook |
| Consumer | You can select a specific consumer for the webhook, or `ALL` for all consumers.  |
| Provider | You can select a specific provider for the webhook, or `ALL` for all providers. |
| Events | Select the events for which you want the webhook to fire (Mandatory to select one). |
| Method | All webhook requests will be of type HTTP Post. |
| URL | The URL to send the webhook request to (Mandatory). You can use dynamic variables in this field. |
| Headers | Headers as `KEY: VALUE` pairs to set on the request. |
| Body | The body of the request. You can use dynamic variables in the body. |
| Basic auth username | The username to use if your webhook requires Basic HTTP authentication |
| Basic auth password | The password to use if your webhook requires Basic HTTP authentication |
| Enabled | Uncheck this if you wish to disable the webhook |

#### Webhook event types

##### Contract published with changed content or tags

If your pact is published _without_ any tags applied to the consumer version, then this event will be fired if the pact content is different from the previous version.

If your pact is published _with_ tags applied to the consumer version, then you can think of all the pacts that share the same tag name as forming a time ordered "pseudo branch". This event will fire if the new pact for any of the "pseudo branches" is different from the previous version. One of the implications of this is that if a pact is published with the same content as a previous version, but with a new tag, this event will fire as it is considered to be the first version of a new pseudo branch.

If you want a provider build to be triggered by pact changes, then select this event for your webhook.

##### Contract published

This event fires every time a pact is published.

##### Provider verification published

This event fires every time a provider verification is published.

#### Dynamic Variables

##### Secrets

User defined secrets that have the same team assigned as the webhook may be used in the path of the URL, the headers, body, username and password, and will be replaced with their appropriate values at runtime. For webhooks that have no team assigned, only secrets that also have no team assigned may be used. The list of secrets that are available for use in a particular webhook are shown in the `Dynamic variables` section (click on the heading to display the values).

To use a secret in a webhook, use the expression `${user.<SECRET_NAME>}` eg. ``${user.ciToken}``. 

##### Pactflow

The following variables may be used in the path and query parameters of the URL, the headers, body, username and password, and will be replaced with their appropriate values at runtime.

| Expression | Description |
| ---------- | ----------- |
| `${pactbroker.consumerName}` | The consumer name |
| `${pactbroker.providerName}` | The provider name |
| `${pactbroker.consumerVersionNumber}` | The version number of the most recent consumer version associated with the pact content. |
| `${pactbroker.providerVersionNumber}` | The provider version number for the verification result |
| `${pactbroker.providerVersionTags}` | The list of tag names for the provider version associated with the verification result, separated by ", ". |
| `${pactbroker.providerVersionBranch}` | The repository branch associated with the provider version |
| `${pactbroker.consumerVersionTags}` | The list of tag names for the most recent consumer version associated with the pact content, separated by ", " |
| `${pactbroker.consumerVersionBranch}` | The repository branch associated with the consumer version |
| `${pactbroker.pactUrl}` | The "permalink" URL to the newly published pact (the URL specifying the consumer version URL, rather than the "/latest" format. |
| `${pactbroker.verificationResultUrl}` | The URL to the relevant verification result. |
| `${pactbroker.githubVerificationStatus}` | The verification status using the correct keywords for posting to the Github commit status API. See https://developer.github.com/v3/repos/statuses. |
| `${pactbroker.bitbucketVerificationStatus}` | The verification status using the correct keywords for posting to the Bitbucket commit status API. See https://developer.atlassian.com/server/bitbucket/how-tos/updating-build-status-for-commits/. |
| `${pactbroker.azureDevOpsVerificationStatus}` | The verification status using the correct keywords for posting to the Azure DevOps GitStatusState API. See https://docs.microsoft.com/en-us/rest/api/azure/devops/git/statuses/create?view=azure-devops-rest-6.0 |
| `${pactbroker.consumerLabels}` | The list of labels for the consumer associated with the pact content, separated by ", ". |
| `${pactbroker.providerLabels}` | The list of labels for the provider associated with the pact content, separated by ", ". |
| `${pactbroker.providerVersionDescriptions}`| The descriptions of the provider version(s) for which the contract_requiring_verification_published webhook has been triggered. Only populated for the contract_requiring_verification_published event. |
| `${pactbroker.eventName}` | The name of the event that triggered the webhook |
