---
title: Users
---

Our User Management feature allows you manage the following capabilities:

* See the users in their team as well as their login activity (all)
* Invite new users to join the team (Administrator only)
* Grant or remove administrator access for other users (Administrator only)
* Enable and disable users (Administrator only)
* Create system accounts (Administrator only)
* Edit any user's roles (Administrator only)

_NOTE: by default, the Administrator of the account is automatically set to the account creator._

![User Management Screen](/ui/users.png)

**(1)**&nbsp;&nbsp;&nbsp;The current plan details are displayed, alongside remaining user seat and system account limits.

**(2)**&nbsp;&nbsp;&nbsp;If the current user is an Administrator, the option to invite new users will be presented here.

**(3)**&nbsp;&nbsp;&nbsp;Change to view between active users, system accounts and disabled users here.

**(4)**&nbsp;&nbsp;&nbsp;When multiple users are selected, bulk actions will become available.

**(5)**&nbsp;&nbsp;&nbsp;Individual user actions are present from these menus.


## Enabling and Disabling Users

You may disable (or enable) a user by either choosing the action via the `"..."` menu to the right of the user's record or by selecting the user with the checkbox and using the bulk action menu. These actions apply to local users or federated identities (such as SAML2.0, Google or GitHub providers).

![Disable Users Option](/ui/users-disable-user-action.png)

Bulk actions can be applied to multiple users:

![Bulk Actions](/ui/bulk-actions.png)

_NOTE: disabled users do not count toward your user limit._

## Invite users

_NOTE: You do not need to invite users if your account is setup to authenticate via Google, GitHub or SAML2.0_

Administators can invite one or more users from the following dialog:

![Invite Users Dialog](/ui/invite.png)

After a successful invitation, the user will receive an email with a temporary password. They will need to login to your account to set a new password before they will be able to login.

This option will create a local user account in the system - it will not create accounts in federated Identity Providers.

_NOTE_: if the user being invited (as identified by their email address) already exists in Pactflow, they **will not** receive another email and will now be able to login to your account with their existing credentials.

## User roles

By default, each user is assigned the `Test Maintainer` role. The account creator is also assigned the `Administrator` role. See [Roles and Permissons](/docs/permissions/predefined-roles) for more information.

There are a few options to change a user's roles. The `Make Administrator`/`Remove Administrator` menu items allow the administrator role to be added or removed. `Edit Roles` allows all the roles of a user to be edited. The `Add Role`/`Remove Role` bulk action menu items can add or remove a role from multiple users.

## System accounts

You can have a number of system accounts, based on your plan. System accounts are a type of user account to be used with API
access only. They are primarily for use with CI/CD systems to access Pactflow. From the system account screen (by selecting it from the user type dropdown), you can create new system accounts, disable existing ones and get or renegerate the access tokens for the account. These functions require administrator access. You can also see the last time a token for that account was
used to access any Pactflow API.

![System accounts](/ui/system-accounts.png)

## Federation with Google, GitHub or SAML2.0

Federation allows team members to join your account without being invited - i.e. they will be provisioned into Pactflow on demand, up until your account limit. You can simply share the link to the account `https://<account>.pactflow.io` and they may choose to login with Google, GitHub or your SAML provider.

Other user management features such as team management, roles and the ability to disable users still applies to your federated user.
