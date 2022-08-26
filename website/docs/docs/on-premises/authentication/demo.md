---
title: Demo
---

To allow experimentation with Pactflow without the need to configure an external identify provider, the "demo" authentication provider can be enabled. With demo auth enabled, any user can log in to Pactflow by providing a name and email address. No password is used to authenticate the user.

The first user to log in will be assigned the [Administrator](/docs/permissions/predefined-roles#administrator) role, and every user thereafter will receive the default ([User](/docs/permissions/predefined-roles#user)) role.

After a user has logged in, they may perform all the actions their role allows, as if they were a user created via a real identify provider.

:::caution

This method of authentication is NOT secure and should not be used in production.

:::

## Configuration

See the [Demo](/docs/on-premises/environment-variables#demo_auth_enabled) section of the environment variables page.

## Converting to a production IDP

We recommend starting with a clean database when installing Pactflow for production use. This will ensure no demo users will remain in the system.
