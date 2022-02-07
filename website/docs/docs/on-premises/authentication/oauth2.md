---
title: OAuth2
---

## Configuration

An OAuth2 identify provider is configured by a set of environment variables prefixed with `PACTFLOW_TEST_OAUTH2_`. See the [Test OAuth2](/docs/on-premises/environment-variables/1.14-beta) section of the environment variables page for the full list.

## Callback URL

The callback URL is `https://<your Pactflow host>/auth/oauth2/callback`. This must be configured in the settings for the Pactflow client in your Identify Provider.

## Custom Auth handler

At the end of the OAuth2 login flow, a JWT is retrieved by Pactflow from the customer's Identify Provider. A custom Ruby auth handler configuration file will be supplied by Pactflow to map claims from the JWT to Pactflow roles and teams. The auth handler configuration file must be mounted as a volume on the Pactflow container, in the directory `/home/pactflow/extensions/` eg. `/home/pactflow/extensions/auth_ext_script.rb`.
