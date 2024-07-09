---
title: Migration Guide
---

If you are using PactFlow's Classic user interface (UI), this document provides an overview of the key changes introduced in the new UI.

## Viewing Integrations

There is no longer a list of "integrations". Instead, the user interface is based around "applications". To discover the integrations for a specific application, you must first navigate to the application of your choice.

| Before                                                                  | After                                                                  |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| All integrations are visible from the dashboard page.                   | Integrations are only shown for the selected application.              |
| ![Integrations - before](/ui/clarity/migration-integrations-before.png) | ![Integrations - before](/ui/clarity/migration-integrations-after.png) |

## Matrix

The matrix tab on the contract details page has been removed. It has been replaced with two separate tabs - the "Compatibility" and "Can I Deploy" tabs, accessible from the [application versions](../application) page.

| Before                                                                      | After                                                                                   |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| All versions of both consumer and provider are displayed in a single table. | You must first select the application version to compare to the integrated application. |
| ![Integrations - before](/ui/clarity/migration-matrix-before.png)           | ![Integrations - before](/ui/clarity/migration-matrix-after.png)                        |

## Can I Deploy

This page has been removed. It has been replaced by local "Can I Deploy" tab accessible from the [application versions](../application.md) page. 

| Before                                                                                   | After                                                                                                                                                         |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Can I Deploy requires you to complete all of the same options you can enter into the CLI | Can I Deploy shows the deployability of the currently selected application version. To see the main or other branch compatibility, see the compatibility tab. |
| ![Can I Deploy - Before](/ui/clarity/migration-cid-before.png)                           | ![Can I Deploy - Deploy Compatibility](/ui/clarity/migration-cid-after.png)                                                                                   |
|                                                                                          | ![Can I Deploy - Branch Compatibility](/ui/clarity/migration-cid-after2.png)                                                                                  |

## Triggered Webhooks

Triggered webhooks are now only visible from the [Webhooks](../settings/webhooks) settings page.

| Before                                                                                   | After                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Triggered webhooks for specific integration are visible directly in the integration view | Triggered webhooks are visible from the webhooks settings page.                    |
| ![Triggered Webhooks - before](/ui/clarity/migration-triggered-webhooks-before.png)      | ![Triggered Webhooks - before](/ui/clarity/migration-triggered-webhooks-after.png) |

## HAL explorer
Needs you to select a token. Can also test the APIs in context of read-only/read-write

| Before | After |
|------|------|
| The HAL browser was accessible at the URL `/hal-browser/` | The HAL browser has been replaced by the HAL explorer, and accessible at the URL `/explorer`. When accessing the HAL explorer, you can now select which API token to authenticate API calls with |

<!-- 
## Personal preference
"show welcome dialog" has been removed.
1. Environment ordering
Once selected the environments can be re-ordered and saved in that order. 

-->