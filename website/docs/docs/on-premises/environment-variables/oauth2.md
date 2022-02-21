# Environment Variables - OAuth2 

<head>
  <meta name="robots" content="noindex"/>
</head>

## OAuth2 authentication

<hr/>
These settings can be configured in a YAML file, as per this example.

```yaml
oauth2_auth_enabled: true
oauth2:
  client_id: "..."
  client_secret: "..."
  idp_name: "Some IDP"
  idp_url: "https://idp"
  authorize_url: "https://idp/authorize"
  token_url: "https://idp/token"
  jwks_url: "https://idp/jwks"
  token_issuer: "https://idp"
  token_audience: "..."
  token_expiry_leeway: 60
  auth_config_handler: "auth_ext_script.rb"
  custom_authorize_params:
    resource: "SomeResource"
  claim_mappings:
    idp_id: "SomeUniqueIdentifier"
    email: "Email"
    name: "DisplayName"
    first_name: "FirstName"
    last_name: "LastName"
```


### PACTFLOW_OAUTH2_AUTH_ENABLED

Whether or not to enable OAuth2 authentication.

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>
**Default:** `false`<br/>
**Allowed values:** `true`, `false`<br/>

### PACTFLOW_OAUTH2\_\_CLIENT_ID

The unique identier by which the Pactflow application is known to the identity provider.

**Supported versions:** From v1.16.0<br/>
**Required:** true<br/>

### PACTFLOW_OAUTH2\_\_CLIENT_SECRET

The client secret which the Pactflow application shares with the identity provider.

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>

### PACTFLOW_OAUTH2\_\_IDP_NAME

The identity provider's name. This value will appear on the login button.

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>

### PACTFLOW_OAUTH2\_\_IDP_URL

The identity provider's URL.

**Supported versions:** From v1.16.0<br/>
**Required:** true<br/>

### PACTFLOW_OAUTH2\_\_AUTHORIZE_URL

The authorize endpoint of the OAuth2 provider.

**Supported versions:** From v1.16.0<br/>
**Required:** true<br/>

### PACTFLOW_OAUTH2\_\_TOKEN_URL

The endpoint at which Pactflow can retrieve the JWT containing the user's information.

**Supported versions:** From v1.16.0<br/>
**Required:** true<br/>

### PACTFLOW_OAUTH2\_\_JWKS_URL

The endpoint from which the JSON web key set can be retrieved to decode and verify the JWT returned by the token endpoint.

**Supported versions:** From v1.16.0<br/>
**Required:** true<br/>

### PACTFLOW_OAUTH2\_\_TOKEN_ISSUER

The expected token issuer ("iss") of the JWT.

**Supported versions:** From v1.16.0<br/>
**Required:** true<br/>

### PACTFLOW_OAUTH2\_\_TOKEN_AUDIENCE

The expected token audience ("aud") of the JWT.

**Supported versions:** From v1.16.0<br/>
**Required:** true<br/>

### PACTFLOW_OAUTH2\_\_TOKEN_EXPIRY_LEEWAY

The number of seconds of leeway to allow when verifying the expiration of the JWT, to allow for click drift between Pactlow and the Identity Provider.

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>
**Default:** `0`<br/>

### PACTFLOW_OAUTH2\_\_AUTH_CONFIG_HANDLER

The name of a Ruby script which will parse the decoded JWT and extract the roles and teams associated with the user. The script must be mounted into the Pactflow Docker container in the directory `/home/pactflow/extensions`.

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>

### PACTFLOW_OAUTH2\_\_CUSTOM_AUTHORIZE_PARAMS\_\_{KEY}

Allows custom authorize parameters to be set. These will be sent to the IDP in the request phase along with the default authorize parameters.

eg.

```yaml
oauth2:
  custom_authorize_params:
    resource: "SomeResource"
```

When setting the custom authorize params using environment variables, the key name must be uppercased and prefixed by `PACTFLOW_OAUTH2__CUSTOM_AUTHORIZE_PARAMS__`
eg. `PACTFLOW_OAUTH2__CUSTOM_AUTHORIZE_PARAMS__RESOURCE=SomeResource`. This will be mapped to a lower case `{ "resource": "SomeResource" }` internally.

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>

### PACTFLOW_OAUTH2\_\_CUSTOM_TOKEN_PARAMS\_\_{KEY}

Allows custom token parameters to be set. These will be sent to the token endpoint along with the default token parameters.

eg.

```yaml
oauth2:
  custom_token_params:
    resource: "SomeResource"
```

When setting the custom token params using environment variables, the key name must be uppercased and prefixed by `PACTFLOW_OAUTH2__CUSTOM_TOKEN_PARAMS__`
eg. `PACTFLOW_OAUTH2__CUSTOM_TOKEN_PARAMS__RESOURCE=SomeResource`. This will be mapped to a lower case `{ "resource": "SomeResource" }` internally.

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>

### PACTFLOW_OAUTH2\_\_CLAIM_MAPPINGS\_\_{KEY}

This setting maps the IDP's claims in the JWT to the required Pactflow user attributes. This setting is best configured in the YAML file as a map.
At least one of the keys must be called `sub` or `idp_id`. This will be used by Pactflow to uniquely identify the user from the Identify Provider.
The other recommended keys are `name`, `email`, `first_name` and `last_name`.

eg.

```yaml
oauth2:
  # other configurations here ...
  claim_mappings:
    idp_id: "SomeUniqueIdentifier"
    name: "Name"
    email: "Email"
    first_name: "FirstName"
    last_name: "LastName"
```

When setting the claim mappings using environment variables, a separate environment variable must be used for each claim mapping.
The key name must be uppercased and prefixed by `PACTFLOW_OAUTH2__CLAIM_MAPPINGS__`.

eg.

```shell
PACTFLOW_OAUTH2__CLAIM_MAPPINGS__IDP_ID="SomeUniqueIdentifier"
PACTFLOW_OAUTH2__CLAIM_MAPPINGS__NAME="Name"
PACTFLOW_OAUTH2__CLAIM_MAPPINGS__EMAIL="Email"
PACTFLOW_OAUTH2__CLAIM_MAPPINGS__FIRST_NAME="FirstName"
PACTFLOW_OAUTH2__CLAIM_MAPPINGS__LAST_NAME="LastName"
````

**Supported versions:** From v1.16.0<br/>
**Required:** false<br/>
