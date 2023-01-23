---
id: login-help
title: Login
---

## Unable to login into PactFlow user interface

When you signup for PactFlow, you will be emailed the login details with a tempory password. This password is only valid for 7 days. If you need the password reset, email us at support@pactflow.io and we will be happy to reset it for you.

## Github login error

If you get an `invalid_grant: {"error":"invalid_grant"}` error while logging into PactFlow using Github, you'll need to clear your browser cookies before logging in again.

## Getting a 401 Unauthorized when publishing or verifying pacts

The most common reasons for API authentication failures are:

  1. Using an old version of a Pact library that does not support the authentication scheme that PactFlow accepts (bearer token authentication).
      * To resolve this, make sure you are using the latest version of the Pact library for your language.
  2. Attempting to access the API with a username and password instead of an API token.
      * To resolve this, please see the section on [configuring your API token](/#configuring-your-api-token)
  3. Using a read only token instead of a read/write token.
      * To resolve this, please see the section on [configuring your API token](/#configuring-your-api-token) and ensure you have copied the read/write token.
