---
title: Authentication with SmartBear ID
sidebar_label: Authentication (SmartBear ID)
---

:::info
This article applies to accounts that use SmartBear ID for authentication. This includes all accounts created on or after Dec 11th 2023. For customers on Cognito see [this guide](./legacy).
:::

To determine which authentication mode is enabled on your account, consult the following table:

| SmartBear ID | Cognito | Both |
|:---:|:--------------:|:--:|
| <img border="1" width="250" src="/ui/login-sbid-only.png" description="Login Screen - SBID" /> | <img border="1" width="250" src="/ui/login-cognito-only.png" description="Login Screen - Cognito" /> | <img border="1" width="250" src="/ui/login-cognito-and-sbid.png" description="Login Screen - Both" />
| If you only see this page when you visit your PactFlow Account, you are fully transitioned to SmartBear ID. | If you see a login page like this, you are on our Cognito authentication. See [this guide](./legacy). | If there is a "SMARTBEAR ID" button on your login screen like this, you have _both_ enabled and are in the process of migrating to SmartBear ID. |

## Account Invitation and Registration

PactFlow users authenticate with SmartBear ID. See the [SmartBear ID Documentation](https://support.smartbear.com/sbid/docs/) to learn about the login process and options. 

Regardless of how a user authenticates, all users must first be _invited_ by a PactFlow administrator before access is granted. See [the guide](/docs/user-interface/settings/users#invite-users) on User Administration. Once a user has been invited, they will receive an invitation email requesting they login or create an account.

## Social Logins

_Eligible plans: all_

SmartBear ID supports social login access via Github, Google and Microsoft. During account registration, the user can choose their preferred login option. 

## SSO with SAML 2.0

_Eligible plans: Enterprise_

PactFlow supports [SAML 2.0](https://en.wikipedia.org/wiki/SAML_2.0) integration with a compatible Identity Provider (IdP) such as Okta, Ping, Auth0, Azure AD, OneLogin etc.

SAML2.0 allows you to externalise the authentication and access to your PactFlow account. Authorization and fine-grained permissions are managed within your account by an account Administrator.

We do not currently support the following:

- Automated user deprovisioning (users will appear "active" and count toward user limits, although will not be able to login if disabled in the IdP)
- IdP initiated login
- Service Provider (SP) initiated logout flow
- SCIM* 

Once SAML 2.0 has been configured on a PactFlow instance, _all_ users for the email domain are forced to authenticate via SAML 2.0, even if they had previously registered a username/password or social login.

## Troubleshooting

### 1. I've enabled SSO, can I disable login via username/password?

Once SSO has been enabled, any users on the registered SAML domain _must_ login using SAML - logging in via email/password or a social login is disabled.

Users not attached to the SAML domain that have been invited may login using any form. Inviting users is controlled by the [`user:invite` permission](https://docs.pactflow.io/docs/permissions/#userinvite), which by default is only available to Administrators. 

We recommend at least one administrative user that can login with username and password in order to address break-glass scenarios (e.g. if your SSO provider is down or misconfigured).

### 2. I'm an enterprise customer and need SCIM enabled

Please contact your Account Manager so that we can enabled our legacy authentication on your account.