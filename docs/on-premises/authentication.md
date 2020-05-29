---
title: Authentication
---

## User interface

The Pactflow On-Premises application currently supports single sign for SAML identity providers. It supports both IDP and SP initiated log in.

Any user who is able to authenticate to the configured IDP is allowed access to Pactflow.

The SAML IDP is configured via [environment variables](/docs/on-premises/environment-variables/#saml-authentication).

## API

The API is accessed using a bearer token that is set in the HTTP header of the request (eg. `Authorization: Bearer <your token here>`). The tokens are administered on a per user basis in the [settings page](/docs/user-interface#settings---api-tokens) of the Pactflow application.

