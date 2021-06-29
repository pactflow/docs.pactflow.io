---
title: Permissions
---

Note that "manage" permissions cover both read and write operations.

## authentication_settings:manage

Manage authentication settings, such as configuring SSO via Github or Google.

## contract_data:bulk_delete:*

Bulk delete pacts (which just removes the pacts and their associated verifications), applications (which removes associated pacts, verification results, application versions and webhooks) or an integration (which removes all pacts, verification results and webhooks, but will leave any application which is referenced by another integration).

## contract_data:bulk_delete:team

Bulk delete pacts (see above) where consumer is assigned to the user's teams.

## contract_data:bulk_delete:own

Bulk delete pacts (see above) where consumer was created by the logged in user.

## contract_data:manage:*

Create, update, and delete any contract related data. This includes applications, application labels, application versions, tags, pacts, and verification results. It allows the user to delete a single pact, however it does not allow the user to perform bulk deletions (see [contract_data:bulk_delete:\*](#contract_data-bulk_delete)).

## contract_data:manage:team

Create, update, and delete contract related data for applications that are assigned to the user's teams. Pacts are managed by the consumer's team(s) and verification results are managed by the provider's team(s). 

### Notes on use of this role

Some Pactflow resources, such as secrets and webhooks, have a team assigned at the time of creation, so team scoped permissions can be applied at that stage to determine whether or not the user is allowed to create the resource. Pactflow "applications" (also known as "pacticipants") are generally created through open source libraries that are not aware of Pactflow teams, so the application resource must be created first, then added to a team in a separate step. Because the team associated with a pacticipant is not known at creation time, any user with only the `contract_data:manage:team` will not be allowed to create new pacticipants. If team users should be able to create pacticipants, then ensure the `contract_data:manage:own` permission is also added to the relevant role. If team users should not be able to create pacticipants, then a user with `contract_data:mangage:*` must be the one to create the pacticipant. Once the pacticipant is added to a team, users with the `team` scope may manage it thereafter.

## contract_data:manage:own

Create, update, and delete contract related data for applications that where created by the logged in user. This permission is required to allow an application to be created in Pactflow before it is assigned to a team.

## contract_data:read:*

View any contract related data. This includes applications, application labels, application versions, tags, pacts, and verification results.

## read_token:manage:own

Mange own *read only* API token. This permission is for users/system accounts that are not allowed to modify any resources (eg. those with the [Viewer](./predefined-roles#viewer) role), for whom it does not make sense to have a read/write token.

## role:manage:*

Create, update and delete roles (note that the pre-defined roles cannot be deleted).

## role:read:*

View all roles.

## secret:manage:*

Create, update and delete all secrets.

## secret:manage:team

Create, update and delete secrets assigned to the teams of which the user is a member.

## secret:read:team

View the names and descriptions of secrets assigned to the teams of which the user is a member.

## system_account:manage:*

Create, update, disable any system account and associated API tokens.

## system_account:manage:team

View details, disable, and copy and regenerate API tokens for system accounts assigned to the teams of which the user is a member. Does not currently allow creation of a system account, but this is expected to be supported in the future.

## system_account:read:*

View all system accounts (does not allow viewing/copying API tokens.)

## system_account:read:team

View system accounts that are assigned to the teams of which the user is a member (does not allow viewing/copying API tokens.)

## system_preference:manage:*

Manage the global system settings such as API token expiration and application notices.

## team:manage:*

Create, update and delete teams. Add and remove users and applications to/from teams.

## team:manage:{uuid}

Manage administrators, users and applications associated with a particular team. This permission is only associated with the [Team Administator](./predefined-roles#team-administrator) role, and cannot be assigned to any other roles.

## team:read:*

View teams and their associated users and applications.

## token:manage:own

Mange own read/write and read only API tokens.

## user:invite

Invite a user to the Pactflow application.

## user:manage:*

Create, update, disable any regular user (not system accounts), and modify their roles.

## user:read:*

View all regular users (not system accounts) and their associated roles.

## webhook:manage:*

Create, update and delete any webhook.

## webhook:manage:team

Create, update and delete webhooks assigned to the teams of which the user is a member.
