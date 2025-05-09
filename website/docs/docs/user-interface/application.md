---
title: Application
---

## Application

Applications—also called **Pacticipants**—are central to the PactFlow experience.

From this page, you can:

1. View all versions of your application.  
2. Discover all integrated applications and their contracts.  
3. See the application's overall health.  
4. Check if the application is deployable.  
5. Configure application settings.

### Application Versions

The **Application Versions** tab shows the latest version of the selected application, based on the designated main branch. Recent versions appear in adjacent tabs.

- Click a tab to view details for that version.  
- To view older versions, select **View All**.  
- To filter by branch or tag, click the corresponding label and update the filter. You can only filter by one at a time.

Your filter preferences are preserved when you return to this page.

Accessing this page updates the **Recent** list under **Applications** in the navigation panel.

![Application – Version Page](/ui/clarity/application-version.png)

### Compatibility

The **Compatibility** tab shows integrated applications as tiles, each summarizing verification status.

- Each tile includes tabs for previous verification results, ordered left to right with the most recent result first.
- Integrated applications may act as either a **consumer** or a **provider**.

To update the data:

- Filter by **branch**, **tag**, or **environment** (only one at a time).  
- Select a branch within a tile to filter its versions.  
- Use the **toggle** at the top to apply the latest updated or main branch across all tiles.

Click:

- **View contract** to see contract details for a specific version.  
- **Triggered Webhooks** to view webhook events related to the integration.

![Application – Compatibility Tab](/ui/clarity/application-version-compatibility.png)

### Can I Deploy

The **Can I Deploy** tab shows the current deployability status for the application in a selected environment.

- Select a **team** from the drop-down to load the associated environments.  
- View the results to determine whether deployment is possible.

For details, see the [`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) documentation.

Click a link in the table to navigate to the corresponding verification result.

![Can I Deploy](/ui/clarity/application-cid.png)

### Network

The **Network** tab displays all applications directly integrated with the current application.

- Click a node to navigate to the collaborating application.

![Application – Network Tab](/ui/clarity/application-network.png)

## Settings

### General

Update the **display name** of the application in the **General** tab.

![Application – General Settings Page](/ui/clarity/application-settings-general.png)

### Version Control

Specify the **main branch** and **repository URL** (for example, a GitHub URL) in the **Version Control** tab.

![Application – Version Control Settings Page](/ui/clarity/application-settings-version.png)

### Badge

Generate `can-i-deploy` build badges in the **Badge** tab.

![Application – Badge Settings Page](/ui/clarity/application-settings-badges.png)