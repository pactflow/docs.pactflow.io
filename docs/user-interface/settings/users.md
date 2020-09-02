---
title: Users
---

Our User Management featue allows you manage the following capabilities:

* See the users in their team as well as their login activity (all)
* Invite new users to join the team (Administrator only)
* Grant Administrator access to other users (Administrator only)
* Enable and disable users (Administrator only)

_NOTE: by default, the Administrator of the account is automatically set to the account creator._

![User Management Screen](assets/ui/users.png)

**1**
The current plan details are displayed, alongside remaining user seat limits.

**2**
If the current user is an Administrator, the option to invite new users will be presented here.

**3**
Current active and disabled users


#### Enabling and Disabling Users

You may disable (or enable) a user by choosing the action via the `"..."` menu. This action applies to local users or federated identities (such as SAML2.0, Google or GitHub providers).

![Disable Users Option](assets/ui/users-disable-user-action.png)

_NOTE: disabled users do not count toward your user limit._

#### Invite users

Administators can invite one or more users from the following dialog:

![Invite Users Dialog](assets/ui/invite.png)

After a successful invitation, the user will receive an email with a temporary password. They will need to login to your account to set a new password before they will be able to login.

This option will create a local user account in the system - it will not create accounts in federated Identity Providers.

_NOTE_: if the user being invited (as identified by their email address) already exists in Pactflow, they **will not** receive another email and will now be able to login to your account with their existing credentials.