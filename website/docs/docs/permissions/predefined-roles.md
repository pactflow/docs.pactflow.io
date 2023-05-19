---
title: Predefined roles
---

_Eligible plans: Enterprise_

The PactFlow application comes with the following predefined roles. Each role is assigned a collection of [permissions](/docs/permissions).

## Administrator

The user who signed up for the PactFlow tenant will be assigned the Administrator role. They are then able to assign the Administrator role to other users.

#### Default permissions

- [`authentication_settings:manage:*`](/docs/permissions/#authentication_settingsmanage)
- [`contract_data:bulk_delete:*`](/docs/permissions#contract_databulk_delete)
- [`contract_data:manage:*`](/docs/permissions#contract_datamanage)
- [`deployment_and_release:record:*`](/docs/permissions#deployment_and_releaserecord)
- [`environment:manage:*`](/docs/permissions#environmentmanage)
- [`role:manage:*`](/docs/permissions#rolemanage)
- [`secret:manage:*`](/docs/permissions#secretmanage)
- [`system_account:manage:*`](/docs/permissions#system_accountmanage)
- [`system_preference:manage:*`](/docs/permissions#system_preferencemanage)
- [`team:manage:*`](/docs/permissions#teammanage)
- [`token:manage:own`](/docs/permissions#tokenmanageown)
- [`user:invite`](/docs/permissions#userinvite)
- [`user:manage:*`](/docs/permissions#usermanage)
- [`webhook:manage:*`](/docs/permissions#webhookmanage)

## User

All new users are assigned the `User` role (unless the default role has been updated in the [system preferences](/docs/user-interface/settings/preferences#system-preferences)). The `User` role is intended to work in conjunction with [team assignments](/docs/user-interface/settings/teams), and therefore has `manage:team` permissions (rather than `manage:*` permissions) for all resources that can be associated with a team. The `User` role should be assigned to all developers, testers and other users who create and verify contracts in the PactFlow platform.

#### Default permissions

- [`contract_data:bulk_delete:own`](/docs/permissions#contract_databulk_deleteown)
- [`contract_data:bulk_delete:team`](/docs/permissions#contract_databulk_deleteteam)
- [`contract_data:manage:own`](/docs/permissions#contract_datamanageown)
- [`contract_data:manage:team`](/docs/permissions#contract_datamanageteam)
- [`contract_data:read:*`](/docs/permissions#contract_dataread)
- [`environment:read:team*`](/docs/permissions#environmentreadteam)
- [`role:read:*`](/docs/permissions#roleread)
- [`secret:manage:team`](/docs/permissions#secretmanageteam)
- [`system_account:manage:team`](/docs/permissions#system_accountmanageteam)
- [`system_account:read:*`](/docs/permissions#system_accountread)
- [`team:read:*`](/docs/permissions#teamread)
- [`token:manage:own`](/docs/permissions#tokenmanageown)
- [`user:read:*`](/docs/permissions#userread)
- [`webhook:manage:team`](/docs/permissions#webhookmanageteam)

## CI/CD

This is the default role associated with a system account.

#### Default permissions

- [`contract_data:manage:own`](/docs/permissions#contract_datamanageown)
- [`contract_data:manage:team`](/docs/permissions#contract_datamanageteam)
- [`contract_data:read:*`](/docs/permissions#contract_dataread)
- [`deployment_and_release:record:*`](/docs/permissions#deployment_and_releaserecord)
- [`environment:read:*`](/docs/permissions#environmentread)

## Team Administrator

This role is automatically assigned to any user who is set as an administrator of a specific team. This role may not be edited or deleted, and cannot be assigned directly via the user roles APIs or UIs.

#### Default permissions

- [`team:manage:{uuid}`](/docs/permissions#teammanageuuid)

## Viewer

#### Default permissions

- [`contract_data:read:*`](/docs/permissions#contract_dataread)
- [`read_token:manage:own`](/docs/permissions#read_tokenmanageown)
- [`team:read:*`](/docs/permissions#teamread)
- [`user:read:*`](/docs/permissions#userread)

## Guest

A user with the guest role can only view contract related data through the UI, and has no API access.

The permissions associated with the guest role may not be modified.

#### Permissions

- [`contract_data:read:*`](/docs/permissions#contract_dataread)

## SwaggerHub

A user with the SwaggerHub role can be used to provide an API Token for the SwaggerHub integration, allowing SwaggerHub to verify published pacts against live Swagger docs.

The permissions associated with the SwaggerHub role may not be modified.

#### Permissions

- [`environment:read:*`](/docs/permissions#environmentread)
- [`contract_data:read:*`](/docs/permissions#contract_dataread)

## Test Maintainer (deprecated)

The Test Maintainer role has been replaced by the User role. The difference between the User and Test Maintainer roles is that the User role has team scoped permissions for Webhook and Secret management.

#### Default permissions

- [`contract_data:bulk_delete:own`](/docs/permissions#contract_databulk_deleteown)
- [`contract_data:manage:own`](/docs/permissions#contract_datamanageown)
- [`contract_data:manage:team`](/docs/permissions#contract_datamanageteam)
- [`contract_data:read:*`](/docs/permissions#contract_dataread)
- [`role:read:*`](/docs/permissions#roleread)
- [`secret:manage:*`](/docs/permissions#secretmanage)
- [`system_account:read:*`](/docs/permissions#system_accountread)
- [`team:read:*`](/docs/permissions#teamread)
- [`token:manage:own`](/docs/permissions#tokenmanageown)
- [`user:read:*`](/docs/permissions#userread)
- [`webhook:manage:*`](/docs/permissions#webhookmanage)

## Resetting permissions for predefined roles

Should you wish to reset the permissions assigned to each of the predefined roles back to their defaults as documented above (or upgrade from the globally scoped User role to the team scoped User role) you can follow these steps. Note that any custom roles will remain unaffected, and the user/role assignments are not changed.

- Click on the `API` button at the top right of the PactFlow dashboard.
- In the `Links` section, scroll down to the line where `rel` column has a value of `pf:admin-roles`.
- Click on the green arrow in the `GET` column that has the hover text "Follow link".
- Scroll up to the top of the page.
- In the Links section, if you can see the line with a `rel` of `pf:reset`, then you have the permissions required to reset the roles. If you cannot see this relation, then you do not have the required permissions.
- Click on the yellow `!` button in the `NON-GET` column.
- Click on the blue `Make Request` button. You will see a 200 OK response with the updated list of roles.
