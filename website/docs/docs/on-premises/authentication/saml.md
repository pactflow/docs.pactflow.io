---
title: SAML
---

## Configuration

A SAML provider is configured by a set of environment variables prefixed with `PACTFLOW_SAML_`. See the [SAML](/docs/on-premises/environment-variables#saml-authentication) section of the environment variables page for the full list.

## Callback URL

The callback URL is `https://<your Pactflow host>/auth/saml/callback`

## Metadata URL

The Pactflow SAML service provider metadata URL is available at `https://<your Pactflow host>/auth/saml/metadata`.

## Configuring multiple SAML providers

In Pactflow 1.7.0 and later, multiple SAML providers may be configured. To configure a second SAML provider, create another set of the [SAML environment variables](/docs/on-premises/environment-variables#saml-authentication) with the prefix `PACTFLOW_SAML_2_` (and `PACTFLOW_SAML_3_` for the third, etc). The `PACTFLOW_SAML_ISSUER` does not need to be specified again, as it is shared between all SAML providers.

The callback path for the second provider is `/auth/saml/2/callback`, and for the third `/auth/saml/3/callback` etc. The path for the metadata for subsequent SAML providers will be `/auth/saml/2/metadata`, `/auth/saml/3/metadata` etc.

## Configuring Azure Active Directory

### Create a non gallery application

* Follow the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-non-gallery-app) for creating a non gallery application.
  * Choose `Non-gallery application` at the `Add your own app` screen.
  * Set the name to `Pactflow On-Premesis` when prompted.

* When the application has been created, assign the users that should be allowed to login to Pactflow.

* Once the users have been assigned, select the `Single sign-on` tab. Select `SAML`.

* Set the Identifier (Entity ID) to `https://pactflow.<your company domain>` eg. `https://pactflow.mycompany.com`. This field must match the [PACTFLOW_SAML_ISSUER]../(environment-variables#pactflow_saml_issuer) environment variable.

* Set the Reply URL to `https://<your Pactflow host>/auth/saml/callback`

* Leave the Sign On URL, Relay State and Logout Url fields blank.

### Configure the Pactflow environment variables

You can find a template for the required environment variables [here](../environment-variables/templates#azure-active-directory).

* Set the [PACTFLOW_SAML_ISSUER](../environment-variables#pactflow_saml_issuer) to the `Identifier (Entity ID)`.
* Set the [PACTFLOW_SAML_IDP_SSO_TARGET_URL](../environment-variables#pactflow_saml_idp_sso_target_url) to the `Login URL`.
* Set the [PACTFLOW_SAML_IDP_ENTITY_ID](../environment-variables#pactflow_saml_idp_entity_id) to the `Azure AD Identifier`
* Set the [PACTFLOW_SAML_IDP_CERT_FINGERPRINT](../environment-variables#pactflow_saml_idp_cert_fingerprint) to the `Thumbprint`
* Set the [PACTFLOW_SAML_IDP_NAME](../environment-variables#pactflow_saml_idp_name) to your choice - this is a display name for the login button.
* Set the identifier, email and name attributes as per the [template](../environment-variables/templates#azure-active-directory).
