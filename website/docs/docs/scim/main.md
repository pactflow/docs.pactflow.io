---
title: API
---

_Eligible plans: Enterprise_

**NOTE: SAML is a pre-requisite for this feature to work.**

Pactflow users and teams can be managed via a SCIM 2.0 compatible API. For details on SCIM, refer to https://www.simplecloud.info/.

## Integration guides

* [Okta](./okta)

## Supported endpoints

* `/scim/ServiceProviderConfig` -  Specification compliance, authentication schemes, data models
* `/scim/ResourceTypes` - An endpoint used to discover the types of resources available
* `/scim/Schemas` - Introspect resources and attribute extensions
* `/scim/User` - Manage Pactflow users
* `/scim/Groups` - Manage Pactflow teams

## Resources

The following resources can be managed via SCIM:

### Users

The `/scim/Users` endpoint manages Pactflow users. The following SCIM attributes are supported:

| SCIM Attribute                                  | Pactflow User Attribute | Notes                                                                                                                       |
|-------------------------------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| id                                              | uuid                    | Read only                                                                                                                   |
| userName                                        | externalIdpUsername     | This is the unique user ID that the IDP must send via SAML request                                                          |
| externalId                                      | externalIdpId           | External IDP user ID (optional)                                                                                             |
| name.givenName                                  | firstName               |                                                                                                                             |
| name.familyName                                 | lastName                |                                                                                                                             |
| name.formatted                                  | name                    | `name.formatted` takes priority over `displayName`                                                                          | 
| displayName                                     | name                    | `name.formatted` takes priority over `displayName`                                                                          |
| userType                                        | typeDescription or type | userType is mapped to the type on the way in, and typeDescription on the way out                                            |   
| active                                          | active                  |                                                                                                                             |
| email\*.value (email*.primary == true or first) | email                   | Required. The primary email is mapped to the Pactflow email. If no primary email is provided, the first email entry is used | 
| meta.created                                    | createdAt               | read only                                                                                                                   |
| meta.lastModified                               | updatedAt               | read only                                                                                                                   |
| role*.value                                     | _embedded.roles*.uuid   |                                                                                                                             |
| role*.display                                   | _embedded.roles*.name   | read only                                                                                                                   |
| role*.type                                      | _embedded.roles*.name   | read only                                                                                                                   |
| groups*.value                                   | _embedded.teams*.uuid   |                                                                                                                             |
| groups*.display                                 | _embedded.teams*.name   | read only                                                                                                                   |

### Teams (as groups)

The `/scim/Groups` endpoint manages Pactflow teams. The following SCIM attributes are supported:

| SCIM Attribute    | Pactflow Team Attribute | Notes     |
|-------------------|-------------------------|-----------|
| id                | uuid                    | read only |
| displayName       | name                    |           |
| meta.created      | createdAt               | read only |
| meta.lastModified | updatedAt               | read only |
| members*.value    | _embedded.members*.uuid |           |
| members*.display  | _embedded.members*.name | read only |
