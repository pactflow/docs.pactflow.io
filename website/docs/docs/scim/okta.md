---
title: Integration guide - Okta
---

Okta supports using SCIM to manage users and groups in a configured application. Users can be created, updated, or disabled via the SCIM API (Okta does not support deleting users). For more details, refer to
[connecting SCIM API to Okta](https://developer.okta.com/docs/guides/scim-provisioning-integration-connect/main/) and the [Okta SCIM documentation](https://developer.okta.com/docs/concepts/scim/).  

## Setting up a PactFlow app in Okta

Check out the official Okta guide on [connecting the SCIM API](https://developer.okta.com/docs/guides/scim-provisioning-integration-connect/main/)!

### Configure SCIM provisioning

Follow the PactFlow documentation to setup [an Okta SAML app](/docs/user-interface/settings/authentication#okta).
You need to set *Provisioning* to *SCIM* under *App Settings*. 

![Provisioning](/scim/okta-0.png)

Then, in the application administration settings, select the *Provisioning* tab. This screen has 3 different settings: *"To App"* to configure the resources that Okta will send to PactFlow, *"To Okta"* for importing PactFlow resources into Okta and *"Integration"* for configuring the integration settings.

![Provisioning](/scim/okta-1.png)

#### Configure the integration

Select the *"Integration"* item on the left, and then setup the SCIM connection.

![SCIM Connection](/scim/okta-scim-connection.png)

1. SCIM version must be set to 2.0.
2. The base URL is your PactFlow instance domain with `/scim/` appended. **Replace &lt;instance&gt; with your actual instance name.**
3. Set the unique identifier to the Okta `userName` attribute. **It is important that this value is the same value that is passed in via the SAML authentication call.** 
4. Depending on the direction you want resources to flow, select the appropriate checkboxes. You want to push new users, new groups, and profile updates to PactFlow.
5. Authentication mode must be set to HTTP Header
6. Set the Authorization to Bearer with your PactFlow API token. You should use a [PactFlow System Account token](/docs/user-interface/settings/users#system-accounts) for this.
   The system account must be assigned the [SCIM role](/docs/permissions/predefined-roles#scim) to be able to access the required PactFlow SCIM resources.

You can now use the *Test Connector Configuration* button to see if you have the values correctly setup.

## Mapping Okta groups to PactFlow teams

Okta groups can be setup to sync with PactFlow as Teams. Then any user added to the Okta group should automatically be
added to the corresponding team in PactFlow (if the user has been correctly synced).

1. Create the group in Okta.
2. Assign the new group to the PactFlow application. This can be done in either the group's *Applications* tab, or in the PactFlow application's *Push Groups* tab.
3. You can test the sync in the PactFlow application's *Push Groups* tab.

![Provisioning](/scim/okta-groups.png)

## Mapping Okta users to PactFlow users

Okta users can be synced to PactFlow by assigning them to the PactFlow app (either directly or via a group assigned to the PactFlow app). You will have to configure the attributes that get mapped to the PactFlow ones (see [PactFlow User attributes](/docs/scim/main#users)) in the *To App* settings of the PactFlow application.

The required attributes to be set are as follows:

![User Attributes](/scim/okta-user-attr.png)

**Note:** The profile attributes can come from both the user's profile and the profiles of the groups they belong to. 

### Configuring user roles

Okta does not support user roles. To get users to have the correct assigned roles, you can either use the [default
role setting](/docs/user-interface/settings/preferences#default-role) in PactFlow to assign a role when the users are
created, or you will have to follow the Okta knowledge base articles: [How to Pass Multivalued Attributes in SCIM User Object](https://support.okta.com/help/s/article/How-to-Pass-Multivalued-Attributes-in-SCIM-User-Object)
and [How to add multi-value roles in SCIM Cloud integration](https://support.okta.com/help/s/article/How-to-add-multivalue-roles-in-SCIM-Cloud-integration).

In essence, for each role you want assigned, you will need to:
1. Create an attribute for the role in the PactFlow App Profile using the steps outlined in the knowledge base articles above. 
   Pay special attention to the expressions that the attribute requires.
2. Create an attribute (for either a Group or User profile) in the Okta profile attributes for the role. Assign the role 
   UUID value to this attribute. You can get the role UUID from either the PactFlow Role screen by editing the role and 
   copying the UUID from the URL or from the PactFlow API browser (click on the *API* button at the top right of the 
   PactFlow dashboard and then follow the `pf:admin-roles` link).
3. Map the Okta attribute to the PactFlow app attribute via the *To App* attribute mappings.

#### Role Example

For example, let us setup an Admin attribute that grants any user it is assigned to the *Administrator* role in PactFlow.

1. Create an attribute in the PactFlow app that targets the *Administrator* role. This is in *Directory -> 
   Profile Editor -> PactFlow App Profile* (or whatever name you give the app).
2. Set the *External name* to `roles.^[type=='Administrator'].value`.
3. Set the *External namespace* to `urn:ietf:params:scim:schemas:core:2.0:User`.
4. Set the attribute type depending on if you want to assign it directly to a user or via a group they belong to.
5. Make sure to set *Mutability* to `READ_WRITE`.

Once created it should look something like:

![Admin role attribute](/scim/okta-role-1.png)

Now, we need to create an Okta user attribute for the admin role.

1. Go to *Directory -> Profile Editor -> Okta User*
2. Create a *PactflowAdmin* string attribute.

![Admin Okta attribute](/scim/okta-role-2.png)

Next, we need to map the two attributes via the PactFlow app settings in the *To App* screen.

1. Select the attribute from the list of un-mapped attributes.
2. Set the *Attribute value* to `Map from Okta profile`.
3. Choose the attribute we created above from the dropdown (`pactflowAdmin`).
4. Set *Apply on* to `Create and Update`.

![Attribute mapping](/scim/okta-role-3.png)

Now we just need to assign the PactFlow Administrator role UUID value to a user via their profile. When they sync, they will get the administrator role. Using the PactFlow API browser, I found the Administrator role UUID is 
`cf75d7c2-416b-11ea-af5e-53c3b1a4efd8`. Find the user you want to assign (*Directory -> People*) and edit the attribute
in their *Profile*.

![Assign Attribute](/scim/okta-role-4.png)

It should sync as soon as the profile is updated. If it does not, you can use the *Force Sync* button in the PactFlow 
App Provisioning settings.

You will have to repeat this process for each role you would like to assign.
