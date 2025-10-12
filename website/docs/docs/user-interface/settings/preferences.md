---
title: Preferences
---

In this screen, you can see which settings you can modify in PactFlow Preferences panels. There are two types of preferences:

## Personal preferences

![Preferences Screen](/ui/clarity/settings-preferences.png)

These are the settings that affect individual users.

#### Show an alert when my tokens are about to expire

This setting determines if the user sees the token expiry alert on the main dashboard for any API tokens that are either expired or expiring within seven days. An administrator must enable token expiration in the System preferences for this to happen.

## System preferences

![System Preferences Screen](/ui/clarity/settings-preferences-system.png)

These are global system settings and can only be changed by an administrator.

#### API Token expiration

By default, user and system account tokens don't expire, but can be re-generated at any time to invalidate the old tokens and create new ones. This setting enables tokens to automatically expire after a fixed period of time, which can be specified in units of hours, days, weeks or months.

After a token expires, the users can generate a new one from the [API Tokens setting page](./api-tokens), while users with the appropriate `system_account:manage` permission can regenerate system account tokens from the [user
management screen](./users#system-accounts).

#### Display an announcement banner on login

This setting allows for an announcement banner to appear when users log in, with [Markdown
formatted text](https://commonmark.org/help/) (which also supports HTML markup). Note that text will be santized in the UI, so you can not add any Javascript to the banner.

#### Default Role

This preference determines the default role assigned to new users, based on their seat type.

- If not set, new users with the **Editor** seat type are assigned the [User](/docs/permissions/predefined-roles#user) role.
- If not set, new users with the **Viewer** seat type are assigned the [Viewer](/docs/permissions/predefined-roles#viewer) role.

#### Default Team

This preference sets the default team for new team members. If it is not set, new users will be added to the "[Default team](/docs/user-interface/settings/teams#the-default-team)" if it exists.

#### Operational Notification Contacts

This field specifies the email addresses that will receive notifications about platform maintenance, operations, and security issues. 

For existing accounts, the email addresses of users with the Administrator role have been initialized as the default. For new accounts, the default will be the email address of the account creator. 

Note: Any email address can be added to this field. The owner of the email address does not need to have a PactFlow account.

#### Consolidate User Logins by Email

Allow users to be linked to different identity providers via their email address. When enabled, logins from different identity providers will be considered the same user if they have the same email address.

This setting does not affect existing users that have previously logged in and have a stored identity. To fix this, see the troubleshooting article on [duplicate users](/docs/authentication/legacy#4-ive-added-an-identity-provider-and-see-duplicate-users).

:::warning
Do not enable this setting unless you can guarantee the identity providers you use validate the user's email address.
:::