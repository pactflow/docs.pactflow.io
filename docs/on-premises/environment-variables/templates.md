---
title: Configuration file templates
---

## Required environment variables

```yml

- name: "PACTFLOW_DATABASE_URL"
  value: "postgres://username:password@host:port/database"
- name: "PACTFLOW_SAML_IDP_NAME"
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
- name: "PACTFLOW_MASTER_SECRETS_ENCRYPTION_KEY"
  value: ""
- name: "PACTFLOW_ADMIN_API_KEY"
  value: ""
- name: "PACTFLOW_COOKIE_SECRET"
  value: ""
- name: "TZ"
  value: ""
```

## Recommended environment variables

```yml
- name: "PACTFLOW_WEBHOOK_HOST_WHITELIST"
  value: ""
- name: "PACTFLOW_ISSUER"
  value: ""
- name: "PACTFLOW_BASE_URL"
  value: ""
```
