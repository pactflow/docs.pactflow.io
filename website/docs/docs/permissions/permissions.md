---
title: Permissions
---

_Eligible plans: Enterprise_

# Overview

PactFlow uses a structured permission model to define what users can do and where. Most permissions follow the format `resource:action:scope` , where:

- `resource` — the type of data or feature the permission applies to (for example, `contract_data`, `webhook`, `user`)
- `action` — the operation being performed (for example, `read`, `write`, `manage`, `invite`)
- `scope` — the level or context the permission applies to, such as:
  - `team` — restricts the permission to resources owned by teams the user belongs to
  - `*` — applies globally to all resources of that type
  - `{uuid}` — scoped to a specific team, used for fine-grained delegation (for example, `team:manage:{uuid}`)

Permissions are grant-only. Broader permissions cannot be narrowed by denial (for example, ai:* cannot exclude ai:generation:code).

> Note: `manage` permissions include both read and write access.

**Example:**  
`contract_data:manage:team` — allows a user to publish, modify, and view contract data for applications owned by any team they belong to.

While most permissions follow this pattern, there are a few exceptions. Refer to the sections below for a complete list of available permissions, including their effects and any additional constraints.

## AI

AI-related permissions are a special case. Instead of applying to data or resources, they control access to AI-powered features within PactFlow.

They are also **hierarchical**, meaning:

- Granting a broader permission (for example, `ai:*`) implies access to all sub-permissions within that namespace.
- More specific permissions allow access to a narrower feature set.

> **Note:** AI permissions do not include a `scope`, because they do not act on specific team-owned resources. Access is granted globally based on role assignment.

### ai:*
Provides access to all AI-related features, including all future permissions created under the `ai:` scope.

### ai:generation:*
Can generate Pact tests from all current and future supported inputs.

### ai:generation:openapi
Can generate Pact tests based on user-provided OpenAPI descriptions.

### ai:generation:code
Can generate Pact tests based on user-provided client code.

### ai:generation:request-response
Can generate Pact tests based on recorded request-response pairs.

### ai:generation:test-template
Can customize generated Pact test output using a predefined example as a template.

## Authentication

### authentication_settings:manage

Manage authentication settings, such as configuring SSO via Github or Google.

## Application Data

### contract_data:bulk_delete:*

Bulk deletes pacts (which just removes the pacts and their associated verifications), applications (which removes associated pacts, verification results, application versions and webhooks) or an integration (which removes all pacts, verification results and webhooks, but leaves any application referenced by another integration).

### contract_data:bulk_delete:team

Bulk deletes pacts (see above) where the consumer is assigned to the user's teams.

### contract_data:bulk_delete:own

Bulk deletes pacts (see above) where the consumer was created by the logged in user.

### contract_data:manage:*

Create, update, and delete any contract related data. This includes applications, application labels, application versions, branches, tags, pacts, and verification results. It allows the user to delete a single pact, but it does not allow to perform bulk deletions. When deleting an application that has associated pacts and versions, you must also have the appropriate bulk delete permission (see also [contract_data:bulk_delete:\*](#contract_data-bulk_delete)).

### contract_data:manage:team

Create, update, and delete contract related data for applications assigned to the user's teams. Pacts are managed by the consumer's team(s) and verification results are managed by the provider's team(s). 

:::info Notes on use of this role

Some PactFlow resources, such as secrets and webhooks, have a team assigned at the time of creation, so team scoped permissions can be applied at that stage to determine whether the user can create the resource or not. PactFlow "applications" (also known as "pacticipants") are generally created through open-source libraries that are not aware of PactFlow teams, so the application resource must be created first, then added to a team in a separate step. Because the team associated with a pacticipant is not known at creation time, any user with only the `contract_data:manage:team` will not be allowed to create new pacticipants. If team users should be able to create pacticipants, ensure that the `contract_data:manage:own` permission is also added to the relevant role. If team users should not be able to create pacticipants, a user with `contract_data:mangage:*` must be the one to create the pacticipant. Once the pacticipant is added to a team, users with `team` scope may manage it thereafter.

:::

### contract_data:manage:own

Create, update, and delete contract related data for applications created by the logged in user. This permission is required to create an application in PactFlow before it is assigned to a team.

### contract_data:read:*

View any contract-related data. This includes applications, application labels, application versions, branches, tags, pacts, and verification results.

## Environment and Deployment

### deployment_and_release:record:*

Notify PactFlow that a particular version of an application has been deployed or released. 

### deployment_and_release:record:team

Notify PactFlow that a particular version of an application associated with your team has been deployed or released. 

### environment:manage:*

Create, update, and delete any environment. When creating a new environment, the user can associate it with any team.

### environment:read:*

View a list of all environments.

### environment:read:team

View a list of environments associated with the user's teams.

## Tokens

### read_token:manage:own

Manage own *read only* API token. This permission is for users/system accounts that are not allowed to modify any resources (for example, those with the [Viewer](./predefined-roles#viewer) role), for whom it does not make sense to have a read/write token.

## Roles

### role:manage:*

Create, update and delete roles (note that the pre-defined roles cannot be deleted).

### role:read:*

View all roles.

## Secrets

### secret:manage:*

Create, update and delete all secrets.

### secret:manage:team

Create, update and delete secrets assigned to teams of which the user is a member.

### secret:read:team

View the names and descriptions of secrets assigned to teams of which the user is a member.

## Users, System Accounts and Teams

### system_account:manage:*

Create, update, and disable any system account and associated API tokens.

### system_account:manage:team

View details, disable, and copy and regenerate API tokens for system accounts assigned to the teams of which the user is a member. Does not currently allow system account creation, but this is expected to be supported in the future.

### system_account:read:*

View all system accounts (does not allow viewing/copying API tokens).

### system_account:read:team

View system accounts assigned to the teams of which the user is a member (does not allow viewing/copying API tokens).

### system_preference:manage:*

Manage the global system settings such as API token expiration and application notices.

### team:manage:*

Create, update and delete teams. Add and remove users, environments and applications to/from teams.

### team:manage:{uuid}

Manage administrators, users, environments and applications associated with a particular team. This permission is only associated with the [Team Administator](./predefined-roles#team-administrator) role and cannot be assigned to any other roles.

### team:read:*

View teams and their associated users and applications.

### token:manage:own

Manage own read/write and read only API tokens.

### user:invite

Invite a user to the PactFlow application.

### user:manage:*

Create, update, and disable any regular user (not system accounts), and modify their roles.

### user:manage_scim_attributes:*

Set and update the user attributes used by the PactFlow SCIM API to identify the user in the external Identity Provider (`externalIdpUsername` and `externalIdpId`). Must be used in conjuction with `user:invite` and `user:manage` permissions. This permission can only be associated with the SCIM role.

### user:read:*

View all regular users (not system accounts) and their associated roles.

## Webhooks

### webhook:manage:*

Create, update, and delete any webhook.

### webhook:manage:team

Create, update and delete webhooks assigned to the teams of which the user is a member.
