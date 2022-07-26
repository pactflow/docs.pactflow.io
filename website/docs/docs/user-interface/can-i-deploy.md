---
title: Can I Deploy
---

## What is Can I Deploy 
Can I Deploy page is the UI version of our popular CLI tool [can-i-deploy](https://docs.pact.io/pact_broker/can_i_deploy). This UI allows your to run can-i-deploy queries with UI selectors to ensure you can safely deploy your application. 

You can find `Can I Deploy` button from the top navigation bar on overview page.

## Can I Deploy layout

Can I Deploy page contains three main areas.

&nbsp;

![can i deploy screenshot](/ui/cid.png)

&nbsp;

**1 -**
UI selectors for performing can-i-deploy command, where you can choose your application from application list, the application version and the deployment target. For more information, check [Selectors](/#Selectors) section.

**2 -**
A list of messages summarising if you are safe to deploy your chosen application version. 

**3 -**
A table of verification status associated with your application version and deployment target.


<div class="status-table">

| Status                            | Description                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| ![success](/ui/success.png)       | The pact has a successful verification published for it.                                      |
| ![failed](/ui/failed.png)         | The verification for the pact had failed.                                              |
| ![unverified](/ui/unverified.png) | No verification result has been published for the pact.                                       |

</div>

### Selectors

The selectors has three selectors for customising your can-i-deploy queries.

&nbsp;

![selector screenshot](/ui/cid-selectors.png)

&nbsp;

**a -**
Choose your application name from application lists.

**b -**
Select your application version from version lists. You can choose application version from:
- Latest version from branch (default: your main branch)
- Specific version number
- Version in an environment (Note: you need to have `environment read permission` to interact with this selection)
- Latest version
- Latest version with tag

**c -**
Select your deployment target. Options include:
- Deploy to an environment (Note: you need to have `environment read permission` to interact with this selection)
- Deploy with other applications' latest version with a specific tag
- Deploy with other applications' latest main branch

**d -**
A button triggers can-i-deploy query. It's disabled when a selector is missing or mischosen.

## Miscs

### Permission warning

You might see a warning as following screenshot about environment permission issue, please contact your account admininstrator to setup environment read/management permission for you. Otherwise, you are unable to choose and run can-i-deploy query about environments

&nbsp;

![environment warning](/ui/cid-warning.png)
