---
title: Overview
---

_Eligible plans: Enterprise_

The SCIM 2.0 compatible API manages PactFlow users and teams. For more details on SCIM, refer to https://www.simplecloud.info/.

## Pre-requisites

You must have SAML configured for your PactFlow instance before users can login. See the [SAML documentation](/docs/authentication/main#saml-support) for setup instructions.

:::caution
Users already created via SAML will not be automatically linked to users created via the SCIM integration, even if the email addresses and IDP user identifiers match, resulting in [duplicate users](#duplicate-users). For this reason, if you intend to use SCIM it is recommend to only allow a small number of test users access to your SAML authentication until you have completed the SCIM integration, to reduce the number of users who will need to be cleaned up or migrated afterwards.
:::

## Migrating existing users

Users already created via SAML will not be automatically linked to users created via the SCIM integration, even if the email addresses and IDP user identifiers match. If you would like to migrate existing users previously federated by SAML, please [raise a support ticket](https://support.smartbear.com/pactflow/message) so that we can assist you with this process.

## Integration guides

* [Okta](/docs/scim/okta)

## API

View the SCIM API Documentation in our [API Portal](https://smartbear.portal.swaggerhub.com/pactflow/default/scim-api).

## Troubleshooting

### Duplicate users

After setting up the SCIM and SAML integration, there are duplicate users. This can happen for two reasons:

1. The value given for `userName` does not match the value provided by the IDP in the SAML assertion (`NameID` element). Check the value sent in the SCIM request matches the value sent in the SAML assertion during login (see this [debugging guide](/docs/authentication/main#debugging))
2. Users have been created via SAML prior to the SCIM integration being completed or executed for that user. See [Migrating existing users](#migrating-existing-users) for more details. This problem is not applicable to customers who self host Pactflow (on-premises customers).