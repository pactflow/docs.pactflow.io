---
id: login-help
title: Login
---

This section describes certain issues you might face while logging into PactFlow and explains how to resolve them.

## *"You are not authorized to access this Pactflow account"*

There are two reasons this error may occur:

### 1. Your email has not been confirmed

Please check your inbox for an email with the subject "Verify your email" from `no-reply@id.smartbear.com`, and choose "confirm my account".

After this, you should be able to login.

### 2. You have not been invited to the account

Only users that created the account (initial user) or have been invited to an account are able to login.

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

Additionally, on September 11 of 2023, the basic authentication feature for legacy plans was [decommissioned](https://docs.pactflow.io/notices/2023-06-05-legacy-plan-decommission/). See the [guide](https://docs.pactflow.io/notices/2023-06-05-legacy-plan-decommission/) on upgrading to a supported authentication mode.