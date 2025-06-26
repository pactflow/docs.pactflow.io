---
title: OAuth2
---

## Configuration

An OAuth2 identify provider is configured by a set of environment variables prefixed with `PACTFLOW_TEST_OAUTH2_`, or using the `test_oauth2` key in a YAML configuration file. See the [Test OAuth2](/docs/on-premises-2x/environment-variables/1.14-beta) section of the environment variables page for the full list.

## Callback URL

The callback URL is `https://<your PactFlow host>/auth/oauth2/callback`. This must be configured in the settings for the PactFlow client in your Identify Provider.

## Authorize params

The following parameters are sent to the Identity Provider's configured [`authorize_url`](/docs/on-premises-2x/environment-variables/1.14-beta#pactflow_test_oauth2__authorize_url) during the request phase.

| Parameter | Description |
|-----------|-------------|
| scope | `openid profile email` |
| response_type | `code` |
| response_mode | `form_post` |
| state | A randomly generated hex string |
| client_id  | The configured [client_id](/docs/on-premises-2x/environment-variables/1.14-beta#pactflow_test_oauth2__client_id) |
| redirect_uri |  The [callback URL](#callback-url) as documented above |

The parameters configured in the [`custom_authorize_params`](/docs/on-premises-2x/environment-variables/1.14-beta#pactflow_test_oauth2__custom_authorize_params__key) are also merged into these default parameters.

## Token params

The following parameters are sent to the Identity Provider's configured [`token_url`](/docs/on-premises-2x/environment-variables/1.14-beta#pactflow_test_oauth2__token_url).

| Parameter | Description |
|-----------|-------------|
| code | The `code` returned by the IDP during the callback phase. |
| grant_type | `authorization_code` |
| client_id  | The configured [client_id](/docs/on-premises-2x/environment-variables/1.14-beta#pactflow_test_oauth2__client_id) |
| client_secret | The configured [client_secret](/docs/on-premises-2x/environment-variables/1.14-beta#pactflow_test_oauth2__client_secret) |
| redirect_uri |  The [callback URL](#callback-url) as documented above |

The parameters configured in the [`custom_token_params`](/docs/on-premises-2x/environment-variables/1.14-beta#pactflow_test_oauth2__custom_token_params__key) are also merged into these default parameters.

## Custom Auth handler

At the end of the OAuth2 login flow, a JWT is retrieved by PactFlow from the customer's Identify Provider. A custom Ruby auth handler configuration file will be supplied by PactFlow to map claims from the JWT to PactFlow roles and teams. The auth handler configuration file must be mounted as a volume on the PactFlow container, in the directory `/home/pactflow/extensions/` eg. `/home/pactflow/extensions/auth_ext_script.rb`.

## Debugging

The URLs and headers of the HTTP interactions with the Identity Provider will be logged at `info` level in the PactFlow logs. To see the request and response bodies, set the `PACTFLOW_LOG_LEVEL` to `debug`. Note that this will log sensitive information, so do not leave the logging at this level permanently.
