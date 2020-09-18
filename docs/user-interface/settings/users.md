---
title: Users
---

Our User Management featue allows you manage the following capabilities:

* See the users in their team as well as their login activity (all)
* Invite new users to join the team (Administrator only)
* Grant or remove administrator access for other users (Administrator only)
* Enable and disable users (Administrator only)
* Create system accounts (Administrator only)

_NOTE: by default, the Administrator of the account is automatically set to the account creator._

![User Management Screen](assets/ui/users.png)

**1**
The current plan details are displayed, alongside remaining user seat and system account limits.

**2**
If the current user is an Administrator, the option to invite new users will be presented here.

**3**
Change to view between active users, system accounts and disabled users here.


## Enabling and Disabling Users

You may disable (or enable) a user by choosing the action via the `"..."` menu. This action applies to local users or federated identities (such as SAML2.0, Google or GitHub providers).

![Disable Users Option](assets/ui/users-disable-user-action.png)

_NOTE: disabled users do not count toward your user limit._

## Invite users

Administators can invite one or more users from the following dialog:

![Invite Users Dialog](assets/ui/invite.png)

After a successful invitation, the user will receive an email with a temporary password. They will need to login to your account to set a new password before they will be able to login.

This option will create a local user account in the system - it will not create accounts in federated Identity Providers.

_NOTE_: if the user being invited (as identified by their email address) already exists in Pactflow, they **will not** receive another email and will now be able to login to your account with their existing credentials.

## System accounts

You can have a number of system accounts, based on your plan. System accounts are a type of user account to be used with API
access only. They are primarily for use with CI/CD systems to access Pactflow. From the system account screen (by selecting it from the user type dropdown), you can create new system accounts, disable existing ones and get or renegerate the access tokens for the account. These functions require administrator access. You can also see the last time a token for that account was
used to access any Pactflow API.

![System accounts](assets/ui/system-accounts.png)
