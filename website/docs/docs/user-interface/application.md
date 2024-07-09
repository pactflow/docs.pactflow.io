---
title: Application
---

Applications (or "Pacticipants") are at the center of the PactFlow experience. From this page, you can:

1. See all versions of your application.
2. Discover all integrated applications and their contracts.
3. See the health of the application at a glance.
4. Check if your application is deployable.
5. Configure your application settings.

### Version Details

In the left-hand panel, you can see all versions of the currently selected application. Select a version to view its details.

![Application Page](/ui/clarity/application.png)

### Compatibility

This tab displays each of the integrated applications as tiles, showing a summary of the verification status for each. Each tile has a historical bar chart showing the compatibility of previous versions. Hover over the bar chart to see details, or click to pin them.

Select a branch in each tile to see versions related to that branch, or use the toggle at the top to quickly change all tiles to the latest updated or main branch.

Click "View contract" to see a contract for a specific version.

![Application Page](/ui/clarity/application-compatibility-tile.png)

### Can I Deploy

This tab shows the current deployability to a given environment (see the [`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) documentation for more information). You must select a team from the drop-down menu to fetch environments related to the selected team before the results can be displayed.

![Can I Deploy](/ui/clarity/application-cid.png)

Click on the link in the row to navigate to the specific verification result for a given entry.

### Network

This tab shows all applications directly integrated with the currently selected application. Click on a node to navigate to the collaborating application.

![Network Graph](/ui/clarity/application-network.png)

### Settings

#### General

This tab allows you to see and modify the display name of the application.

![Settings - General](/ui/clarity/application-settings.png)

#### Version Control

This tab allows you to specify the main branch and repository URL (e.g., a GitHub URL) for the application.

![Settings - Version Control](/ui/clarity/application-version-control.png)

#### Badge

This tab allows you to generate `can-i-deploy` build badges for the current application.

![Settings - Badge](/ui/clarity/application-badge.png)