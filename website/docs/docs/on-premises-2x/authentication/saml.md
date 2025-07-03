---
title: SAML
---

PactFlow supports single sign on using the SAML authentication protocol.

Once SAML has been configured, if the database contains no users, the first user to log in will be assigned the [Administrator](/docs/permissions/predefined-roles#administrator) role, and every user thereafter will receive the default ([User](/docs/permissions/predefined-roles#user)) role.

## Configuration

A SAML provider is configured by a set of environment variables prefixed with `PACTFLOW_SAML_`. See the [SAML](/docs/on-premises-2x/environment-variables#saml-authentication) section of the environment variables page for the full list.

## Assertion Consumer URL

This is the endpoint to which the IDP will post the SAML assertion after the user is authenticated. It is also called the "sign on URL", "reply URL", and "callback URL", depending on your IDP. You will need to configure this value in your IDP when you set up the PactFlow service provider.

The URL is `https://<your PactFlow host>/auth/saml/callback`.

## Metadata URL

The PactFlow SAML service provider metadata URL is available at `https://<your PactFlow host>/auth/saml/metadata`.

## Configuring multiple SAML providers

In PactFlow 1.7.0 and later, multiple SAML providers may be configured. To configure a second SAML provider, create another set of the [SAML environment variables](/docs/on-premises-2x/environment-variables#saml-authentication) with the prefix `PACTFLOW_SAML_2_` (and `PACTFLOW_SAML_3_` for the third, etc). The `PACTFLOW_SAML_ISSUER` does not need to be specified again, as it is shared between all SAML providers.

The callback path for the second provider is `/auth/saml/2/callback`, and for the third `/auth/saml/3/callback` etc. The path for the metadata for subsequent SAML providers will be `/auth/saml/2/metadata`, `/auth/saml/3/metadata` etc.

## Configuring Azure Active Directory

### Create a non gallery application

* Follow the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-non-gallery-app) for creating a non gallery application.
  * Choose `Non-gallery application` at the `Add your own app` screen.
  * Set the name to `PactFlow On-Premesis` when prompted.

* When the application has been created, assign the users that should be allowed to login to PactFlow.

* Once the users have been assigned, select the `Single sign-on` tab. Select `SAML`.

* Set the Identifier (Entity ID) to `https://pactflow.<your company domain>` eg. `https://pactflow.mycompany.com`. This field must match the [PACTFLOW_SAML_ISSUER]../(environment-variables#pactflow_saml_issuer) environment variable.

* Set the Reply URL to `https://<your PactFlow host>/auth/saml/callback`

* Leave the Sign On URL, Relay State and Logout Url fields blank.

### Configure the PactFlow environment variables

You can find a template for the required environment variables [here](/docs/on-premises-2x/environment-variables/templates#azure-active-directory).

* Set the [PACTFLOW_SAML_ISSUER](/docs/on-premises-2x/environment-variables#pactflow_saml_issuer) to the `Identifier (Entity ID)`.
* Set the [PACTFLOW_SAML_IDP_SSO_TARGET_URL](/docs/on-premises-2x/environment-variables#pactflow_saml_idp_sso_target_url) to the `Login URL`.
* Set the [PACTFLOW_SAML_IDP_ENTITY_ID](/docs/on-premises-2x/environment-variables#pactflow_saml_idp_entity_id) to the `Azure AD Identifier`
* Set the [PACTFLOW_SAML_IDP_CERT_FINGERPRINT](/docs/on-premises-2x/environment-variables#pactflow_saml_idp_cert_fingerprint) to the `Thumbprint`
* Set the [PACTFLOW_SAML_IDP_NAME](/docs/on-premises-2x/environment-variables#pactflow_saml_idp_name) to your choice - this is a display name for the login button.
* Set the identifier, email and name attributes as per the [template](/docs/on-premises-2x/environment-variables#/templates#azure-active-directory).


## Docker Compose Example

Follow [steps 1 and 2](/docs/on-premises-2x/docker-compose-example) from the Docker Compose example that uses Demo Auth, then use the following `docker-compose.yml` file to run your services.

```
version: "3"

services:
  simplesaml:
    image: kristophjunge/test-saml-idp
    logging:
      driver: none # comment out the logging config to see the SAML server logs
    ports:
      - "8080:8080"
      - "8443:8443"
    environment:
     - SIMPLESAMLPHP_SP_ENTITY_ID=https://pactflow.io
     - SIMPLESAMLPHP_SP_ASSERTION_CONSUMER_SERVICE=http://localhost/auth/saml/callback

  pactflow:
    image: quay.io/pactflow/enterprise
    depends_on:
      - postgres
    environment:
      - PACTFLOW_HTTP_PORT=9292
      - PACTFLOW_BASE_URL=http://localhost
      - PACTFLOW_DATABASE_URL=postgres://postgres:password@postgres/postgres
      # insecure settings only for the purposes of this demo! Not to be used in production.
      - PACTFLOW_DATABASE_SSLMODE=disable
      - PACTFLOW_REQUIRE_HTTPS=false
      - PACTFLOW_LOG_FORMAT=short # normally this would be set to json, use short for demo only
      - PACTFLOW_ADMIN_API_KEY=admin
      - PACTFLOW_MASTER_SECRETS_ENCRYPTION_KEY=thisissomerandombytes
      - PACTFLOW_SAML_AUTH_ENABLED=true
      - PACTFLOW_SAML_IDP_NAME=Simple SAML
      - PACTFLOW_SAML_IDP_SSO_TARGET_URL=http://localhost:8080/simplesaml/saml2/idp/SSOService.php
      - PACTFLOW_SAML_IDP_CERT_FINGERPRINT=11:9B:9E:02:79:59:CD:B7:C6:62:CF:D0:75:D9:E2:EF:38:4E:44:5F
      - PACTFLOW_SAML_IDP_ID_ATTRIBUTE=uid
      - PACTFLOW_SAML_EMAIL_ATTRIBUTE=email
      - PACTFLOW_COOKIE_SECRET=at-least-64-char-secret---------at-least-64-char-secret---------
      - PACT_BROKER_ADMIN_API_KEY=admin
      - PACTFLOW_WEBHOOK_HOST_WHITELIST=/.*/
    ports:
      - "80:9292"
    healthcheck:
      test: ["CMD", "wget", "-nv", "-t1", "--spider", "http://localhost:9292/diagnostic/status/heartbeat"]
      interval: 30s
      timeout: 10s
      retries: 3
    entrypoint: dockerize
    command: -wait tcp://postgres:5432 docker-entrypoint
    volumes:
      - ./pactflow-onprem.lic:/home/pactflow-onprem.lic

  postgres:
    image: postgres:13-alpine
    healthcheck:
      test: psql postgres --command "select 1" -U postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres-volume:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres

volumes:
  postgres-volume:
```
