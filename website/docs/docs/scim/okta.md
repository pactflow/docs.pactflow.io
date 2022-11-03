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

Follow the Pactflow documentation to setup [an Okta SAML app](/docs/user-interface/settings/authentication#okta).
You need to set the *Provisioning* to *SCIM* under the *App Settings*. 

![Provisioning](/scim/okta-0.png)

Then, in the application administration setting, 
select the *Provisioning* tab. This screen has 3 different setting: *"To App"* to 
configure the resources that Okta will send to Pactflow, *"To Okta"* for importing Pactflow resources into Okta and 
*"Integration"* for configuring the integration settings.

![Provisioning](/scim/okta-1.png)

#### Configure the integration

Select the *"Integration"* item on the left, and then setup the SCIM connection.

![SCIM Connection](/scim/okta-scim-connection.png)

1. SCIM version must be set to 2.0.
2. Base URL is your Pactflow instance domain with `/scim/` appended. **Replace &lt;instance&gt; with your actual instance name.**
3. Set the unique identifier to the Okta `userName` attribute.
4. Depending on the direction you want the resources to flow, select the appropriate checkboxes. You want to at least push new users, new groups and profile updates to Pactflow.
5. Authentication mode must be set to HTTP Header
6. Set the Authorization to Bearer and set it to your Pactflow API token. You should use a [Pactflow Service Account token](/docs/user-interface/settings/users#system-accounts) for this.  

You can now use the *Test Connector Configuration* button to see if you have the values correctly setup.

## Mapping Okta groups to Pactflow teams

Okta groups can be setup to sync to Pactflow as Teams. Than any user added to the Okta group should automatically be
added to the corresponding team in Pactflow.

1. Create the group in Okta.
2. Assign the new group to the Pactflow application. This can be done in either the group's *Applications* tab, or in the Pactflow application *Push Groups* tab.
3. You can test the sync in the Pactflow application *Push Groups* tab.

![Provisioning](/scim/okta-groups.png)

## Mapping Okta users to Pactflow users

### Configuring user roles

