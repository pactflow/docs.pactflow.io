---
title: Contract Details
---

This section describes the contract details page in PactFlow. The contract details page displays a comprehensive breakdown of the contract (pact) and verification results between a specific consumer and provider version, along with metadata and pacticipant information.

![Contract Page](/ui/clarity/contract.png)

### Statuses

The following table describes the statuses displayed on this page:

<div class="status-table">

| Status                            | Description                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| ✅ | The pact has a successful verification published for it.                                      |
| ❗️ | The latest verification for the pact had failed.                                              |
| ⚠️ | No verification result has been published for the pact.                                       |

</div>

You can see the interactions based on their status using the filter controls:

<img width="400" src="/ui/clarity/contract-filter.png" description="Status Filter" />

### Test Details

#### Scenarios

Each test scenario is broken down into:

1. The name of the scenario.
2. Zero or more provider states, where each provider state may have associated JSON parameters.
3. The type of interaction (one of `Synchronous/HTTP`, `Synchronous/Messages` or `Asynchronous/Messages`).
4. The request and/or response(s) portion of the test.

Each test may have zero or more errors associated with them.

#### HTTP Requests

For HTTP interactions, the requests and responses are shown in the [HTTP Message](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http_requests) format, as you would expect to see from a [cURL](https://curl.se/) command.

![Contract Details - HTTP Interaction](/ui/clarity/contract-details-http.png)

Matching rules are hidden by default. Click the toggle to reveal the matching rule information.

#### Asynchronous Messages

Asynchronous messages are unidirectional, and only have a "request" element:

![Contract Details - Async Interaction](/ui/clarity/contract-details-async.png)

Matching rules are hidden by default. Click the toggle to reveal the matching rule information.

#### Synchronous Interactions
Synchronous messages are bidirectional, and have a "request" element and one or more "response" elements:

![Contract Details - Sync Interaction](/ui/clarity/contract-details-sync.png)

Matching rules are hidden by default. Click the toggle to reveal the matching rule information.

#### Plugin Interactions

Plugin interactions may be associated with HTTP, Asynchronous or Synchronous Messages. The layout of the tests will depend on which interaction type is being used. 

Additional information about the plugin will be displayed, including:

1. Plugin markup - the plugin defined representation of the contract
2. Plugin configuration - additional JSON configuration used by the plugin

![Contract Details - Sync Interaction](/ui/clarity/contract-details-grpc.png)

Matching rules are hidden by default. Click the toggle to reveal the matching rule information.

#### Binary Content

Binary content will be displayed as hexdump. ASCII characters will attempt to be displayed in the right-hand column:

```
 00000000: 0001 0305 1f0a 0962 6364 6566 6768 696a  .......bcdefghij
 00000010: 6b6c 6d6e 6f70 7172 7374 7576 7778 797a  klmnopqrstuvwxyz
 00000020: 3031 3233 3435 3637 3839                 0123456789
```

### Application Information

In the right panel, information about each application in the current integration is shown, including the version, current branch, tags and any deployed environments. The following actions are available from these tiles:

- Copy contract URL - Copies the URL of the latest pact (consumer) or provider contract (provider)
- Copy stub URL - Copies the URL of the [stub](/docs/stubs) created from the latest pact

<img width="400" src="/ui/clarity/contract-application.png" description="Application Information" />
<img width="400" src="/ui/clarity/contract-application-menu-actions.png" description="Menu Actions" />

### Pact Metadata

In the right panel, any metadata from the pact file is shown.

### Menu items

The following actions are available on this page:

<img width="400" src="/ui/clarity/contract-menu-actions.png" description="Menu Actions" />

- Refresh the page - updates the page to use newer data if available.
- Delete verification results - deletes the currently visible (latest) verification result.
- Delete pact for consumer version `:version` - deletes the current pact.
- Delete the integration - deletes both pacticipants, and all associated data (pacts, verifications, application versions, tags and webhooks) that are not associated with other integrations.
- Delete all pacts - allows you to remove all pacts between the current consumer and provider. 

Some of these actions are only visible if the current user has the appropriate permissions, such as [contract_data:bulk_delete](/docs/permissions#contract_databulk_delete).
