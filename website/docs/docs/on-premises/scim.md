---
title: On-Premises SCIM API
---

The PactFlow SCIM API can be added as a façade to your on-premises PactFlow instance. It runs in its own
docker container and access the PactFlow APIs using a system account API token.

For details on the PactFlow SCIM API, refer to the [main SCIM documentation](/docs/scim/main).

## Installation

### First

Before running the SCIM API, you must have a correctly running PactFlow instance that is version 1.26.0 or later. Follow the
[PactFlow On-Premises installation instructions](/docs/on-premises/installation/checklist).

### Then

* Configure the SCIM Docker image to be pulled from Quay. Follow the [Docker image registry instructions](/docs/on-premises/docker-image-registry)
 to get access to the Quay registry and then run `docker pull quay.io/pactflow/scim-api` to pull down the latest SCIM API image.
* You can then deploy the docker container to your docker orchestration service (AWS ECS, K8, etc.). You need to provide the external URL of
your PactFlow instance as the `PACTFLOW_URL` environment variable to the running container.

**NOTE: The SCIM API has to access your PactFlow instance using the URL/one of the URLs listed in the [PACTFLOW_BASE_URL](/docs/on-premises/environment-variables#pactflow_base_url) environment variable used for the PactFlow application.** This is due to PactFlow using the HAL media format which uses embedded links in the responses.

For instance, if your PactFlow instance is running as `https://pactflow.mycompany.com` then you need to the set the
`PACTFLOW_URL` environment variable for the SCIM API to that address.

### Next

You can now test the running SCIM API by using a tool like `curl`. First, login to your PactFlow instance and create [a
system account](/docs/user-interface/settings/users#system-accounts) with the [SCIM role](/docs/permissions/predefined-roles#scim) and then copy the system account API token.

For instance, assuming your PactFlow instance is running as `https://pactflow.mycompany.com` and your SCIM API is
running as `https://pactflow-scim.mycompany.com` with its `PACTFLOW_URL` environment variable set to `https://pactflow.mycompany.com` and
you have copied the SCIM system account API token, you can then run `curl -H 'Authorization: Bearer <PASTE THE SERVICE TOKEN HERE>' https://pactflow-scim.mycompany.com/Users`
to fetch the users as a SCIM request.

## Docker Compose example

Here is an example docker compose setup (modified from the [PactFlow Docker Compose example](/docs/on-premises/docker-compose-example))
to show how the SCIM API can be setup alongside the PactFlow instance. Run through the [PactFlow Docker Compose example](/docs/on-premises/docker-compose-example)
first, and when that is working you can use this docker compose file to add SCIM as a façade.

### 1. Authenticating to Quay.io

Authenticate to Quay.io so that the docker engine is able to fetch our images.

```
docker login -u="<username>" -p="<password>" quay.io
docker pull quay.io/pactflow/scim-api
```

### 2. Startup PactFlow with SCIM API

Save the below file as `docker-compose.yml` into a temporary directory and then run `docker-compose up`. Make sure you
have setup the PactFlow license file correctly as per [2. PactFlow license file](/docs/on-premises/docker-compose-example#2-pactflow-license-file).

```yaml
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
      - PACTFLOW_BASE_URL=http://localhost http://pactflow:9292
      - PACTFLOW_DATABASE_URL=postgres://postgres:password@postgres/postgres
      # insecure settings only for the purposes of this demo! Not to be used in production.
      - PACTFLOW_DATABASE_SSLMODE=disable
      - PACTFLOW_REQUIRE_HTTPS=false
      - PACTFLOW_SECURE_COOKIES=false
      - PACTFLOW_LOG_FORMAT=short # normally this would be set to json, use short for demo only
      - PACTFLOW_ADMIN_API_KEY=admin
      - PACTFLOW_MASTER_SECRETS_ENCRYPTION_KEY=thisissomerandombytes
      - PACTFLOW_SAML_AUTH_ENABLED=true
      - PACTFLOW_SAML_IDP_NAME=Simple SAML
      - PACTFLOW_SAML_IDP_SSO_TARGET_URL=http://localhost:8080/simplesaml/saml2/idp/SSOService.php
      - PACTFLOW_SAML_IDP_CERT_FINGERPRINT=11:9B:9E:02:79:59:CD:B7:C6:62:CF:D0:75:D9:E2:EF:38:4E:44:5F
      - PACTFLOW_SAML_IDP_ID_ATTRIBUTE=uid
      - PACTFLOW_SAML_EMAIL_ATTRIBUTE=email
      - PACTFLOW_COOKIE_SECRET=thisisasecret
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
    image: postgres
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

  scim-api:
    image: quay.io/pactflow/scim-api
    depends_on:
      - pactflow
    environment:
      PACTFLOW_URL: "http://pactflow:9292"
      LOGGING_LEVEL_ROOT: DEBUG
      LOGGING_LEVEL_ORG_APACHE_HC_CLIENT5_HTTP_WIRE: INFO
    ports:
      - "8100:8080"

volumes:
  postgres-volume:

```

## 3. Login to PactFlow

Head to http://localhost in your browser, and choose to login with "SIMPLE SAML", with the username `user1` and password `user1pass`.
Then go to Settings -> API Tokens and COPY an API token.

## 4. Use Curl and JQ to test access to the SCIM API

Replace `<PASTE TOKEN HERE>` below with the API token copied from the last step. 

```console
❯ curl -H 'Authorization: Bearer <PASTE TOKEN HERE>'  http://localhost:8100/scim/Users | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1530  100  1530    0     0   3026      0 --:--:-- --:--:-- --:--:--  3029
{
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:ListResponse"
  ],
  "totalResults": 2,
  "Resources": [
    {
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ],
      "id": "61cfa5ff-1be6-4e7e-a620-7efac4a370df",
      "meta": {
        "created": "2022-12-06T03:49:22Z",
        "lastModified": "2022-12-06T03:49:29Z",
        "resourceType": "User",
        "location": "http://localhost:8100/scim/Users/61cfa5ff-1be6-4e7e-a620-7efac4a370df"
      },
      "name": {
        "formatted": "SCIM"
      },
      "displayName": "SCIM",
      "userType": "System Account",
      "active": true,
      "groups": [
        {
          "value": "4ac05ed8-9e3b-4159-96c0-ad19e3b93658",
          "display": "Default",
          "type": "direct",
          "$ref": "Groups/4ac05ed8-9e3b-4159-96c0-ad19e3b93658"
        }
      ],
      "roles": [
        {
          "value": "c1878b8e-d09e-11ea-8fde-af02c4677eb7",
          "display": "CI/CD",
          "type": "CI/CD"
        },
        {
          "value": "cf75d7c2-416b-11ea-af5e-53c3b1a4efd8",
          "display": "Administrator",
          "type": "Administrator"
        }
      ]
    },
    {
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ],
      "id": "aaa3e1a2-3648-4453-b3a6-2195b6822e2d",
      "meta": {
        "created": "2022-12-06T00:25:56Z",
        "lastModified": "2022-12-06T00:25:56Z",
        "resourceType": "User",
        "location": "http://localhost:8100/scim/Users/aaa3e1a2-3648-4453-b3a6-2195b6822e2d"
      },
      "userType": "User",
      "active": true,
      "emails": [
        {
          "value": "user1@example.com",
          "primary": true
        }
      ],
      "groups": [
        {
          "value": "4ac05ed8-9e3b-4159-96c0-ad19e3b93658",
          "display": "Default",
          "type": "direct",
          "$ref": "Groups/4ac05ed8-9e3b-4159-96c0-ad19e3b93658"
        }
      ],
      "roles": [
        {
          "value": "e9282e22-416b-11ea-a16e-57ee1bb61d18",
          "display": "User",
          "type": "User"
        },
        {
          "value": "cf75d7c2-416b-11ea-af5e-53c3b1a4efd8",
          "display": "Administrator",
          "type": "Administrator"
        }
      ]
    }
  ]
}
```

## Configuration

### PactFlow URL (Required) 

**Variable:** `PACTFLOW_URL`<BR/>

This sets the URL that the PactFlow instance is accessed from.

### Log Level

**Variable:** `LOGGING_LEVEL_ROOT` <BR/>
**Default:** `INFO`<BR/>
**Allowed values:** `DEBUG`, `INFO`, `WARN`, `ERROR`<BR/>

This sets the base log level for the SCIM API container. 

**WARNING: Setting the log level to `DEBUG` will cause all HTTP interactions between the SCIM API and PactFlow to be be logged, 
which will include the API tokens in clear text.** To disable logging of the HTTP interactions, set
`LOGGING_LEVEL_ORG_APACHE_HC_CLIENT5_HTTP_WIRE` to `INFO` or greater.

### Context Path

**Variable:** `SERVER_SERVLET_CONTEXT_PATH` <BR/>
**Default:** `/scim`<BR/>

This sets the context path that the SCIM API is mounted at.
