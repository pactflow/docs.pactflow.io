---
title: Integration guide - Okta
---

Okta supports using SCIM to manage users and groups in a configured application. Users can be created, updated or 
disabled via the SCIM API (Okta does not support deleting users). For more details, refer to
[connecting SCIM API to Okta](https://developer.okta.com/docs/guides/scim-provisioning-integration-connect/main/) and the
[Okta SCIM documentation](https://developer.okta.com/docs/concepts/scim/).  

## Setting up a Pactflow app in Okta

Be sure to read [connecting SCIM API to Okta](https://developer.okta.com/docs/guides/scim-provisioning-integration-connect/main/)!

### Configure SCIM provisioning

Follow the Pactflow documentation to setup [an Okta SAML app](/docs/user-interface/settings/authentication#okta). Then, in 
the application administration setting, select the *Provisioning* tab. This screen has 3 different setting: *"To App"* to 
configure the resources that Okta will send to Pactflow, *"To Okta"* for importing Pactflow resources into Okta and 
*"Integration"* for configuring the integration settings.

![Provisioning](/scim/okta-1.png)

#### Configure the integration

Select the *"Integration"* item on the left. Select SCIM as the provisioning to use, and then setup the SCIM connection.

![SCIM Connection](/scim/okta-scim-connection.png)

1. SCIM version must be set to 2.0.
2. Base URL is your Pactflow instance domain with `/scim/` appended. **Replace &lt;instance&gt; with your actual instance name.**
3. Set the unique identifier to the Okta `userName` attribute.
4. Depending on the direction you want the resources to flow, select the appropriate checkboxes. You want to at least push new users, new groups and profile updates to Pactflow.
5. Authentication mode must be set to HTTP Header
6. Set the Authorization to Bearer and set it to your Pactflow API token. You should use a [Pactflow Service Account token](/docs/user-interface/settings/users#system-accounts) for this.  

You can now use the *Test Connector Configuration* button to see if you have the values correctly setup.

## Mapping Okta users to Pactflow users

## Mapping Okta groups to Pactflow teams

## Configuring user roles

