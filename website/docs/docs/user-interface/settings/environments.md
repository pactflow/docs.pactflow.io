---
title: Environments
---

Here you will be able to manage the list of environments used by your organization. These represent your real world deployment or release environments.
Maintaining this list, along with the `record-deployment` and `record-release` commands, allows Pactflow to ensure you are safe to deploy using the `can-i-deploy tool`. You can read more about the process [here.](https://docs.pact.io/pact_broker/recording_deployments_and_releases/)

| Field | Description |
| ----- | ----------- |
| Teams | Associates the environment with teams, used to determine which teams are able to view and edit the environment after it is created. See permissions section below for details. |
| Name | A unique name, no spaces allowed. This name is used in the can-i-deploy and record-deployment CLI commands. eg. "payments-sit-1". This field cannot be edited |
| DisplayName | A more verbose name for the environment. "Payments Team SIT 1". |
| Production | Whether or not this environment is a production environment. |

#### Creating Production Environments

If all the services in the Broker are deployed to the same "public" internet, then there only needs to be one Production environment. If there are multiple segregated production environments (eg. when maintaining on-premises software for multiple customers) then you should create a separate production Environment for each logical deployment environment.

#### Permissions

Environments can be associated with Teams via creating or editing an Environment, or in the Team settings when creating or editing a Team. The permissions that determine when a user can associate an environment with a team are as follows:

#### environment:manage:* 
Users with this permission can view, edit and delete all environments. When creating or editing an environment the user can add or remove any team, regardless of their 'teams' permissions. 

#### environment:manage:team
Users with this permission can view and edit the environments associated with their teams. When creating or editing an environment the user cannot add or remove any teams to/from the environment, however they can edit other fields on the environment (DisplayName, Production). 

#### team:manage:* and team:manage:uuid
When creating or editing a team the user has permission for they can add or remove any environment to/from the team. 

