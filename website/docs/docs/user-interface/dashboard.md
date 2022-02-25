---
title: Dashboard
---

## Dashboard layout

The main Pactflow screen has four functional areas.

&nbsp;

![Main Screen](/ui/dashboard.png)

&nbsp;

**1 -**
The list of all integrations are displayed on the left panel. An integration here is the pair of a consumer and provider that have a pact. Select an integration to have its details displayed in the center panel. The status icon (see table below) will be displayed for the verification result of latest pact.

**2 -**
The details of the selected integration will be displayed here.

**3 -**
You can filter the list of integrations here by either the Consumer or Provider name.

**4 -**
If you have been assigned to a [team](#settings-teams), you can select them here. This will filter the list of integrations
by the applications that belong to the team.

**5 -**
The tabs at the top provide different views of the currently selected integration. The Network
Diagram will display a graph view of all the integrations that are reachable from the selected one.
The Matrix will display more details of all the pacts and verifications of the selected integration.

**6 -**
The settings (or cog) button will take you to all the setting screens. Here you'll be able to setup
[API tokens](#settings-api-tokens), [webhooks](#settings-webhooks), [users](#settings-users) and more.

**7 -**
Displays the current logged in user and subscription status.

&nbsp;

<div class="status-table">

| Status                            | Description                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| ![success](/ui/success.png)       | The pact has a successful verification published for it.                                      |
| ![failed](/ui/failed.png)         | The latest verification for the pact had failed.                                              |
| ![unverified](/ui/unverified.png) | No verification result has been published for the pact.                                       |
| ![waiting](/ui/waiting.png)       | A new version of the pact has been published since the last verification result was received. |

</div>

## Version tag menus

The blue and grey "pill" icons shown next to the consumer and provider version numbers on the Overview, Matrix and Pact pages represent [tags](https://docs.pact.io/pact_broker/tags) that belong to the relevant application versions in Pactflow.

A blue pill indicates that the application version is the latest version that has a tag with that name (eg. the latest consumer version with a "main" tag).

<img alt="Latest version tag menu" src="/ui/tag-main-latest.png" style={{width: 70}}/>

A grey pill indicates that there is a later application version that has the same tag.

<img alt="Not latest version tag menu" src="/ui/tag-main-not-latest.png" style={{width: 70}}/>

Clicking on the tag pill icon will allow you to perform actions in the context of that application version tag.

### Consumer version tags

Clicking on a tag pill for a consumer version tag will make the following menu available.

![Consumer version tag menu](/ui/consumer-version-tag-menu.png)

#### Menu items

##### Resources

- Copy pact URL - selecting this menu item will copy the URL of the latest pact with the given tag into the clipboard.
- Copy stub URL - selecting this menu item will copy the URL of the [stub](/docs/stubs) that is created from the latest pact for the given tag.
- Copy badge URL - selecting this menu item will copy the URL of the [verification status badge](https://docs.pact.io/pact_broker/advanced_topics/provider_verification_badges/) for the latest pact for the given tag into the clipboard.
- Copy tag URL - selecting this menu item will copy the URL of the application version tag into the clipboard.
- Copy tag name - selecting this menu item will copy the name of the tag into the clipboard.

##### Delete

- Delete all pacts with the given tag - selecting this menu item allows you to delete all pacts that belong to application versions with the given tag. This item will only be visible if the current user has the [contract_data:bulk_delete](/docs/permissions#contract_databulk_delete) permission.

### Provider version tags

Clicking on a tag pill for a provider version tag will make the following menu available.

![Provider version tag menu](/ui/provider-version-tag-menu.png)

#### Menu Items

##### Resources

- Copy tag URL - selecting this menu item will copy the URL of the application version tag into the clipboard.
- Copy tag name - selecting this menu item will copy the name of the tag into the clipboard.
