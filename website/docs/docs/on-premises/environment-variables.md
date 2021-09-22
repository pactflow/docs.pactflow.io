---
title: Environment variables
---

## Logging

<hr/>


### PACTFLOW_LOG_LEVEL

The Pactflow application log level

**Required:** false<br/>
**Default:** `INFO`<br/>
**Allowed values:** `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`<br/>

### PACTFLOW_LOG_FORMAT

The Pactflow application log format

**Required:** false<br/>
**Default:** `json`<br/>
**Allowed values:** `json`, `default`, `color`<br/>
**More information:** https://github.com/rocketjob/semantic_logger/tree/master/lib/semantic_logger/formatters<br/>

### PACTFLOW_HTTP_LOGGING_ENABLED

When true, HTTP request details and response status and duration will be logged to stdout in json format

**Required:** false<br/>
**Default:** `false`<br/>
**Allowed values:** `true`, `false`<br/>

<br/>

## Database

<hr/>


### PACTFLOW_DATABASE_URL

The fully qualifed database connection string

**Required:** if separate host, name, username, password environment variables are not set<br/>
**Example:** `postgresql://username:password@host/database`<br/>

### PACTFLOW_DATABASE_USERNAME

The database username

**Required:** if PACTFLOW_DATABASE_URL is not set<br/>

### PACTFLOW_DATABASE_PASSWORD

The database password

**Required:** if PACTFLOW_DATABASE_URL is not set<br/>

### PACTFLOW_DATABASE_HOST

The database host

**Required:** if PACTFLOW_DATABASE_URL is not set<br/>

### PACTFLOW_DATABASE_PORT

The database port

**Required:** if PACTFLOW_DATABASE_URL is not set<br/>

### PACTFLOW_DATABASE_NAME

The database name

**Required:** if PACTFLOW_DATABASE_URL is not set<br/>

### PACTFLOW_DATABASE_SSLMODE

The Postgresql ssl mode.

**Required:** false<br/>
**Default:** `required`<br/>
**Allowed values:** `disable`, `allow`, `prefer`, `require`, `verify-ca`, `verify-full`<br/>
**More information:** https://ankane.org/postgres-sslmode-explained<br/>

### PACTFLOW_SQL_LOG_WARN_DURATION

The duration in seconds, as a float, after which to log an SQL statement

**Required:** false<br/>
**Default:** `5`<br/>

### PACTFLOW_SQL_LOG_LEVEL

The log level that will be specified when the SQL query statements are logged. To disable noisy SQL query logging when the PACTFLOW_LOG_LEVEL is set to DEBUG for other reasons, use the value NONE.

**Required:** false<br/>
**Default:** `DEBUG`<br/>
**Allowed values:** `NONE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`<br/>

### PACTFLOW_DATABASE_AUTO_MIGRATE

Whether or not to automatically apply the schema and data migrations to the database on startup

**Required:** false<br/>
**Default:** `true`<br/>
**Allowed values:** `true`, `false`<br/>

<br/>

## Webhooks

<hr/>


### PACTFLOW_WEBHOOK_HOST_WHITELIST

A space delimited list of hosts for which webhook response logging will be enabled. By default, all responses will be redacted for security purposes. To allow logging for all hosts, use the value `/.*/`.

**Required:** false<br/>
**Example:** `/.*\.foo\.com$/ github.com foo.slack.com`<br/>
**More information:** https://docs.pact.io/pact_broker/configuration#webhook-whitelists<br/>

### PACTFLOW_WEBHOOK_SCHEME_WHITELIST

A space delimited list of allowed schemes for a webhook to use.

**Required:** false<br/>
**Default:** `https`<br/>
**Allowed values:** `https`, `http`<br/>
**More information:** https://docs.pact.io/pact_broker/configuration#webhook-whitelists<br/>

### PACTFLOW_WEBHOOK_HTTP_METHOD_WHITELIST

A space delimited list of allowed http methods for a webhook to use. *It is strongly recommended to only allow POST requests for security purposes.*

**Required:** false<br/>
**Default:** `POST`<br/>
**Allowed values:** `GET`, `POST`, `PUT`, `PATCH`, `DELETE`<br/>
**More information:** https://docs.pact.io/pact_broker/configuration#webhook-whitelists<br/>

### PACTFLOW_DISABLE_SSL_VERIFICATION

Whether or not to disable SSL verificaton when executing webhooks.

**Required:** false<br/>
**Default:** `false`<br/>
**Allowed values:** `true`, `false`<br/>

<br/>

## SAML authentication

<hr/>
To configure more than one SAML identity provider, specify another set of the following environment variables with a `_2` after the `PACTFLOW_SAML` prefix (and `_3` for the third etc.). The `PACTFLOW_SAML_ISSUER` is shared between all the SAML providers so does not need to be duplicated.

eg. For the second SAML identity provider set `PACTFLOW_SAML_2_AUTH_ENABLED`, `PACTFLOW_SAML_2_IDP_NAME` etc and for the third `PACTFLOW_SAML_3_AUTH_ENABLED`, `PACTFLOW_SAML_3_IDP_NAME` etc.


### PACTFLOW_SAML_AUTH_ENABLED

Whether or not to enable SAML authentication.

**Required:** false<br/>
**Default:** `false`<br/>
**Allowed values:** `true`, `false`<br/>

### PACTFLOW_SAML_ISSUER

The name of this application as it is known to the SAML IDP.

**Required:** false<br/>
**Default:** `https://pactflow.io`<br/>
**Example:** `http://pactflow.mycompany.com`<br/>

### PACTFLOW_SAML_IDP_NAME

The display name of the SAML IDP. This value will be used as the login button label.

**Required:** true<br/>

### PACTFLOW_SAML_IDP_LOGO

URL of a logo for IDP, to be displayed next to the login button.

**Required:** false<br/>

### PACTFLOW_SAML_IDP_SSO_TARGET_URL

The URL to which the authentication request should be sent. This endpoint is on the identity provider.

**Required:** if PACTFLOW_SAML_IDP_METADATA_URL is not set<br/>
**More information:** https://github.com/omniauth/omniauth-saml#options<br/>

### PACTFLOW_SAML_IDP_ENTITY_ID

The ID by which this IDP is known to Pactflow

**Required:** if PACTFLOW_SAML_IDP_METADATA_URL is not set<br/>
**More information:** https://github.com/omniauth/omniauth-saml#options<br/>

### PACTFLOW_SAML_IDP_CERT_FINGERPRINT

The SHA1 fingerprint of the certificate, e.g. "90:CC:16:F0:8D:...". This is provided from the identity provider when setting up the relationship.

**Required:** if PACTFLOW_SAML_IDP_METADATA_URL is not set<br/>
**More information:** https://github.com/omniauth/omniauth-saml#options<br/>

### PACTFLOW_SAML_IDP_ID_ATTRIBUTE

The name of the SAML response attribute that uniquely and permanently identifies a user for the IDP.

**Required:** true<br/>

### PACTFLOW_SAML_EMAIL_ATTRIBUTE

The name of the SAML response attribute that contains the email address.

**Required:** true<br/>

### PACTFLOW_SAML_NAME_ATTRIBUTE

The name of the SAML response attribute that contains the full name.

**Required:** true<br/>

### PACTFLOW_SAML_FIRST_NAME_ATTRIBUTE

The name of the SAML response attribute that contains the first name.

**Required:** true<br/>

### PACTFLOW_SAML_LAST_NAME_ATTRIBUTE

The name of the SAML response attribute that contains the last name.

**Required:** true<br/>

### PACTFLOW_SAML_IDP_METADATA_URL

The URL of the IDP's metadata endpoint. If this is set, then the PACTFLOW_SAML_IDP_SSO_TARGET_URL and PACTFLOW_SAML_IDP_CERT_FINGERPRINT can be skipped.

**Required:** false<br/>
**More information:** https://github.com/omniauth/omniauth-saml#idp-metadata<br/>

### PACTFLOW_SAML_NAME_IDENTIFIER_FORMAT

Used during SP-initiated SSO. Describes the format of the username required by this application.

**Required:** false<br/>
**Default:** `urn:oasis:names:tc:SAML:2.0:nameid-format:persistent`<br/>
**Allowed values:** `urn:oasis:names:tc:SAML:2.0:nameid-format:persistent`, `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`<br/>

### PACTFLOW_SAML_ALLOWED_CLOCK_DRIFT

To allow for a small amount of clock drift between Pactflow and the Identity Provider, the allowed clock drift may be specified. Its value must be given in a number (and/or fraction) of seconds. The value is added to the current time at which the response is validated, before it is tested against the NotBefore assertion.

**Required:** false<br/>
**Default:** `0`<br/>

<br/>

## Basic authentication

<hr/>


### PACTFLOW_BASIC_AUTH_ENABLED

Whether or not to enable basic authentication. For demo purposes only - not to be set to `true` for production use. Cannot be set to `true` at the same time as PACTFLOW_SAML_AUTH_ENABLED.

**Required:** false<br/>
**Default:** `false`<br/>
**Allowed values:** `true`, `false`<br/>

### PACTFLOW_BASIC_AUTH_USERNAME

The username for HTTP basic authentication. For demo purposes only - not to be set for production use.

**Required:** false<br/>

### PACTFLOW_BASIC_AUTH_PASSWORD

The password for HTTP basic authentication. For demo purposes only - not to be set for production use.

**Required:** false<br/>

### PACTFLOW_BASIC_AUTH_READ_ONLY_USERNAME

The username for HTTP basic authentication. Allows read access only. For demo purposes only - not to be set for production use.

**Required:** false<br/>

### PACTFLOW_BASIC_AUTH_READ_ONLY_PASSWORD

The password for HTTP basic authentication. Allows read access only. For demo purposes only - not to be set for production use.

**Required:** false<br/>

<br/>

## Encryption

<hr/>


### PACTFLOW_MASTER_ENCRYPTION_KEY

A randomly generated string which will be the master key for encrypting secrets and API tokens. Renamed from `PACTFLOW_MASTER_SECRETS_ENCRYPTION_KEY`.

Do not change or lose the value of this key. All encrypted data (secrets and API keys) will be unretrievable if this key is lost. Rotation is not currently supported but will be added in a future release.

To generate an appropriate value, run the following on Linux/Mac:

```
env LC_CTYPE=C tr -dc '_A-Z-a-z-0-9!#$%&*+-\\.^_|~' < /dev/urandom | fold -w 32 | head -n 1
```

**Required:** true<br/>
**Example:** `eLM5xPxPu9ftDhA34ZUw2ry2okpMnOPCrA-twxLBUUk`<br/>

<br/>

## Secrets

<hr/>


### PACTFLOW_MASTER_SECRETS_ENCRYPTION_KEY

Deprecated in favour of `PACTFLOW_MASTER_ENCRYPTION_KEY`. If you have a previous installation of Pactflow with `PACTFLOW_MASTER_SECRETS_ENCRYPTION_KEY` set, please rename it to `PACTFLOW_MASTER_ENCRYPTION_KEY`.

**Required:** false<br/>

<br/>

## User administration

<hr/>


### PACTFLOW_ADMIN_API_KEY

The value of the X-Api-Key header required to make the HTTP call to provision the admin user.

To generate an appropriate value, run the following on Linux/Mac:

```
env LC_CTYPE=C tr -dc '_A-Z-a-z-0-9!#$%&*+-\\.^_|~' < /dev/urandom | fold -w 32 | head -n 1
```

**Required:** true<br/>
**Allowed values:** `A-Za-z0-9!#$%&*+-^_``|~.`<br/>
**Example:** `4wmplZfucVG-LdIHD9L`<br/>
**More information:** https://tools.ietf.org/html/rfc7230#section-3.2.6<br/>

<br/>

## Badges

<hr/>


### PACTFLOW_SHIELDS_IO_BASE_URL

The URL of the free service that is used to generate the build badges. Note that the badge files are served via a redirect in the browser, so there is no request made from the Pactflow application to the shields server.

**Required:** false<br/>
**Default:** `https://img.shields.io`<br/>
**More information:** https://shields.io<br/>

<br/>

## HTTP

<hr/>


### PACTFLOW_BASE_URL

The base url, including HTTP scheme and any application context path, at which the Pactflow application will be publicly
accessible. It should not include a trailing slash. If there are multiple interfaces on which the application will be addressed,
list all the base URLs separated by spaces.


**Required:** true<br/>
**Example:** `https://pactflow.mycompany.com https://pactflow.internal.mycompany.com`<br/>

### PACTFLOW_HTTP_PORT

The HTTP port on which the Pactflow application will be exposed on the Docker container. Must be greater than 1024.

**Required:** false<br/>
**Default:** `9292`<br/>

### PACTFLOW_SESSION_LENGTH

The number of seconds after which the user needs to re-authenticate with the IDP. Default is 1 week.

**Required:** false<br/>
**Default:** `604800`<br/>

### PACTFLOW_COOKIE_SECRET

The secret used to encrypt the rack.session cookie.
To generate an appropriate value, run the following on Linux/Mac:

```
env LC_CTYPE=C tr -dc '_A-Z-a-z-0-9!#$%&*+-\\.^_|~' < /dev/urandom | fold -w 32 | head -n 1
```

**Required:** true<br/>
**Example:** `X-sbeCpAUgO-8FRtKxYrVhgZ2hIJhPuzCh_89PypYrI`<br/>

### PACTFLOW_OLD_COOKIE_SECRET

The previous secret - used when rotating the rack.session cookie secret.

**Required:** false<br/>

### PACTFLOW_REQUIRE_HTTPS

When enabled, the header `Strict-Transport-Security: max-age=31536000 ; includeSubDomains` is added to ensure connections are made over HTTPS

**Required:** false<br/>
**Default:** `true`<br/>
**Allowed values:** `true`, `false`<br/>

### SSL_CERT_FILE

The PEM certificate file to use if the webhooks have to connect to servers that use self signed certificates.

**Required:** false<br/>

### SSL_CERT_DIR

The PEM certificate directory to use if the webhooks have to connect to servers that use self signed certificates.

**Required:** false<br/>

### http_proxy

HTTP proxy used when making outgoing HTTP requests

**Required:** false<br/>

### https_proxy

HTTPS proxy used when making outgoing HTTP requests

**Required:** false<br/>

### no_proxy

The hosts for which to not use a proxy

**Required:** false<br/>

<br/>

## Miscellaneous

<hr/>


### TZ

The timezone in which to display dates for server side rendered pages.

**Required:** true<br/>
**More information:** [Valid timezones](/docs/on-premises/environment-variables/timezones)<br/>

<br/>

## API Tokens

<hr/>


### PACTFLOW_API_TOKEN_ENCRYPTION_ENABLED

Enables encryption of API token values in the database. Requires `PACTFLOW_API_TOKEN_IV` and `PACTFLOW_MASTER_ENCRYPTION_KEY` to also be set.

**Required:** false<br/>
**Default:** `not set`<br/>

### PACTFLOW_API_TOKEN_IV

If `PACTFLOW_API_TOKEN_ENCRYPTION_ENABLED` is set to `true`, then this value must contain a base 64 encoded string of random 16 bytes for the
encryption initialization vector.

To generate an appropriate value, run the following on Linux/Mac:

```
head < /dev/random -c 16 | base64
```

**Required:** if `PACTFLOW_API_TOKEN_ENCRYPTION_ENABLED` is set to `true`<br/>
**Default:** `not set`<br/>
**Example:** `JUVDdnRzLXZyWHA7UF93RAo=`<br/>
