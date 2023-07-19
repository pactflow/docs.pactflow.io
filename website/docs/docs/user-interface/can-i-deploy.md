---
title: Can I Deploy
---

## What is Can I Deploy 
Can I Deploy page is the web version of our popular CLI tool [can-i-deploy](https://docs.pact.io/pact_broker/can_i_deploy), which queries the "Matrix". This UI provides a rich query interface for the Matrix to ensure you can safely deploy your application. It provides additional context not readily available during CLI usage.

You can find `Can I Deploy` button in the top navigation bar on the overview page.

## Walkthrough
<iframe width="560" height="315" src="https://www.youtube.com/embed/e-l21IjI_d8" title="Can I Deploy introduction" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Can I Deploy layout

The Can I Deploy page contains three main areas:

&nbsp;

![can i deploy screenshot](/ui/cid.png)

&nbsp;

**UI selectors**
It helps you choose your application from the application list, the application version and the deployment target. For more information, see the [Selectors](#Selectors) section.

**Messaging list**
It summarizes if you are safe to deploy your chosen application version. 

**Verification statuses table**
It demonstrates your application version and deployment target.


<div class="status-table">

| Status                            | Description                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| ![success](/ui/success.png)       | The application version has a successful verification published for it.                                      |
| ![failed](/ui/failed.png)         | The verification for the application version had failed.                                              |
| ![unverified](/ui/unverified.png) | No verification result has been published for the application version.                                       |

</div>

### Selectors

There are three selectors for customizing your Matrix query.

&nbsp;

![selector screenshot](/ui/cid-selectors.png)

&nbsp;

**a -**
You can choose your application name from the list of applications.

**b -**
You can choose your application version from the list of versions mentioned below:
- The latest version from a branch (default: your main branch)
- Specific version number
- Version in an environment (Note: you need to have `environment read permission` to interact with this selection)
- The latest version
- The latest version with a specific tag

**c -**
Below are a few options for choosing your deployment target::
- Deploy to an environment (Note: you need to have `environment read permission` to interact with this selection)
- Deploy with the other applications' latest version with a specific tag
- Deploy with other applications' latest main branch

**d -**
There is a button to submit the matrix query. When a selector is missing or invalid, it is disabled.

## Miscellaneous

### Permission warning

You might see a warning in the following screenshot about the environment permission issue. To set up read/management permissions for your environment, please contact your account administrator. Otherwise, you will not be able to select and run the query that includes environments.

&nbsp;

![environment warning](/ui/cid-warning.png)
