---
title: Preferences
---

This screen specifies the PactFlow Preferences panels and what types of settings you can change.

## Personal preferences

These are the settings that affect individual users.

#### Show welcome dialog

This setting controls whether the "Welcome to PactFlow" dialog is shown to the user when they login.

#### Show an alert when my tokens are about to expire

This setting controls whether the token expiry alert is shown to the user on the main dashboard when any of their
API tokens have expired or are within seven days of expiring. This will only occurr if token expiration is enabled
by an administrator in the System preferences.

## System preferences

Theses are global system settings and can only be changed by an administrator.

#### API Token expiration

By default, user and system account tokens don't expire, but can be re-generated at any time to invalidate the old tokens 
and create new ones. This setting enables the tokens to automatically expire after a fixed period of time, which can be
specified in units of hours, days, weeks or months.

Once a token has expired, a new one will need to be generated from the [API Tokens setting page](./api-tokens) (for users) or the [user
management screen](./users#system-accounts) (for system accounts).

#### Display an announcement banner on login

This setting configures an announcement banner to be displayed to all users when they login. The banner content can contain [Markdown
formatted text](https://commonmark.org/help/) (which also supports HTML markup). Note that text will be santised in the UI, so you
can not add any Javascript to the banner.

#### Default Role

The default role to assign new users. If this preference is not set, new users will be assigned the [User](/docs/permissions/predefined-roles#user) role.

#### Default Team

The default team to which new team members will be added. If this preference is not set, new users will be assigned to the system defined team named "[Default team](/docs/user-interface/settings/teams#the-default-team)" if it exists.

#### Operational Notification Contacts

Platform maintenance, operations and security related notifications will be sent to these email addresses. For accounts that existed when this field was added, this has been initialised to the email addresses of the users with the Administrator role. The default value for new accounts will be the email address of the user who created the account. Note that any email address can be set here, the owner of the email address does not need to have a PactFlow account to be be able to receive these notifications.