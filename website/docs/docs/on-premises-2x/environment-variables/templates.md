---
title: Configuration file templates
---

## Required environment variables

```yml
- name: "PACTFLOW_DATABASE_URL"
  value: "postgres://username:password@host:port/database"
- name: "PACTFLOW_MASTER_SECRETS_ENCRYPTION_KEY"
  value: ""
- name: "PACTFLOW_COOKIE_SECRET"
  value: ""
- name: "TZ"
  value: ""
- name: "PACTFLOW_BASE_URL"
  value: ""  

# SAML
- name: "PACTFLOW_SAML_IDP_NAME"
  value: ""
- name: "PACTFLOW_SAML_ISSUER"
  value: ""
- name: "PACTFLOW_SAML_NAME_IDENTIFIER_FORMAT"
  value: ""
- name: "PACTFLOW_SAML_EMAIL_ATTRIBUTE"
  value: ""
- name: "PACTFLOW_SAML_NAME_ATTRIBUTE"
  value: ""
- name: "PACTFLOW_SAML_FIRST_NAME_ATTRIBUTE"
  value: ""
- name: "PACTFLOW_SAML_LAST_NAME_ATTRIBUTE"
  value: ""
- name: "PACTFLOW_SAML_IDP_SSO_TARGET_URL"
  value: ""
- name: "PACTFLOW_SAML_IDP_CERT_FINGERPRINT"
  value: ""
- name: "PACTFLOW_SAML_IDP_ID_ATTRIBUTE"
  value: ""
```

## Recommended environment variables

```yml
- name: "PACTFLOW_WEBHOOK_HOST_WHITELIST"
  value: ""
```

## SAML
### Azure Active Directory

```yml
- name: "PACTFLOW_SAML_ISSUER"
  value: "eg. https://pactflow.mycompany.com"
- name: "PACTFLOW_SAML_IDP_NAME"
  value: "eg. Azure AD"
- name: "PACTFLOW_SAML_IDP_SSO_TARGET_URL"
  value: "eg. https://login.microsoftonline.com/abcd/saml2"
- name: "PACTFLOW_SAML_IDP_CERT_FINGERPRINT"
  value: "eg. E97D948158F893A93827A0A4D70701A38AB1A499"
- name: "PACTFLOW_SAML_IDP_ENTITY_ID"
  value: "eg. https://sts.windows.net/abcd/"
- name: "PACTFLOW_SAML_NAME_IDENTIFIER_FORMAT"
  value: "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent"
- name: "PACTFLOW_SAML_IDP_ID_ATTRIBUTE"
  value: "http://schemas.microsoft.com/identity/claims/objectidentifier"
- name: "PACTFLOW_SAML_EMAIL_ATTRIBUTE"
  value: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
- name: "PACTFLOW_SAML_NAME_ATTRIBUTE"
  value: "http://schemas.microsoft.com/identity/claims/displayname"
- name: "PACTFLOW_SAML_FIRST_NAME_ATTRIBUTE"
  value: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
- name: "PACTFLOW_SAML_LAST_NAME_ATTRIBUTE"
  value: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
```
