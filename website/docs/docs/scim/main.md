---
title: API
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

## Supported endpoints

* `/scim/ServiceProviderConfig` -  Specification compliance, authentication schemes, data models
* `/scim/ResourceTypes` - An endpoint used to discover the types of resources available
* `/scim/Schemas` - Introspect resources and attribute extensions
* `/scim/User` - Manage PactFlow users
* `/scim/Groups` - Manage PactFlow teams

## Authentication

The SCIM API endpoints require a Pactflow bearer token. It is recommended to use a 
[PactFlow System Account token](/docs/user-interface/settings/users#system-accounts) for this. This system account is
going to require the `user:invite:*`, `user:manage:*` and `team:manage:*` permissions to be able to create or update those resources. 
Creating a new role with these [permissions](/docs/permissions) and assigning it to the system account is recommended. 

## Resources

SCIM can manage the following resources.:

### Users

The `/scim/Users` endpoint manages PactFlow users. The following SCIM attributes are supported:

| SCIM Attribute                                  | PactFlow User Attribute | Notes                                                                                                                       |
|-------------------------------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| id                                              | uuid                    | Read only                                                                                                                   |
| **userName**                                    | **externalIdpUsername** | This is the unique user ID that the IDP must send via SAML request                                                          |
| externalId                                      | externalIdpId           | External IDP user ID (optional)                                                                                             |
| name.givenName                                  | firstName               |                                                                                                                             |
| name.familyName                                 | lastName                |                                                                                                                             |
| name.formatted                                  | name                    | `name.formatted` takes priority over `displayName`                                                                          | 
| displayName                                     | name                    | `name.formatted` takes priority over `displayName`                                                                          |
| userType                                        | typeDescription or type | userType is mapped to the type on the way in, and typeDescription on the way out                                            |   
| active                                          | active                  |                                                                                                                             |
| email\*.value (email*.primary == true or first) | email                   | Required. The primary email is mapped to the PactFlow email. If no primary email is provided, the first email entry is used | 
| meta.created                                    | createdAt               | read only                                                                                                                   |
| meta.lastModified                               | updatedAt               | read only                                                                                                                   |
| role*.value                                     | _embedded.roles*.uuid   |                                                                                                                             |
| role*.display                                   | _embedded.roles*.name   | read only                                                                                                                   |
| role*.type                                      | _embedded.roles*.name   | read only                                                                                                                   |
| groups*.value                                   | _embedded.teams*.uuid   |                                                                                                                             |
| groups*.display                                 | _embedded.teams*.name   | read only                                                                                                                   |

**Note** that for SAML authentication to work, the `userName` **must be set to the IDP username** for the user, otherwise 
Pactflow will not be able to match the authenticated user with the provisioned user record in Pactflow.

### Teams (as groups)

The `/scim/Groups` endpoint manages PactFlow teams. The following SCIM attributes are supported:

| SCIM Attribute    | PactFlow Team Attribute | Notes     |
|-------------------|-------------------------|-----------|
| id                | uuid                    | read only |
| displayName       | name                    |           |
| meta.created      | createdAt               | read only |
| meta.lastModified | updatedAt               | read only |
| members*.value    | _embedded.members*.uuid |           |
| members*.display  | _embedded.members*.name | read only |

## Troubleshooting

### Duplicate users

After setting up the SCIM and SAML integration, there are duplicate users. This can happen for two reasons:

1. The value given for `userName` does not match the value provided by the IDP in the SAML assertion (`NameID` element). Check the value sent in the SCIM request matches the value sent in the SAML assertion during login (see this [debugging guide](/docs/authentication/main#debugging))
2. Users have been created via SAML prior to the SCIM integration being completed or executed for that user. See [Migrating existing users](#migrating-existing-users) for more details. This problem is not applicable to customers who self host Pactflow (on-premises customers).