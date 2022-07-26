---
title: Can I Deploy
---

## What is Can I Deploy 
Can I Deploy page is the web version of our popular CLI tool [can-i-deploy](https://docs.pact.io/pact_broker/can_i_deploy), that queries the "Matrix". This UI provides a rich query interface for the Matrix to ensure you can safely deploy your application, providing additional context not readily available during CLI usage.

You can find `Can I Deploy` button from the top navigation bar on overview page.

## Can I Deploy layout

The Can I Deploy page contains three main areas.

&nbsp;

![can i deploy screenshot](/ui/cid.png)

&nbsp;

**1 -**
UI selectors for performing a Matrix query, where you can choose your application from the application list, the application version and the deployment target. For more information, see the [Selectors](#Selectors) section.

**2 -**
A list of messages summarising if you are safe to deploy your chosen application version. 

**3 -**
A table of verification statuses associated with your application version and deployment target.


<div class="status-table">

| Status                            | Description                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| ![success](/ui/success.png)       | The application version has a successful verification published for it.                                      |
| ![failed](/ui/failed.png)         | The verification for the application version had failed.                                              |
| ![unverified](/ui/unverified.png) | No verification result has been published for the application version.                                       |

</div>

### Selectors

There are three selectors for customising your Matrix query.

&nbsp;

![selector screenshot](/ui/cid-selectors.png)

&nbsp;

**a -**
Choose your application name from application lists.

**b -**
Select your application version from version lists. You can choose the application version from:
- Latest version from a branch (default: your main branch)
- Specific version number
- Version in an environment (Note: you need to have `environment read permission` to interact with this selection)
- Latest version
- Latest version with a specific tag

**c -**
Select your deployment target. Options include:
- Deploy to an environment (Note: you need to have `environment read permission` to interact with this selection)
- Deploy with the other applications' latest version with a specific tag
- Deploy with other applications' latest main branch

**d -**
A button to submit the Matrix query. It's disabled when a selector is missing or invalid.

## Miscellaneous

### Permission warning

You might see a warning in the following screenshot about the environment permission issue, please contact your account administrator to setup environment read/management permission for you. Otherwise, you are unable to choose and run the query including environments.

&nbsp;

![environment warning](/ui/cid-warning.png)
