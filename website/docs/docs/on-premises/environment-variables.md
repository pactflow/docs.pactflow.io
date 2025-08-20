---
title: Environment variables
---

<!-- 
     This is a generated file. Do not edit it directly. 
     Please update app_onprem/environment_variables.yml instead and then run
     app_onprem/script/generate-configuration-docs.rb
-->



## Logging

<hr/>



### PACTFLOW_LOG_LEVEL

The PactFlow application log level

**Required:** false<br/>
**Default:** `INFO`<br/>
**Allowed values:** `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`<br/>

### PACTFLOW_LOG_FORMAT

The PactFlow application log format

**Required:** false<br/>
**Default:** `json`<br/>
**Allowed values:** `json`, `default`, `color`<br/>
**More information:** https://github.com/rocketjob/semantic_logger/tree/master/lib/semantic_logger/formatters<br/>

### PACTFLOW_HTTP_LOGGING_ENABLED

When true, HTTP request details and response status and duration will be logged to stdout in json format

**Required:** false<br/>
**Default:** `false`<br/>
**Allowed values:** `true`, `false`<br/>

## Monitoring

<hr/>



### NEW_RELIC_AGENT_ENABLED

Set this to true to enable New Relic application monitoring. The New Relic config file should be mounted at /home/pactflow/config/newrelic.yml

**Required:** false<br/>
**Default:** `false`<br/>
**Allowed values:** `true`, `false`<br/>

## Database

<hr/>



### PACTFLOW_DATABASE_URL

The fully qualified database connection string. If using Postgres on RDS with IAM authentication, the scheme must be `postgresiam` and the port must also be set.

**Required:** if separate host, name, username, password environment variables are not set<br/>
**Example:** `postgresql://username:password@host:port/database`<br/>

### PACTFLOW_DATABASE_ADAPTER

The database adapter to use. Use `postgresiam` when using Postgres on RDS with IAM authentication (rather than username/password authentication).

**Required:** false<br/>
**Default:** `postgres`<br/>
**Allowed values:** `postgres`, `postgresiam`<br/>

### PACTFLOW_DATABASE_USERNAME

The database username

**Required:** if PACTFLOW_DATABASE_URL is not set<br/>

### PACTFLOW_DATABASE_PASSWORD

The database password

**Required:** if PACTFLOW_DATABASE_URL is not set, unless using Postgres on RDS with IAM authentication<br/>

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

The Postgresql ssl mode. Note, if using Postgres on AWS RDS with IAM authentication, this must be `require`.

**Required:** false<br/>
**Default:** `require`<br/>
**Allowed values:** `disable`, `allow`, `prefer`, `require`, `verify-ca`, `verify-full`<br/>
**More information:** https://ankane.org/postgres-sslmode-explained<br/>

### PACTFLOW_DATABASE_CONNECTION_VALIDATION_TIMEOUT

The number of seconds after which to check the health of a connection from a connection pool before passing it to the application.

`-1` means that connections will be validated every time, which avoids errors
when databases are restarted and connections are killed.  This has a performance
penalty, so consider increasing this timeout if building a frequently accessed service.

**Required:** false<br/>
**Default:** `3600`<br/>
**Allowed values:** -1 or any positive integer.<br/>
**More information:** https://sequel.jeremyevans.net/rdoc-plugins/files/lib/sequel/extensions/connection_validator_rb.html<br/>

### PACTFLOW_SQL_LOG_WARN_DURATION

The duration in seconds, as a float, after which to log an SQL statement

**Required:** false<br/>
**Default:** `5`<br/>

### PACTFLOW_SQL_LOG_LEVEL

The log level that will be specified when the SQL query statements are logged.

**Required:** false<br/>
**Default:** `NONE`<br/>
**Allowed values:** `NONE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`<br/>

### PACTFLOW_DATABASE_MAX_CONNECTIONS

The maximum size of the connection pool per application instance. The total number of connections for the database must be calculated by multiplying this value by the number of instances (ie. running Docker containers).

**Required:** false<br/>
**Default:** `4`<br/>
**Allowed values:** A positive integer value.<br/>
**More information:** https://sequel.jeremyevans.net/rdoc/files/doc/opening_databases_rdoc.html#label-General+connection+options<br/>

### PACTFLOW_DATABASE_POOL_TIMEOUT

The number of seconds to wait if a connection cannot be acquired before raising an error.

**Required:** false<br/>
**Default:** `5`<br/>
**Allowed values:** A positive integer.<br/>
**More information:** https://sequel.jeremyevans.net/rdoc/files/doc/opening_databases_rdoc.html#label-General+connection+options<br/>

### PACTFLOW_DATABASE_AUTO_MIGRATE

Whether or not to automatically apply the schema and data migrations to the database on startup

**Required:** false<br/>
**Default:** `true`<br/>
**Allowed values:** `true`, `false`<br/>

### AWS_REGION

Required for running Postgres on RDS with IAM authentication. This must be set to the AWS region where the RDS database instance is running.

**Required:** false<br/>

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

### PACTFLOW_WEBHOOK_CERTIFICATES

A list of SSL certificate configuration objects with the properties `description`, and either `content` or `path`. These
certificates are used when a webhook needs to connect to a server that uses a self signed certificate.

Each certificate configuration item accepts a chain of certificates in PEM format - there may be multiple 'BEGIN CERTIFICATE' and 'END CERTIFICATE' in the content of each item.

The certificate configuration is not validated on startup. If any of the configured certificates cannot be loaded during the execution of a webhook, an error
will be logged, and they will be ignored. You can check if the configuration is working by testing the execution of
a webhook that connects to the server with the self signed certificate by following these instructions https://docs.pact.io/pact_broker/webhooks/debugging_webhooks#testing-webhook-execution

When setting the path, the full path to the certificate file in PEM format must be specified. When using Docker, you must ensure the
certificate file is [mounted into the container](https://docs.docker.com/storage/volumes/).

Each property of the certificate is described by an indexed environment variable in the format `PACTFLOW_WEBHOOK_CERTIFICATES__<INDEX>__<PROPERTY>`.
Environment variables with the same index are grouped together to form the complete object. Note the use of the double underscores before the index and property.

Example:

```shell
PACTFLOW_WEBHOOK_CERTIFICATES__0__LABEL="An example self signed certificate with content"
PACTFLOW_WEBHOOK_CERTIFICATES__0__CONTENT="-----BEGIN CERTIFICATE-----
      MIIDZDCCAkygAwIBAgIBATANBgkqhkiG9w0BAQsFADBCMRMwEQYKCZImiZPyLGQB
      <REST OF CERTIFICATE>
      jHT1Ty2CglM=
      -----END CERTIFICATE-----"
PACTFLOW_WEBHOOK_CERTIFICATES__1__LABEL="An example self signed certificate with a path"
PACTFLOW_WEBHOOK_CERTIFICATES__1__PATH="/full/path/to/the/cert.pem"
```

**Supported versions:** From v1.14.0<br/>
**Required:** false<br/>

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

**Required:** false<br/>

### PACTFLOW_SAML_LAST_NAME_ATTRIBUTE

The name of the SAML response attribute that contains the last name.

**Required:** false<br/>

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

To allow for a small amount of clock drift between PactFlow and the Identity Provider, the allowed clock drift may be specified. Its value must be given in a number (and/or fraction) of seconds. The value is added to the current time at which the response is validated, before it is tested against the NotBefore assertion.

**Required:** false<br/>
**Default:** `0`<br/>

## Demo authentication

<hr/>



### PACTFLOW_DEMO_AUTH_ENABLED

Whether or not to enable authentication for demo users. For demonstration purposes only - not to be set to `true` for production use.

**Required:** false<br/>
**Default:** `false`<br/>
**Allowed values:** `true`, `false`<br/>

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

## Secrets

<hr/>



### PACTFLOW_MASTER_SECRETS_ENCRYPTION_KEY

Deprecated in favour of `PACTFLOW_MASTER_ENCRYPTION_KEY`. If you have a previous installation of PactFlow with `PACTFLOW_MASTER_SECRETS_ENCRYPTION_KEY` set, please rename it to `PACTFLOW_MASTER_ENCRYPTION_KEY`.

**Required:** false<br/>

## Content Security

<hr/>



### PACTFLOW_CSP_ALLOWED_SOURCES

Space separated list of allowed content sources that should be allowed in addition to the hosts configured in the identity provider settings (eg. `PACTFLOW_SAML_IDP_SSO_TARGET_URL`). This may be useful if you need additional assets on your instance of PactFlow. For example, if you need to support multiple redirects for SAML authentication, you need to add them here for PactFlow to generate the appropriate Content-Security-Policy to allow that to happen.

**Required:** false<br/>
**Example:** `https://my-intermediate-idp-host.com`<br/>

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

## Domain

<hr/>



### PACTFLOW_ALLOW_DANGEROUS_CONTRACT_MODIFICATION

Whether or not to allow the pact content for an existing consumer version to be modified. It is strongly recommended that this is set to false,
as allowing modification makes the results of can-i-deploy unreliable. When this is set to false as recommended, each commit must publish pacts
with a unique version number.

**Supported versions:** From v1.14.0<br/>
**Required:** false<br/>
**Default:** For new installations of v1.14.0 and later, this defaults to `false`.<br/>
**Allowed values:** `true`, `false`<br/>
**More information:** https://docs.pact.io/versioning<br/>

### PACTFLOW_USE_FIRST_TAG_AS_BRANCH

When the value is `true`, the first tag applied to a version (within 10 seconds)
will be used to populate the `branch` property of the version.

This is to assist in the migration from using tags to track branches to using the branches feature.

**Required:** false<br/>
**Default:** `true`<br/>
**Allowed values:** `true`, `false`<br/>

### PACTFLOW_CREATE_DEPLOYED_VERSIONS_FOR_TAGS

When the value is `true` and a tag is created, if there is an environment with the name of the newly created tag, a deployed version is
also created for the pacticipant version.

This is to assist in the migration from using tags to track deployments to using the deployed and released versions feature.

**Supported versions:** From v1.14.0<br/>
**Required:** false<br/>
**Default:** `true`<br/>
**Allowed values:** `true`, `false`<br/>
**More information:** https://docs.pact.io/pact_broker/recording_deployments_and_releases/<br/>

## Badges

<hr/>



### PACTFLOW_SHIELDS_IO_BASE_URL

The URL of the free service that is used to generate the build badges. Note that the badge files are served via a redirect in the browser, so there is no request made from the PactFlow application to the shields server.

**Required:** false<br/>
**Default:** `https://img.shields.io`<br/>
**More information:** https://shields.io<br/>

## Resources

<hr/>



### PACTFLOW_BASE_URL

The base url, including HTTP scheme and any application context path, at which the PactFlow application will be publicly
accessible. It should not include a trailing slash. If there are multiple interfaces on which the application will be addressed,
list all the base URLs separated by spaces.


**Required:** true<br/>
**Example:** `https://pactflow.mycompany.com https://pactflow.internal.mycompany.com`<br/>

### PACTFLOW_HTTP_PORT

The HTTP port on which the PactFlow application will be exposed on the Docker container. Must be greater than 1024.

**Required:** false<br/>
**Default:** `9292`<br/>

### PACTFLOW_SESSION_LENGTH

The number of seconds after which the user needs to re-authenticate with the IDP. Default is 1 week.

**Required:** false<br/>
**Default:** `604800`<br/>

### PACTFLOW_SESSION_INACTIVITY_TIMEOUT

The number of seconds of inactivity after which the user needs to re-authenticate with the IDP. By default, this will be set to the value of the `PACTFLOW_SESSION_LENGTH`, effectively disabling the feature, unless a value is specified by the user.

**Required:** false<br/>
**Default:** `604800`<br/>

### PACTFLOW_COOKIE_SECRET

The secret used to encrypt the rack.session cookie.
To generate an appropriate value, run the following on Linux/Mac:

```
LC_ALL=C tr -dc '_A-Z-a-z-0-9!#$%&*+-\\.^_|~' < /dev/urandom | fold -w 64 | head -n 1
```

**Required:** true<br/>
**Example:** `X-sbeCpAUgO-8FRtKxYrVhgZ2hIJhPuzCh_89PypYrI`<br/>

### PACTFLOW_OLD_COOKIE_SECRET

The previous secret - used when rotating the rack.session cookie secret.

**Required:** false<br/>

### PACTFLOW_REQUIRE_HTTPS

When set to `true`, the header `Strict-Transport-Security: max-age=31536000 ; includeSubDomains` is added to ensure connections are made over HTTPS, and the `PACTFLOW_BASE_URL` is validated to ensure it starts with https.

This value should never be set to false in a production environment. It should only ever be set to false for local testing or demonstration purposes where an SSL certificate is not available.


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

### PACTFLOW_USE_HAL_BROWSER

Whether or not to enable the embedded HAL Browser.

**Required:** false<br/>
**Default:** `true`<br/>
**Allowed values:** `true`, `false`<br/>
**More information:** https://github.com/mikekelly/hal-browser<br/>

## Miscellaneous

<hr/>



### TZ

The timezone in which to display dates for server side rendered pages.

**Required:** true<br/>
**More information:** [Valid timezones](/docs/on-premises/environment-variables/timezones)<br/>

## API Tokens

<hr/>



### PACTFLOW_API_TOKEN_AUTH_ENABLED

Whether or not to enable the inbuilt PactFlow API tokens used for bearer authentication. Used to disable API tokens if an external Identify Provider is configured for API authentication.

**Required:** false<br/>
**Default:** `true`<br/>
**Allowed values:** `true`, `false`<br/>

### PACTFLOW_API_TOKEN_ENCRYPTION_ENABLED

Enables encryption of API token values in the database. Requires `PACTFLOW_API_TOKEN_IV` and `PACTFLOW_MASTER_ENCRYPTION_KEY` to also be set.

**Required:** false<br/>

### PACTFLOW_API_TOKEN_IV

If `PACTFLOW_API_TOKEN_ENCRYPTION_ENABLED` is set to `true`, then this value must contain a base 64 encoded string of random 16 bytes for the
encryption initialization vector.

To generate an appropriate value, run the following on Linux/Mac:

```
head < /dev/random -c 16 | base64
```

**Required:** if `PACTFLOW_API_TOKEN_ENCRYPTION_ENABLED` is set to `true`<br/>
**Example:** `JUVDdnRzLXZyWHA7UF93RAo=`<br/>

## Observability

<hr/>



**Allowed values:** `true`<br/>

### OTEL_EXPORTER_OTLP_ENDPOINT

The OTLP (HTTP) endpoint to export spans to.

**Required**: false<br/>
**Example**: `https://172.23.92.124:4318`<br/>
**Allowed values:** `true`, `false`<br/>


### OTEL_DEPLOYMENT_ENVIRONMENT

The name of the deployment environment (for example, `production`).

**Required**: false<br/>
**Default**: `dev`<br/>

### OTEL_LOG_LEVEL

Log level for the OpenTelemetry SDK instrumentation (such as `debug` or `info`).

**Required**: false<br/>
**Default**: `info`<br/>
