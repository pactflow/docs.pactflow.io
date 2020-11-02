---
title: System defined roles
---

The Pactflow application comes with the following predefined roles. Each role is assigned a collection of [permissions](./permissions).

Modification of role/permission/user assignments is not yet supported, but will be released soon. See the [Pactflow Roadmap](https://github.com/pactflow/roadmap/projects/1) for more information.

## Administrator

The user who signed up for the Pactflow tenant will be assigned the Administrator role. They are then able to assign the Administrator role to other users.

#### Default permissions

* [`contract_data:bulk_delete:*`](./permissions#contract_data-bulk_delete)
* [`contract_data:manage:*`](./permissions#contract_data-manage)
* [`secret:manage:*`](./permissions#secret-manage)
* [`system_account:manage:*`](./permissions#system_account-manage)
* [`role:manage:*`](./permissions#role-manage)
* [`team:manage:*`](./permissions#team-manage)
* [`token:manage:own`](./permissions#token-manage-own)
* [`user:invite`](./permissions#user-invite)
* [`user:manage:*`](./permissions#user-manage)
* [`webhook:manage:*`](./permissions#webhook-manage)

## Test Maintainer

All new users are assigned the `Test Maintainer` role.

#### Default permissions

* [`contract_data:manage:*`](./permissions#contract_data-manage)
* [`role:read:*`](./permissions#role-read)
* [`secret:manage:*`](./permissions#secret-manage)
* [`system_account:read:*`](./permissions#system_account-read)
* [`team:read:*`](./permissions#team-read)
* [`token:manage:own`](./permissions#token:manage:own)
* [`user:read:*`](./permissions#user-read)
* [`webhook:manage:*`](./permissions#webhook-manage)

## CI/CD

This is the default role associated with a system account.

#### Default permissions

* [`contract_data:manage:*`](./permissions#contract_data-manage)

## Viewer

#### Default permissions

* [`contract_data:read:*`](./permissions#contract_data-read)
* [`read_token:manage:own`](./permissions#read_token-manage-own)
* [`user:read:*`](./permissions#user-read)