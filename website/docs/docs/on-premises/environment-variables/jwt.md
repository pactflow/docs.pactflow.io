# Environment Variables - JWT 

<head>
  <meta name="robots" content="noindex"/>
</head>

## JWT bearer authentication

<hr/>
These settings can be configured in a YAML file, as per this example.

```yaml
jwt_bearer_token_auth_enabled: true
jwt_bearer_token:
  issuer: https://idp
  audience: some-aud
  expiry_leeway: 60
  jwks_url: https://idp/jwks
  auth_config_handler: auth_ext_script.rb
  claim_mappings:
    idp_id: SomeUniqueIdentifier
    email: EmailAddress
    name: DisplayName
    first_name: FirstName
    last_name: LastName
  ```


### PACTFLOW_JWT_BEARER_TOKEN_AUTH_ENABLED

Whether or not to enable JWT bearer token authentication.

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>
**Default:** `false`<br/>
**Allowed values:** `true`, `false`<br/>

### PACTFLOW_JWT_BEARER_TOKEN\_\_JWKS_URL

The endpoint from which the JSON web key set can be retrieved to decode and verify the JWT used as the bearer token.

**Supported versions:** From v1.16.0<br/>
**Required:** true<br/>

### PACTFLOW_JWT_BEARER_TOKEN\_\_AUDIENCE

The expected token audience ("aud") of the JWT.

**Supported versions:** From v1.16.0<br/>
**Required:** true<br/>

### PACTFLOW_JWT_BEARER_TOKEN\_\_ISSUER

The expected token issuer ("iss") of the JWT.

**Supported versions:** From v1.16.0<br/>
**Required:** true<br/>

### PACTFLOW_JWT_BEARER_TOKEN\_\_EXPIRY_LEEWAY

The number of seconds of leeway to allow when verifying the expiration of the JWT, to allow for click drift between Pactlow and the Identity Provider.

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>
**Default:** `0`<br/>

### PACTFLOW_JWT_BEARER_TOKEN\_\_AUTH_CONFIG_HANDLER

The name of a Ruby script which will parse the decoded JWT and extract the roles and teams associated with the user. The script must be mounted into the Pactflow Docker container in the directory `/home/pactflow/extensions`.

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>

### PACTFLOW_JWT\_\_CLAIM_MAPPINGS\_\_{KEY}

This setting maps the IDP's claims in the JWT to the required Pactflow user attributes. This setting is best configured in the YAML file as a map.
At least one of the keys must be called `sub` or `idp_id`. This will be used by Pactflow to uniquely identify the user from the Identify Provider.
The other recommended keys are `name`, `email`, `first_name` and `last_name`.

eg.

```yaml
jwt_bearer_token_auth_enabled: true
jwt_bearer_token:
  # other configurations here ...
  claim_mappings:
    idp_id: "SomeUniqueIdentifier"
    name: "Name"
    email: "Email"
    first_name: "FirstName"
    last_name: "LastName"
```

When setting the claim mappings using environment variables, a separate environment variable must be used for each claim mapping.
The key name must be uppercased and prefixed by `PACTFLOW_JWT__CLAIM_MAPPINGS__`.

eg.

```shell
PACTFLOW_JWT__CLAIM_MAPPINGS__IDP_ID="SomeUniqueIdentifier"
PACTFLOW_JWT__CLAIM_MAPPINGS__NAME="Name"
PACTFLOW_JWT__CLAIM_MAPPINGS__EMAIL="Email"
PACTFLOW_JWT__CLAIM_MAPPINGS__FIRST_NAME="FirstName"
PACTFLOW_JWT__CLAIM_MAPPINGS__LAST_NAME="LastName"
````

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>

