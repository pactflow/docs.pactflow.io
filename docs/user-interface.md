---
id: user-interface
title: Pactflow User Interface Help
---

## Main Screen

The main Pactflow screen has four functional areas.

&nbsp;

![Main Screen](assets/ui/main-screen.png)

&nbsp;

<img src="assets/ui/one.png" style="float: left; padding-right: 5px"/>
The list of all integrations are displayed on the left panel. An integration here is the pair of a consumer and provider that have a pact. Select an integration to have its details displayed in the center panel. The status icon (see table below) will be displayed for the verification result of latest pact.

<img src="assets/ui/two.png" style="float: left; padding-right: 5px"/>
The details of the selected integration will be displayed here.

<img src="assets/ui/three.png" style="float: left; padding-right: 5px"/>
You can filter the list of integrations here by either the Consumer or Provider name.

<img src="assets/ui/four.png" style="float: left; padding-right: 5px"/>
The tabs at the top provide different views of the currently selected integration. The Network
Diagram will display a graph view of all the integrations that are reachable from the selected one.
The Matrix will display more details of all the pacts and verifications of the selected integration.

<img src="assets/ui/five.png" style="float: left; padding-right: 5px"/>
The settings (or cog) button will take you to all the setting screens. Here you'll be able to setup
tokens and webhooks.

&nbsp;

| Status Icon | Description |
|-------------|-------------|
| ![success](assets/ui/success.png) | The pact has a successful verification published for it. |
| ![failed](assets/ui/failed.png) | The latest verification for the pact had failed. |
| ![unverified](assets/ui/unverified.png) | No verification result has been published for the pact. |
| ![waiting](assets/ui/waiting.png) | A new version of the pact has been published since the last verification result was received. |
