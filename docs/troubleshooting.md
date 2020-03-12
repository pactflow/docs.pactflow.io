---
id: troubleshooting
title: Help and troubleshooting
---

# Login Issues

## Unable to login into Pactflow

When you signup for Pactflow, you will be emailed the login details with a tempory password. This password is only valid for 7 days. If you need the password reset, email us at support@pactflow.io and we will be happy to reset it for you.

## Github login `invalid_grant: {"error":"invalid_grant"}` error

If you get an `invalid_grant` error while logging into Pactflow using Github, you'll need to clear your
browser cookies before logging in again.

## Getting a 401 Unauthorized when publishing or retrieving pacts

To publish or retrieve pacts you need to use one of the tokens from your Pactflow settings page. For publishing, you will need to use the Read/Write token. See [Settings - API Tokens](docs/user-interface#settings-api-tokens)

To use the token:

<!--DOCUSAURUS_CODE_TABS-->
<!--Gradle-->
```groovy
pact {
  serviceProviders {
    '<Service Name>' { // put the name of your service here

      hasPactsFromPactBroker('https://<YOUR_BROKER>.pact.dius.com.au/',
        authentication: ['Bearer', '<TOKEN>'])

    }
  }

  publish {
    pactBrokerUrl = 'https://<YOUR_BROKER>.pact.dius.com.au/'
    pactBrokerToken = '<TOKEN>'
  }
}
```

<!--Ruby-->
```ruby
Pact.service_provider "<Service Name>" do

  honours_pact_with '<My Service Consumer>' do
    pact_uri 'https://<YOUR_BROKER>.pact.dius.com.au', {token: '<TOKEN>'}
  end

end
```

<!--Ruby Publishing-->
```ruby
# In Rakefile

require 'pact_broker/client/tasks'

PactBroker::Client::PublicationTask.new do | task |
  require 'my_consumer/version'
  task.consumer_version = MyConsumer::VERSION
  task.pact_broker_base_url = "https://<YOUR_BROKER>.pact.dius.com.au"
  task.pact_broker_token = "<TOKEN>" # Bearer token
end
```

<!--Node-->

```js
const { Verifier } = require("@pact-foundation/pact");

// See https://github.com/pact-foundation/pact-js#provider-api-testing for all options
return new Verifier().verifyProvider({
  provider: "Animal Profile Service",
  providerBaseUrl: "http://localhost:8081",

  // Fetch pacts from broker
  pactBrokerUrl: "https://<YOUR_BROKER>.pact.dius.com.au/",
  pactBrokerToken: "<TOKEN>",

  // Fetch from broker with given tags
  tags: ["prod"],

  publishVerificationResult: true,
  providerVersion: "1.0.0"
});
```

<!--Node Publishing-->

```js
const pact = require("@pact-foundation/pact-node");
const opts = {
  pactFilesOrDirs: ["pacts/matching_service-animal_profile_service.json"],
  pactBroker: "https://<YOUR_BROKER>.pact.dius.com.au",
  pactBrokerToken: "<TOKEN>",
  consumerVersion: "1.0.1-b48bc02288f6c1e912cae579105e43d9"
};

// See https://github.com/pact-foundation/pact-node/#pact-broker-publishing for all options
pact.publishPacts(opts);
```

<!--JUnit5-->

```java
@Provider("Service Name") // put the name of your service here
@PactBroker(host = "<YOUR_BROKER>.pact.dius.com.au", scheme = "https",
  authentication = @PactBrokerAuth(scheme = "bearer", username = "<TOKEN>", password = ""))
public class PactJUnitBrokerTest {

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    void testTemplate(Pact pact, Interaction interaction, HttpRequest request, PactVerificationContext context) {
      context.verifyInteraction();
    }
}
```
<!--JUnit4-->
```java
@RunWith(PactRunner.class)
@Provider("Service Name") // put the name of your service here
@PactBroker(host = "<YOUR_BROKER>.pact.dius.com.au", scheme = "https",
  authentication = @PactBrokerAuth(scheme = "bearer", username = "<TOKEN>", password = ""))
public class PactJUnitBrokerTest {
  @TestTarget
  public final Target target = new HttpTarget(8080);
}
```

<!--Golang-->

```go
_, err := pact.VerifyProvider(t, types.VerifyRequest{
  ProviderBaseURL:            fmt.Sprintf("http://127.0.0.1:%d", port),
  BrokerURL:                  "https://<YOUR_BROKER>.pact.dius.com.au/",
  BrokerToken:                "<TOKEN>",
  PublishVerificationResults: true,
  ProviderVersion:            "1.0.0",
  StateHandlers:              stateHandlers,
  RequestFilter:              fixBearerToken,
})
```

<!--Golang Publishing-->

```go
p := dsl.Publisher{}
err := p.Publish(types.PublishRequest{
  PactURLs:        []string{"/path/to/pact/file"},
  PactBroker:      "https://<YOUR_BROKER>.pact.dius.com.au/",
  ConsumerVersion: "1.0.0",
  Tags:            []string{"prod"},
  BrokerToken:     "<TOKEN>",
})
```

<!--END_DOCUSAURUS_CODE_TABS-->

# Webhook Issues

## Webhooks blocked by firewall

You will need to whitelist the IP addresses listed on our [FAQ page](https://pactflow.io/faq/#ip-address-whitelist).
