---
title: Permissions
---

## contract_data:bulk_delete:*

Bulk delete pacts (which just removes the pacts and their associated verifications) or an integration (which also removes webhooks).

## contract_data:manage:*

Create, update, and delete any contract related data. This includes applications, application labels, application versions, tags, pacts, and verification results. It does not allow the user to perform bulk deletions (see [contract_data:bulk_delete:\*](#contract_data-bulk_delete)).

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

