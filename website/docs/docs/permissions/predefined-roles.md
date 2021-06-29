---
title: Predefined roles
---

The Pactflow application comes with the following predefined roles. Each role is assigned a collection of [permissions](permissions).

## Administrator

The user who signed up for the Pactflow tenant will be assigned the Administrator role. They are then able to assign the Administrator role to other users.

#### Default permissions

* [`authentication_settings:manage:*`](/docs/permissions/permissions/#authentication_settings-manage)
* [`contract_data:bulk_delete:*`](/docs/permissions/permissions#contract_data-bulk_delete)
* [`contract_data:manage:*`](/docs/permissions/permissions#contract_data-manage)
* [`role:manage:*`](/docs/permissions/permissions#role-manage)
* [`secret:manage:*`](/docs/permissions/permissions#secret-manage)
* [`system_account:manage:*`](/docs/permissions/permissions#system_account-manage)
* [`system_preference:manage:*`](/docs/permissions/permissions#system_preference-manage)
* [`team:manage:*`](/docs/permissions/permissions#team-manage)
* [`token:manage:own`](/docs/permissions/permissions#token-manage-own)
* [`user:invite`](/docs/permissions/permissions#user-invite)
* [`user:manage:*`](/docs/permissions/permissions#user-manage)
* [`webhook:manage:*`](/docs/permissions/permissions#webhook-manage)

## User

All new users are assigned the `User` role. The `User` role is intended to work in conjunction with [team assignments](/docs/user-interface/settings/teams), and therefore has `manage:team` permissions (rather than `manage:*` permissions) for all resources that can be associated with a team. 

#### Default permissions

* [`contract_data:bulk_delete:own`](/docs/permissions/permissions#contract_databulk_deleteown)
* [`contract_data:bulk_delete:team`](/docs/permissions/permissions#contract_databulk_deleteteam)
* [`contract_data:manage:own`](/docs/permissions/permissions#contract_datamanageown)
* [`contract_data:manage:team`](/docs/permissions/permissions#contract_datamanageteam)
* [`contract_data:read:*`](/docs/permissions/permissions#contract_dataread)
* [`role:read:*`](/docs/permissions/permissions#role-read)
* [`secret:manage:team`](/docs/permissions/permissions#secret-manage-team)
* [`system_account:manage:team`](/docs/permissions/permissions#system_account-read)
* [`system_account:read:*`](/docs/permissions/permissions#system_account-read)
* [`team:read:*`](/docs/permissions/permissions#team-read)
* [`token:manage:own`](/docs/permissions/permissions#token:manage:own)
* [`user:read:*`](/docs/permissions/permissions#user-read)
* [`webhook:manage:team`](/docs/permissions/permissions#webhook-manage-team)

## CI/CD

This is the default role associated with a system account.

#### Default permissions

* [`contract_data:manage:own`](/docs/permissions/permissions#contract_data-manageown)
* [`contract_data:manage:*`](/docs/permissions/permissions#contract_data-manage)
* [`contract_data:read:*`](/docs/permissions/permissions#contract_data-read)

## Team Administrator

This role is automatically assigned to any user who is set as an administrator of a specific team. This role may not be edited or deleted, and cannot be assigned directly via the user roles APIs or UIs.

#### Default permissions

* [`team:manage:{uuid}`](/docs/permissions/permissions#teammanageuuid)

## Viewer

#### Default permissions

* [`contract_data:read:*`](/docs/permissions/permissions#contract_data-read)
* [`read_token:manage:own`](/docs/permissions/permissions#read_token-manage-own)
* [`system_preferences:read:*`](/docs/permissions/permissions#system_preferences-read)
* [`team:read:*`](/docs/permissions/permissions#team-read)
* [`user:read:*`](/docs/permissions/permissions#user-read)


## Test Maintainer (deprecated)

The Test Maintainer role has been replaced by the User role. The difference between the User and Test Maintainer roles is that the User role has team scoped permissions for Webhook and Secret management.

#### Default permissions

* [`contract_data:bulk_delete:own`](/docs/permissions/permissions#contract_databulk_deleteown)
* [`contract_data:manage:own`](/docs/permissions/permissions#contract_datamanageown)
* [`contract_data:manage:team`](/docs/permissions/permissions#contract_datamanageteam)
* [`contract_data:read:*`](/docs/permissions/permissions#contract_dataread)
* [`role:read:*`](/docs/permissions/permissions#role-read)
* [`secret:manage:*`](/docs/permissions/permissions#secret-manage)
* [`system_account:read:*`](/docs/permissions/permissions#system_account-read)
* [`system_preferences:read:*`](/docs/permissions/permissions#system_preferences-read)
* [`team:read:*`](/docs/permissions/permissions#team-read)
* [`token:manage:own`](/docs/permissions/permissions#token:manage:own)
* [`user:read:*`](/docs/permissions/permissions#user-read)
* [`webhook:manage:*`](/docs/permissions/permissions#webhook-manage)


## Resetting permissions for predefined roles

Should you wish to reset the permissions assigned to each of the predefined roles back to their defaults as documented above (or upgrade from the globally scoped Test Maintainer role to the team scoped User role) you can follow these steps. Note that any custom roles will remain unaffected, and the user/role assignments are not changed.

* Click on the `API` button at the top right of the Pactflow dashboard.
* In the `Links` section, scroll down to the line where `rel` column has a value of `pf:admin-roles`.
* Click on the green arrow in the `GET` column that has the hover text "Follow link".
* Scroll up to the top of the page.
* In the Links section, if you can see the line with a `rel` of `pf:reset`, then you have the permissions required to reset the roles. If you cannot see this relation, then you do not have the required permissions.
* Click on the yellow `!` button in the `NON-GET` column.
* Click on the blue `Make Request` button. You will see a 200 OK response with the updated list of roles.
