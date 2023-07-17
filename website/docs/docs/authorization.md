---
id: authorization-help
title: Authorization Errors
---

## Unable to login into PactFlow user interface

When you sign up for PactFlow, you will be emailed the login details with a temporary password. This password is valid for 7 days. If you need the password reset, you can reset the clock on this expiry by simply re-inviting the user. Alternatively, [contact us](https://support.smartbear.com/pactflow/message/) and we will reset it for you.

## Github login error

If you get an `invalid_grant: {"error":"invalid_grant"}` error while logging into PactFlow using Github, clear your browser cookies before logging in again.

## Getting a 401 Unauthorized when publishing or verifying pacts

The most common reasons for API authentication failures are:

  1. Using an old version of Pact library that does not support the PactFlow authentication scheme (bearer token authentication).
      * To resolve this, make sure you are using the latest Pact library version for your language.
  2. Attempting to access the API with a username and password instead of an API token.
      * To resolve this, please see the section on [configuring your API token](/#configuring-your-api-token)
  3. Using a read-only token instead of a read/write token.
      * To resolve this, please see the section on [configuring your API token](/#configuring-your-api-token) and ensure you have copied the read/write token.
