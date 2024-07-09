---
title: System Accounts
---

System accounts are user accounts specifically for API access, primarily used with CI/CD systems to access PactFlow. They are intended for machine-to-machine use. The number of system accounts you can have is based on your plan.

:::info
System accounts are not permitted to be used as a replacement for real users (i.e., people) who work with PactFlow - they must have their own dedicated user account. See the [FAQ](https://pactflow.io/faq/) for more.
:::

From this screen, you can manage the following capabilities:

* View system accounts in your organization, including their team membership, assigned roles, login, and API token activity (all users).
* Create new system accounts for the organization (Administrators only).
* Grant or remove administrator access to system accounts (Administrators only).
* Enable and disable system accounts (Administrators only).
* Delete system accounts (Administrators only).
* Edit system account roles (Administrators only).

![System Accounts Screen](/ui/clarity/settings-system-accounts.png)

1. If the current user is an Administrator, the option to create new system accounts will be presented here.
2. When a single system account is selected, individual system account actions are available to add/remove roles, disable, or delete the system account.
3. When multiple system accounts are selected, these actions may be applied to all selected system accounts.

## Delete and Disable a System Account

You may delete or disable a system account. You can also select the user with the checkbox and use the bulk action menu. A deleted user will no longer appear in the UI and cannot be edited.

Disabled users are hidden by default and can be viewed by checking "Display disabled system accounts," where a disabled user can be re-enabled.

## System Account Roles

By default, each system account is assigned the `CI/CD` role. See [Roles and Permissions](/docs/permissions/predefined-roles) for more information.

There are several options to change a user's role. The `Make Administrator`/`Remove Administrator` menu items allow the administrator role to be added or removed. `Edit Roles` allows all the roles of a user to be edited. The `Add Role`/`Remove Role` bulk action menu items can add or remove a role from multiple users.

## Federation with Google, GitHub, or SAML2.0

System accounts are local accounts and are not connected to social or SSO providers.