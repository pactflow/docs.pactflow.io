---
title: System Accounts
---

System accounts are a type of user account to be used only with API access. They are primarily for use with CI/CD systems to access PactFlow. You can have multiple system accounts, based on your plan. 

From this screen, you can manage the following capabilities:

* See the System Accounts in your organisation as well as their team membership, assigned roles, login and API token activity (all)
* Create new System Accounts for the organisation (Administrators only)
* Grant or remove administrator access to System Accounts (Administrator only)
* Enable and disable System Accounts (Administrator only)
* Delete System Accounts (Administrator only)
* Edit System Account roles (Administrator only)

![System Accounts Screen](/ui/clarity/settings-system-accounts.png)

1. If the current User is an Administrator, the option to create new System Accounts will be presented here.
2. When a single System Account is selected, individual System Account actions are available to add/remove role, disable or delete the System Account.
3. When multiple System Accounts are selected, these actions may be applied to all selected System Accounts


## Delete and Disable a System Account

You may delete or disable a system account. You may also select the user with the checkbox and use the bulk action menu. A deleted user will no longer appear in the UI and cannot be edited. 

Disabled users are hidden by default, and can be viewed by checking "Display disabled system accounts", where a disabled user can be re-enabled. 

## System Account Roles

By default, each System Account is assigned the `CI/CD` role. See [Roles and Permissons](/docs/permissions/predefined-roles) for more information.

There are a few options to change a user's role. The `Make Administrator`/`Remove Administrator` menu items allow administrators role to be added or removed. `Edit Roles` allows all the roles of a user to be edited. The `Add Role`/`Remove Role` bulk action menu items can add or remove a role from multiple users.

## Federation with Google, GitHub or SAML2.0

System Accounts are local accounts, and are not connected to social or SSO providers.