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
added to the corresponding team in Pactflow (if the user has been correctly synced).

1. Create the group in Okta.
2. Assign the new group to the Pactflow application. This can be done in either the group's *Applications* tab, or in the Pactflow application *Push Groups* tab.
3. You can test the sync in the Pactflow application *Push Groups* tab.

![Provisioning](/scim/okta-groups.png)

## Mapping Okta users to Pactflow users

Okta users can be synced to Pactflow by assigning them to the Pactflow app (either directly or via a group that is 
assigned to the Pactflow app). You will have to configure the attributes that get mapped to the Pactflow ones (see 
[Pactflow User attributes](/docs/scim/main#users)) in the *To App* settings of the Pactflow application.

These are required attributes to be set:

![User Attributes](/scim/okta-user-attr.png)

**Note:** The profile attributes can come from both the user's profile and the profiles of the groups they belong to. 

### Configuring user roles

Okta does not support user roles. To get users to have the correct assigned roles, you can either use the [default
role setting](/docs/user-interface/settings/preferences#default-role) in Pactflow to assign a role when the users are
created, or you will have to follow the Okta knowledge base articles: [How to Pass Multivalued Attributes in SCIM User Object](https://support.okta.com/help/s/article/How-to-Pass-Multivalued-Attributes-in-SCIM-User-Object)
and [How to add multi-value roles in SCIM Cloud integration](https://support.okta.com/help/s/article/How-to-add-multivalue-roles-in-SCIM-Cloud-integration).

In essence, for each role you want to have assigned, you will need to:
1. Create an attribute for the role in the Pactflow App Profile using the steps outlined in the knowledge base articles above. 
   Pay special attention to the expressions that the attribute requires.
2. Create an attribute (for either a Group or User profile) in the Okta profile attributes for the role. Assign the role 
   UUID value to this attribute. You can get the role UUID from either the Pactflow Role screen by editing the role and 
   copying the UUID from the URL or from the Pactflow API browser (click on the *API* button at the top right of the 
   Pactflow dashboard and then follow the `pf:admin-roles` link).
3. Map the Okta attribute to the Pactflow app attribute via the *To App* attribute mappings.

#### Role Example

For example, let us setup an Admin attribute that will grant any user it is assigned to the *Administrator* role in Pactflow.

1. Create an attribute in the Pactflow app that targets the *Administrator* role. This is in *Directory -> 
   Profile Editor -> Pactflow App Profile* (or whatever name you gave the app).
2. Set the *External name* to `roles.^[type=='Administrator'].value`.
3. Set the *External namespace* to `urn:ietf:params:scim:schemas:core:2.0:User`.
4. Set the attribute type depending on if you want to assign it directly to a user or via a group they belong to.
5. Make sure to set the *Mutability* to `READ_WRITE`.

Once created it should look something like:

![Admin role attribute](/scim/okta-role-1.png)

Now, we need to create an Okta user attribute for the admin role.

1. Go to *Directory -> Profile Editor -> Okta User*
2. Create a *PactflowAdmin* string attribute.

![Admin Okta attribute](/scim/okta-role-2.png)

Next, we need to map the two attributes via the Pactflow app settings in the *To App* screen.

1. Select the attribute from the list of un-mapped attributes.
2. Set the *Attribute value* to `Map from Okta profile`.
3. Choose the attribute we created above from the dropdown (`pactflowAdmin`).
4. Set *Apply on* to `Create and Update`.

![Attribute mapping](/scim/okta-role-3.png)

Now we just need to assign the Pactflow Administrator role UUID value to a user via their profile, and when they sync, 
they will get the administrator role. Using the Pactflow API browser, I find the Administrator role UUID is 
`cf75d7c2-416b-11ea-af5e-53c3b1a4efd8`. Find the user you want to assign (*Directory -> People*) and edit the attribute
in their *Profile*.

![Assign Attribute](/scim/okta-role-4.png)

It should sync as soon as the profile is updated. If it does not, you can use the *Force Sync* button in the Pactflow 
App Provisioning settings.

You will have to repeat this process for each role you would like to assign.
