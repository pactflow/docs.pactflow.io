---
title: Demo
---

To allow experimentation with Pactflow without the need to configure an external identity provider, the "demo" authentication provider can be enabled. With demo auth enabled, any user can log in to Pactflow by providing a name and email address. No password is used to authenticate the user.

The first user to log in will be assigned the [Administrator](/docs/permissions/predefined-roles#administrator) role, and every user thereafter will receive the default ([User](/docs/permissions/predefined-roles#user)) role.

After a user has logged in, they may perform all the actions their role allows, as if they were a user created via a real identify provider.

:::caution

This method of authentication is NOT secure and should not be used in production.

:::

Demo auth replaces the basic auth capability that was previously used for this purpose.

## Configuration

See the [Demo](/docs/on-premises/environment-variables#demo_auth_enabled) section of the environment variables page. Demo auth cannot be enabled at the same time as any other method of authentication (ie. SAML).

## Converting to a production IDP

Demo authentication cannot be enabled at the same time as a real authentication provider (eg. SAML). We recommend starting with a clean database when installing Pactflow for production use. This will ensure no demo users remain in the system.
