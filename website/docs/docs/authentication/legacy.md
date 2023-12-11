---
title: Authentication
sidebar_label: Authentication (Cognito)
---

:::info
This article applies to accounts that use Cognito for authentication. This includes all accounts before Dec 11th 2023. For customers on SmartBear ID see [this guide](./main).
:::

To determine which authentication mode is enabled on your account, consult the following table:

| SmartBear ID | Cognito | Both |
|:---:|:--------------:|:--:|
| <img border="1" width="250" src="/ui/login-sbid-only.png" description="Login Screen - SBID" /> | <img border="1" width="250" src="/ui/login-cognito-only.png" description="Login Screen - Cognito" /> | <img border="1" width="250" src="/ui/login-cognito-and-sbid.png" description="Login Screen - Both" />
| If you only see this page when you visit your PactFlow Account, you are fully transitioned to SmartBear ID. See [this guide](./main).  | If you see a login page like this, you are on our Cognito authentication. | If there is a "SMARTBEAR ID" button on your login screen like this, you have _both_ enabled and are in the process of migrating to SmartBear ID. |

To make it simpler to access PactFlow, we've rolled out Single Sign On (SSO) authentication with Github, Google and SAML2.0.

## How it works

SSO users are automatically provisioned when they first authenticate.

**NOTE:** &nbsp; Changing these settings may require users to do a hard refresh in their browser (CTRL-F5 on Windows and Linux, CMD-R on Mac OSX) before the next time they try to login, or clear their browser cookies and cache.

## Prerequisites

If you are migrating to Single Sign On from username/password based authentication, you should consider enabling merging of identities based on email address, via the ["Consolidate User Logins by Email" system preference](/docs/user-interface/settings/preferences#consolidate-user-logins-by-email), otherwise you will end up with duplicate users.

## GitHub Authentication

_Eligible plans: all_

For GitHub authentication, you need to configure the GitHub organisations that you want users who belong to be able to log into your broker instance.

Steps to configure

1. Navigate to the Authentication settings page and add the name of the Github organization(s) that should be granted access (_hint_: given this project URL the name should be `pactflow`: github.com/pactflow/example-project). Make sure you get the case right, as the name will need to match exactly.
1. Press the Save button.
1. After configuring Github, you will need to log out.
1. Once logged out navigate back to your login screen. You should now have a Github option.
1. Login with the new Github option.
1. On the first authentication attempt, it will require Github authorization. Follow the in-app prompts to guide you.

![GitHub Authentication Settings](/ui/github-auth.png)

### Troubleshooting

#### Seeing error "None of your GitHub organizations have been registered with PactFlow." when trying to log in

There are multiple reasons why this error may be shown.

##### You may not have clicked "Grant" or "Request" for that organization on the GitHub PactFlow Authorize screen

To fix this, log out of PactFlow, go to https://github.com/settings/applications. Revoke PactFlow access, then log in again. You will be given the opportunity to grant or request access to your organization again during the login flow.


##### If you clicked "Request", you may need to ask an administrator to approve the authorization

To fix this, please contact your organization's GitHub administrator, and ask that they follow these instructions to approve PactFlow https://help.github.com/en/articles/approving-oauth-apps-for-your-organization

##### You may have previously authenticated to PactFlow with GitHub, but joined the organization since doing so

To fix this, log out of PactFlow, go to https://github.com/settings/applications. Revoke PactFlow access, then log in again. You will be given the opportunity to grant or request access to your organization again during the login flow.

##### You are not a member of any organizations

Please read https://help.github.com/en/articles/creating-a-new-organization-from-scratch for instructions on creating a GitHub organization.

#### Name is not populated after signing in

* Ensure that you have given the PactFlow application permisson to read personal information. To check this:
  * Open https://github.com/settings/applications in a browser.
  * Click on the `PactFlow` application shown in the list.
  * Under the `Permissions` section, you should see a tick next to `Read all user profile data`.
* If you have already given this permission, and you still see no name populated in PactFlow, check that you have set a name in your public profile.
  * Go to `https://github.com/{your-github-username}` in a browser.
  * Click the `Edit profile` button shown underneath your avatar on the left of the page.
  * Enter a value in the `Name` field.
  * Open a new browser window that has no cookies shared from your previous PactFlow login (clear all your cookies or use an incognito window) and log in to PactFlow again. It should take you through the GitHub login screens - if not, then it's re-using your previous session details, and you need to clear your cookies and try again.
  * Once you have successfully logged in to PactFlow again, you should see your name populated in PactFlow.

## Google Authentication

_Eligible plans: all_

For Google authentication, you must configure one or more [hosted domains](https://support.google.com/domains/answer/6069226?hl=en-GB) for the users that will log into your PactFlow account. On your next login, you will see an option to login with Google has been added. Any users who have a valid identity for the hosted domain can login to your PactFlow instance.

For example, if you use Google Workspace as your choice of email provider and your email is `matt@pactflow.io`, the hosted domain might be `pactflow.io`. 

You can also use any valid Google or Gmail email address, such as `matt@gmail.com` or `matt@pactflow.io`. This limits the authentication to a single user.

![Google Authentication Settings](/ui/google-auth.png)

## SAML Support

_Eligible plans: Enterprise_

PactFlow supports [SAML 2.0](https://en.wikipedia.org/wiki/SAML_2.0) integration with a compatible Identity Provider (IdP) such as Okta, Ping, Auth0, Azure AD, OneLogin etc.

SAML2.0 allows you to externalise the authentication and access to your PactFlow account. Authorization and fine-grained permissions are managed within your account by an account Administrator.

Supported capabilities:

- Authorization from an external IdP
- SP initiated login
- [SCIM](/docs/scim/main)

We do not currently support the following:

- Automated user provisioning into your account (Users must first be invited)
- Automated user deprovisioning (users will appear "active" and count toward user limits, although will not be able to login if disabled in the IdP)
- IdP initiated login
- Service Provider (SP) initiated logout flow

### Setup

#### 1. Configure PactFlow as a Service Provider in your IdP

In your IdP, create a new Service Provider with the following properties:

- Audience URI (SP Entity ID): `urn:amazon:cognito:sp:ap-southeast-2_x0L1olP0D`
- Single sign on URL (Reply URL): `https://pact-saas-prod-1.auth.ap-southeast-2.amazoncognito.com/saml2/idpresponse`
- Name ID format must be set to "Persistent": `urn:oasis:names:tc:SAML:2.0:nameid-format:persistent`

#### 2. Map the required SAML2.0 attributes

The following attributes are required by PactFlow and must be mapped in your IdP to be sent through during the authentication flow:

| Property to map from your IDP | Attribute Name in SAML Assertion                                     | Name Format   |
| ----------------------------- | -------------------------------------------------------------------- | ------------- |
| First Name                    | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname`    | URI Reference |
| Last Name                     | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`      | URI Reference |
| Email Address                 | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` | URI Reference |

For example, a valid Attribute in the SAML assertion for a user's first name would look like this:

```
<Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">
  <AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">Joe</AttributeValue>
</Attribute>
```

#### 3. Export IdP metadata

Once you have configured PactFlow as a Service Provider, please send your PactFlow account details and an externally accessible URL to the metadata file via our [support form](https://support.smartbear.com/pactflow/message/). If it is not possible to provide a URL, the metadata may be exported as an XML file. It is preferable to use a URL, as this will allow you to make any updates without contacting PactFlow support.

### Examples

The following can be used to compare against your own IdP setup to check if you're missing anything. Note these were both produced via Okta.

#### Example of valid metadata document

```xml
<?xml version="1.0" encoding="UTF-8"?>
<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="http://www.okta.com/exkpvtn73rd6mMmF34x6">
   <md:IDPSSODescriptor WantAuthnRequestsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
      <md:KeyDescriptor use="signing">
         <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <ds:X509Data>
               <ds:X509Certificate>MIIDpDCCAoygAwIBAgIGAXPl6shZMA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG
A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU
MBIGA1UECwwLU1NPUHJvdmlkZXIxEzARBgNVBAMMCmRldi04OTA1NTYxHDAaBgkqhkiG9w0BCQEW
DWluZm9Ab2t0YS5jb20wHhcNMjAwODEzMDM0MjU1WhcNMzAwODEzMDM0MzU1WjCBkjELMAkGA1UE
BhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNV
BAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRMwEQYDVQQDDApkZXYtODkwNTU2MRwwGgYJ
KoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
mgdKOOa+KPUYuCXNl6ab/1AgaRIzxjvXxyEjAceLig4ljsgRVawo5F8CG2JMa2anejfJdHsu/sNo
SORi59V9MSYso8mH2krRNKkAiMWwXO6ncvHxwWJsZqPnuDMPhU+vhCbxAg9zSKgnuhW/Li/qs16x
IDjmJFUXMSksbC9wEmrHw1hR8Zl94L0lwcTLwVeQtTZ3pfpDN4HT84wA/lc1sn/heXyikv1fgP1E
onpbsQXuFjw9vQT7UekAjeYi0cVTX0wVZ3WKob62v5zJZhFkVrdDbJ7Zsg9sGwXom3RpKcLEw/vo
PcSc69ARiCkHY4fhOSykkFottLh/xsTp0Pw3UQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAEoVfX
8yda3v4s/28nPpy0g+m1oXduagcYKFjCWg7Wou7G47Li8k2Xcm1Ck+gMvDn10dzHq2+RBKwBs59d
msqk2Pq8pI9C5Cp2f7Ad+or3XhpWa4IKQjVvGt1vV2WCasEPHwL+1a9Alhg47x/GmoYoMRHaT7fG
+a3ZYe+QF5cIGFyWj5QxUkKcD/FE37N2DQuPQOzOHDYe9BQCi/FFC2GarpiGIgPQd9RDjsTDpFKC
t9lzfbF/65I6ISDB5TQyCaLvSf8cofivLe3EQpw0sZ97fLi7VOlOY888elByNALcl5rf7qLuh/gP
Oiv9B1SsJ0l/zk0FxwLCCKFGXn1RSV8/</ds:X509Certificate>
            </ds:X509Data>
         </ds:KeyInfo>
      </md:KeyDescriptor>
      <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
      <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:persistent</md:NameIDFormat>
      <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://dev-890556.okta.com/app/pactflowdev890556_pactflow_1/exkpvtn73rd6mMmF34x6/sso/saml" />
      <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://dev-890556.okta.com/app/pactflowdev890556_pactflow_1/exkpvtn73rd6mMmF34x6/sso/saml" />
   </md:IDPSSODescriptor>
</md:EntityDescriptor>
```

This is the assertion sent to the PactFlow Reply URL

```xml
<?xml version="1.0" encoding="UTF-8"?>
<saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:xs="http://www.w3.org/2001/XMLSchema" Destination="https://pact-saas-prod-1.auth.ap-southeast-2.amazoncognito.com/saml2/idpresponse" ID="id3718331499099330736053153" InResponseTo="_125f72fb-e3bf-40d0-ba42-77152c2c0845" IssueInstant="2020-08-19T03:26:29.364Z" Version="2.0">
  <saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">http://www.okta.com/exkpvtn73rd6mMmF34x6</saml2:Issuer>
  <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
    <ds:SignedInfo>
      <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
      <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256" />
      <ds:Reference URI="#id3718331499099330736053153">
        <ds:Transforms>
          <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
          <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
            <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="xs" />
          </ds:Transform>
        </ds:Transforms>
        <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />
        <ds:DigestValue>uJgujmj ... 26En8=</ds:DigestValue>
      </ds:Reference>
    </ds:SignedInfo>
    <ds:SignatureValue>S/xuVKLEfmIj2I0+Vjvr ... 29vtaSKQkHeQMwCpSUfKIIoZ/OlnDQ==</ds:SignatureValue>
    <ds:KeyInfo>
      <ds:X509Data>
        <ds:X509Certificate>MIIDpDCCAoygAwIBAgIGAXPl6shZMA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU MBIGA1UECwwLU1NPUHJvdmlkZXIxEzARBgNVBAMMCmRldi04OTA1NTYxHDAaBgkqhkiG9w0BCQEW DWluZm9Ab2t0YS5jb20wHhcNMjAwODEzMDM0MjU1WhcNMzAwODEzMDM0MzU1WjCBkjELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRMwEQYDVQQDDApkZXYtODkwNTU2MRwwGgYJ KoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmgdKOOa+KPUYuCXNl6ab/1AgaRIzxjvXxyEjAceLig4ljsgRVawo5F8CG2JMa2anejfJdHsu/sNoSORi59V9MSYso8mH2krRNKkAiMWwXO6ncvHxwWJsZqPnuDMPhU+vhCbxAg9zSKgnuhW/Li/qs16x IDjmJFUXMSksbC9wEmrHw1hR8Zl94L0lwcTLwVeQtTZ3pfpDN4HT84wA/lc1sn/heXyikv1fgP1EonpbsQXuFjw9vQT7UekAjeYi0cVTX0wVZ3WKob62v5zJZhFkVrdDbJ7Zsg9sGwXom3RpKcLEw/voPcSc69ARiCkHY4fhOSykkFottLh/xsTp0Pw3UQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAEoVfX 8yda3v4s/28nPpy0g+m1oXduagcYKFjCWg7Wou7G47Li8k2Xcm1Ck+gMvDn10dzHq2+RBKwBs59dmsqk2Pq8pI9C5Cp2f7Ad+or3XhpWa4IKQjVvGt1vV2WCasEPHwL+1a9Alhg47x/GmoYoMRHaT7fG+a3ZYe+QF5cIGFyWj5QxUkKcD/FE37N2DQuPQOzOHDYe9BQCi/FFC2GarpiGIgPQd9RDjsTDpFKt9lzfbF/65I6ISDB5TQyCaLvSf8cofivLe3EQpw0sZ97fLi7VOlOY888elByNALcl5rf7qLuh/gPOiv9B1SsJ0l/zk0FxwLCCKFGXn1RSV8/</ds:X509Certificate>
      </ds:X509Data>
    </ds:KeyInfo>
  </ds:Signature>
  <saml2p:Status>
    <saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success" />
  </saml2p:Status>
  <saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" ID="id37183314991817892005295917" IssueInstant="2020-08-19T03:26:29.364Z" Version="2.0">
    <saml2:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">http://www.okta.com/exkpvtn73rd6mMmF34x6</saml2:Issuer>
    <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
      <ds:SignedInfo>
        <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
        <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256" />
        <ds:Reference URI="#id37183314991817892005295917">
          <ds:Transforms>
            <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
            <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
              <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="xs" />
            </ds:Transform>
          </ds:Transforms>
          <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />
          <ds:DigestValue>UTRr45 ... 7drNjg2E=</ds:DigestValue>
        </ds:Reference>
      </ds:SignedInfo>
      <ds:SignatureValue>a7SSAhT+xjgmwq0d+y6 ... 3Wzt+9g3sIeOuz30MuDn+kUjqs1w==</ds:SignatureValue>
      <ds:KeyInfo>
        <ds:X509Data>
          <ds:X509Certificate>MIIDpDCCAoygAwIBAgIGAXPl6shZMA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU MBIGA1UECwwLU1NPUHJvdmlkZXIxEzARBgNVBAMMCmRldi04OTA1NTYxHDAaBgkqhkiG9w0BCQEW DWluZm9Ab2t0YS5jb20wHhcNMjAwODEzMDM0MjU1WhcNMzAwODEzMDM0MzU1WjCBkjELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRMwEQYDVQQDDApkZXYtODkwNTU2MRwwGgYJ KoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmgdKOOa+KPUYuCXNl6ab/1AgaRIzxjvXxyEjAceLig4ljsgRVawo5F8CG2JMa2anejfJdHsu/sNoSORi59V9MSYso8mH2krRNKkAiMWwXO6ncvHxwWJsZqPnuDMPhU+vhCbxAg9zSKgnuhW/Li/qs16x IDjmJFUXMSksbC9wEmrHw1hR8Zl94L0lwcTLwVeQtTZ3pfpDN4HT84wA/lc1sn/heXyikv1fgP1EonpbsQXuFjw9vQT7UekAjeYi0cVTX0wVZ3WKob62v5zJZhFkVrdDbJ7Zsg9sGwXom3RpKcLEw/voPcSc69ARiCkHY4fhOSykkFottLh/xsTp0Pw3UQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAEoVfX8yda3v4s/28nPpy0g+m1oXduagcYKFjCWg7Wou7G47Li8k2Xcm1Ck+gMvDn10dzHq2+RBKwBs59d msqk2Pq8pI9C5Cp2f7Ad+or3XhpWa4IKQjVvGt1vV2WCasEPHwL+1a9Alhg47x/GmoYoMRHaT7fG+a3ZYe+QF5cIGFyWj5QxUkKcD/FE37N2DQuPQOzOHDYe9BQCi/FFC2GarpiGIgPQd9RDjsTDpFKCt9lzfbF/65I6ISDB5TQyCaLvSf8cofivLe3EQpw0sZ97fLi7VOlOY888elByNALcl5rf7qLuh/gPOiv9B1SsJ0l/zk0FxwLCCKFGXn1RSV8/</ds:X509Certificate>
        </ds:X509Data>
      </ds:KeyInfo>
    </ds:Signature>
    <saml2:Subject>
      <saml2:NameID Format="urn:oasis:names:tc:SAML:2.0:nameid-format:persistent">joe@bloggs.com</saml2:NameID>
      <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
        <saml2:SubjectConfirmationData InResponseTo="_125f72fb-e3bf-40d0-ba42-77152c2c0845" NotOnOrAfter="2020-08-19T03:31:29.364Z" Recipient="https://pact-saas-prod-1.auth.ap-southeast-2.amazoncognito.com/saml2/idpresponse" />
      </saml2:SubjectConfirmation>
    </saml2:Subject>
    <saml2:Conditions NotBefore="2020-08-19T03:21:29.364Z" NotOnOrAfter="2020-08-19T03:31:29.364Z">
      <saml2:AudienceRestriction>
        <saml2:Audience>urn:amazon:cognito:sp:ap-southeast-2_x0L1olP0D</saml2:Audience>
      </saml2:AudienceRestriction>
    </saml2:Conditions>
    <saml2:AuthnStatement AuthnInstant="2020-08-19T03:26:29.364Z" SessionIndex="_125f72fb-e3bf-40d0-ba42-77152c2c0845">
      <saml2:AuthnContext>
        <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml2:AuthnContextClassRef>
      </saml2:AuthnContext>
    </saml2:AuthnStatement>
    <saml2:AttributeStatement>
      <saml2:Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">
        <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">Joe</saml2:AttributeValue>
      </saml2:Attribute>
      <saml2:Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">
        <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">Bloggs</saml2:AttributeValue>
      </saml2:Attribute>
      <saml2:Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">
        <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">joe@bloggs.com</saml2:AttributeValue>
      </saml2:Attribute>
    </saml2:AttributeStatement>
  </saml2:Assertion>
</saml2p:Response>
```

### Okta

See https://developer.okta.com/docs/guides/build-sso-integration/saml2/overview/ for further details on any of the steps below.

#### 1. Create a SAML app in Okta

1. Open the Okta Developer Console.
1. Choose Applications, and then choose Add Application.
1. On the Add Application page, choose Create New App.
1. In the Create a New Application Integration dialog, confirm that Platform is set to Web.
1. For the Sign on method, choose SAML 2.0.
1. Choose Create.

![Okta create app](/saml/okta-saml-create-app.png)

#### 2. Configure SAML integration for your Okta app

1. On the Create SAML Integration page, under General Settings, enter a name for your app.
1. (Optional) Upload a logo and choose visibility settings for your app.
1. Choose Next.
1. Under GENERAL, for Single sign on URL, enter `https://pact-saas-prod-1.auth.ap-southeast-2.amazoncognito.com/saml2/idpresponse`.
1. For Audience URI (SP Entity ID), enter urn: `urn:amazon:cognito:sp:ap-southeast-2_x0L1olP0D`
1. Under ATTRIBUTE STATEMENTS (OPTIONAL), add 3 statements with the following information:
   1. For Name, enter the SAML attribute name `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname`.
   1. For Value, enter `user.firstName`.
   1. For Name, enter the SAML attribute name `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`.
   1. For Value, enter `user.lastName`.
   1. For Name, enter the SAML attribute name `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`.
   1. For Value, enter `user.email`.
1. Choose Next.
1. Choose a feedback response for Okta Support.
1. Choose Finish.

![Okta create app](/saml/okta-saml-settings-screen.png)

#### 3. Assign a user to your Okta application

1. On the Assignments tab for your Okta app, for Assign, choose Assign to People.
1. Next to the user you want to assign, choose Assign.
1. Note: If this is a new account, the only option is to choose yourself (the admin) as the user.
1. Choose Save and Go Back. Your user is assigned.
1. Choose Done.

![Assign user screen in Okta](/saml/okta-saml-assign-user-screen.png)
![Assign a user in Okta](/saml/okta-saml-assign-user.png)

#### 4. Get the IdP metadata for your Okta application

1. On the Sign On tab for your Okta app, find the Identity Provider metadata hyperlink. Right-click the hyperlink and copy the URL.
1. For more information, see Configure SAML in your app in the Set up a SAML application in Okta guide on the Okta Developer website.

#### 5. Contact PactFlow to enable your IdP

Send your unique metadata URL to us [here](https://support.smartbear.com/pactflow/message/).

### Azure Active Directory

See https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-federated-single-sign-on-non-gallery-applications for more information.

1. Create a non-gallery application

![Create a non-gallery app](/saml/azure-add-non-gallery-application.png)

2. Follow the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-non-gallery-app) for creating a non-gallery application.

- Choose `Non-gallery application` at the `Add your own app` screen.
- Set the name to `pactflow` when prompted.

![Create a non-gallery app](/saml/azure-add-pactflow.png)

2. When the application has been created, assign the users that should be allowed to login to PactFlow.

![Assign Users](/saml/azure-app-quickstart.png)

3. Once the users have been assigned, select the `Single sign-on` tab. Select `SAML`.

![Configure SSO](/saml/azure-single-sign-on-saml.png)

4. Proceed to the next step.

![Configure SAML](/saml/azure-configure-saml.png)

4. Set the Identifier (Entity ID) to `urn:amazon:cognito:sp:ap-southeast-2_x0L1olP0D`
5. Set the Reply URL to `https://pact-saas-prod-1.auth.ap-southeast-2.amazoncognito.com/saml2/idpresponse`
6. Relay State and Logout URL fields are blank.
7. Set the [Sign On URL](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-setup-sso#update-single-sign-on-values) to point to your unique PactFlow URL (e.g. https://companyaccount.pactflow.io) (this is required as we don't support IDP initiated sign-on)
8. To add user attributes, click "View and edit all other user attributes" to edit the attributes to be sent to the application in the SAML token when users sign in. Add the following 3 attributes:

   1. First Name: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname`.
   1. Last Name: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`.
   1. Email Address: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`.

### OneLogin - via PactFlow Connector

1.  On the OneLogin portal page, choose Administration.
2.  From the Administration page, choose Applications, and then choose Add App.

![Find PactFlow Connector](/saml/saml-onelogin-find-pactflow.png)

3.  In the search bar under Find Applications, enter "pactflow", and then choose the PactFlow Connector
4.  (Optional) Do any of the following:
    For Display Name, enter a name and description. For example, PactFlow.
    For the Rectangular Icon and Square Icon, you can add PactFlow icons.
    For Description, enter a short summary description.
5.  Choose Save.
6.  On the homepage of the new application, choose "More Actions > SAML Metadata" from the main menu

![Configure Onelogin metadata](/saml/saml-onelogin-metadata.png)

### OneLogin - manual setup

#### 1. Create a OneLogin application

1.  On the OneLogin portal page, choose Administration.
2.  From the Administration page, choose Applications, and then choose Add App.
3.  In the search bar under Find Applications, enter saml, and then choose SAML Test Connector (Advanced) to open the Add SAML Test Connector page.
4.  (Optional) Do any of the following:
    For Display Name, enter a name and description. For example, PactFlow.
    For the Rectangular Icon and Square Icon, you can add PactFlow icons.
    For Description, enter a short summary description.
5.  Choose Save.

#### 2. Edit your OneLogin application configuration

1.  Choose Configuration.
2.  On the Configuration page, do the following:
    For RelayState, leave it blank.
    For Audience, enter `urn:amazon:cognito:sp:ap-southeast-2_x0L1olP0D`
    Leave Recipient blank.
    For ACS (Consumer) URL Validator, enter `https://pact-saas-prod-1.auth.ap-southeast-2.amazoncognito.com/saml2/idpresponse`
    For ACS (Consumer) URL, enter `https://pact-saas-prod-1.auth.ap-southeast-2.amazoncognito.com/saml2/idpresponse`
    Leave Single Logout URL blank.

#### 3. Edit your OneLogin application's parameters

1.  Choose Parameters.
    Note: One parameter (NameID (fka Email)) is already listed—this is expected.
2.  Choose Add parameter to create a new, custom parameter.
3.  In the New Field dialog, for Field name, enter `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier`
4.  For Flags, select the Include in SAML assertion check box.
5.  Choose Save.
6.  For Value, choose Email from the list.
7.  Choose Save.

You then need to repeat the steps for the first name and last name.

8.  Choose Add parameter to create a new, custom parameter.
9.  In the New Field dialog, for Field name, enter First name
10. For Flags, select the Include in SAML assertion check box.
11. Choose Save.
12. For Value, choose First Name from the list.
13. Choose Save.
14. Choose Add parameter to create a new, custom parameter.
15. In the New Field dialog, for Field name, enter Lastname
16. For Flags, select the Include in SAML assertion check box.
17. Choose Save.
18. For Value, choose First Name from the list.
19. Choose Save.

You should define the following attributes:

![Onelogin Attributes](/saml/onelogin_attributes.png)

#### 4. Copy the IdP metadata for your OneLogin application

1.  Choose SSO.
2.  Under Issuer URL, copy the URL to your clipboard. You need to provide this URL to us.
3.  Choose Save to save all your changes to your OneLogin application.

### Debugging

#### Debug SAML Assertions

The SAML login assertion request/response happens via the browser, and for security reasons, PactFlow cannot see.

You can, however, extract the SAML assertion from your web browser during a login flow. For example, using most modern browsers such as Chrome perform the following steps:

1. Open your developer tools console
1. View the network tab and ensure "persist" or "preserve log" is enabled
1. Head to your pactflow account: `https://<youraccount>.pactflow.io`
1. Login via your IdP until you experience the issue
1. Find the request to `https://pact-saas-prod-1.auth.ap-southeast-2.amazoncognito.com/saml2/idpresponse`
1. Copy the `SAMLResponse` value into a tool such as https://www.samltool.com/ to decode and view

![SAML debugging](/saml/saml-response-debugging.png)

## Troubleshooting

### 1. Name not appearing in user management screens

You are missing the mappings for "First name" and "Last Name", see `Map the required SAML2.0 attributes` in Setup.

### 2. "Invalid State/RelayState provided"

Your SAML provider has not been configured on the PactFlow side (please contact us if this is the case) or the metadata document supplied does not match your IdP.

### 3. "Invalid samlResponse or relayState from identity provider"

You have attempted to login via your IdP (IdP Initiated Login) which is not supported.

### 4. I've added an identity provider and see duplicate users

Users are identified uniquely by their identity providers. This means that a user that previously logged into PactFlow via username/password with the email "joe@pactflow.io" who then authenticates via Github, will be treated as a separate user with separate permissions. 

To enable merging of identities based on email address:

1. Set the "Consolidate User Logins by Email" [system preference](/docs/user-interface/settings/preferences#consolidate-user-logins-by-email)
2. Delete the duplicated user
3. Attempt the federated login again. This will link the federated user to the original user, retaining the team assignments, roles, audit trail history etc.

You can discriminate between users based on the "identity provider" column in our Users UI screen. To reduce the number of users in your account, you can disable (or delete) any users that no longer login via a particular IDP.

### 5. I've enabled SSO, can I disable login via username/password?

You can't make the username/password login dialog disappear, however only users that have been manually invited by email can login with this option. Inviting users is controlled by the [`user:invite` permission](https://docs.pactflow.io/docs/permissions/#userinvite), which by default is only available to Administrators. You can use this permission to create custom roles as needed to control the desired behaviour.

Note it is wise to retain at least one administrative user that can login with username and password in order to address break-glass scenarios (e.g. if your SSO provider is down or misconfigured).