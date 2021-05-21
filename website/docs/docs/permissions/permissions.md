---
title: Permissions
---

## contract_data:bulk_delete:*

Bulk delete pacts (which just removes the pacts and their associated verifications), applications (which removes associated pacts, verification results, application versions and webhooks) or an integration (which removes all pacts, verification results and webhooks, but will leave any application which is referenced by another integration).

## contract_data:bulk_delete:team

Bulk delete pacts (see above) where consumer is assigned to the user's teams.

## contract_data:bulk_delete:own

Bulk delete pacts (see above) where consumer was created by the logged in user.

## contract_data:manage:*

Create, update, and delete any contract related data. This includes applications, application labels, application versions, tags, pacts, and verification results. It does not allow the user to perform bulk deletions (see [contract_data:bulk_delete:\*](#contract_data-bulk_delete)).

## contract_data:manage:team

Create, update, and delete contract related data for applications that are assigned to the user's teams. Pacts are managed by the consumer's team(s) and verification results are managed by the provider's team(s).

## contract_data:manage:own

Create, update, and delete contract related data for applications that where created by the logged in user. This permission is required to allow an application to be created in Pactflow before it is assigned to a team.

## contract_data:read:*

View any contract related data. This includes applications, application labels, application versions, tags, pacts, and verification results.

## read_token:manage:own

Mange own *read only* API token. This permission is for users/system accounts that are not allowed to modify any resources (eg. those with the [Viewer](./system-defined-roles#viewer) role), for whom it does not make sense to have a read/write token.

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

## system_account:read:*

View all system accounts.

## team:manage:*

Create, update and delete teams. Add and remove users and applications to/from teams.

## team:read:*

View teams and their associated users and applications.

## token:manage:own

Mange own read/write and read only API tokens.

## user:manage:*

Create, update, disable any user, and modify their roles.

## user:read:*

View all users and their associated roles.

## user:invite

Invite a user to the Pactflow application.

## webhook:manage:*

Create, update and delete any webhook.

## webhook:manage:team

Create, update and delete webhooks assigned to the teams of which the user is a member.
