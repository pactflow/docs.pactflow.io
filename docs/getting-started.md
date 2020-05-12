---
id: getting-started
title: Getting Started with Pactflow
---

Before you jump in, here are some resources to get you started:

* The [Pact Broker overview](https://docs.pact.io/pact_broker/overview)
* [Versioning in the Pact Broker](https://docs.pact.io/getting_started/versioning_in_the_pact_broker)
* You can find documentation on all the Pactflow screens under [Help | Pactflow User Interface Help](/docs/user-interface).

We also have a Slack workspace where you can chat with other members and get general support with the product. Join us by registering [here](http://slack.pact.io/).

If you need general Pact support, we have a number of channels you can reach us on:

* [slack.pact.io](http://slack.pact.io/)
* [https://stackoverflow.com/questions/tagged/pact](https://stackoverflow.com/questions/tagged/pact)

If you need Pactflow specific support, you can email us at <a href="mailto:support@pactflow.io">support@pactflow.io</a>.

## Configuring your API token

**NOTE: You cannot use your username and password to access the Pactflow API.**

To publish or verify pacts you need to use one of the bearer tokens from the [API Tokens](user-interface#settings-api-tokens) section of your Pactflow settings page.

Open your Pactflow account in a browser and log in with your username and password. Click on the settings icon (the cog wheel icon at the top right of the screen).

You will see the API Tokens page with two tokens listed - a read only token, and a read/write token.

![API Token Screen](assets/ui/api-tokens.png)

Pacts and verification results are generally only published from a CI machine, so use the read only token on a local development machine, and keep the read/write token for CI.

While each of the following examples shows the use of a hardcoded token, note that you would normally be accessing the token via an environment variable or build parameter that is stored and provided in a secure manner (eg. a Jenkins build secret or a Travis encrypted environment variable).

To configure the token:

<!--DOCUSAURUS_CODE_TABS-->
<!--Node-->

#### Consumer


```js
const pact = require("@pact-foundation/pact-node");
const opts = {
  pactBroker: 'https://<YOUR_BROKER>.pact.dius.com.au',
  pactBrokerToken: '<TOKEN>',
  consumerVersion: process.env.GIT_COMMIT
  pactFilesOrDirs: ['./pacts'],
};

pact.publishPacts(opts);
```

See the [Pact-JS documentation](https://github.com/pact-foundation/pact-node/#pact-broker-publishing) for all the pact publication options.

#### Provider


```js
const { Verifier } = require('@pact-foundation/pact');

return new Verifier().verifyProvider({
  provider: 'Your provider name here',
  providerBaseUrl: 'http://localhost:8081',

  // Fetch pacts from broker
  pactBrokerUrl: 'https://<YOUR_BROKER>.pact.dius.com.au/',
  pactBrokerToken: '<TOKEN>',

  publishVerificationResult: process.env.CI === 'true',
  providerVersion: process.env.GIT_COMMIT
});
```

See the [Pact-JS documentation](https://github.com/pact-foundation/pact-js#verification-options) for all the pact verification options.

<!--Gradle -->

#### Consumer

```groovy
pact {
  publish {
    pactBrokerUrl = 'https://<YOUR_BROKER>.pact.dius.com.au/'
    pactBrokerToken = '<TOKEN>'
  }
}
```

#### Provider

```groovy
pact {
  serviceProviders {
    'Your provider name here' {

      hasPactsFromPactBroker('https://<YOUR_BROKER>.pact.dius.com.au/',
        authentication: ['Bearer', '<TOKEN>'])

    }
  }
}
```

<!--Ruby-->

#### Consumer


```ruby
# In your Rakefile

require 'pact_broker/client/tasks'

PactBroker::Client::PublicationTask.new do | task |
  task.consumer_version = ENV['GIT_COMMIT']
  task.pact_broker_base_url = "https://<YOUR_BROKER>.pact.dius.com.au"
  task.pact_broker_token = "<TOKEN>"
end
```

See the [Pact Ruby documentation](https://github.com/pact-foundation/pact_broker-client#usage---ruby) for all the pact publishing options.

#### Provider


```ruby
# In your spec/pact_helper.rb

Pact.service_provider "Your provider name here" do
  app_version ENV['GIT_COMMIT']
  publish_verification_results ENV['CI'] == 'true'

  honours_pacts_from_pact_broker do
    pact_broker_base_url "https://<YOUR_BROKER>.pact.dius.com.au", { token: "<TOKEN>" }
  end
end
```

See the [Pact Ruby documentation](https://github.com/pact-foundation/pact-ruby/wiki/Verifying-pacts#fetching-pacts-from-a-pact-broker) for all the verification options.

<!--Java - JUnit5-->

#### Provider

```java
@Provider("Your provider name here")
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
<!-- Java - JUnit4-->

#### Provider

```java
@RunWith(PactRunner.class)
@Provider("Your provider name here")
@PactBroker(host = "<YOUR_BROKER>.pact.dius.com.au", scheme = "https",
  authentication = @PactBrokerAuth(scheme = "bearer", username = "<TOKEN>", password = ""))
public class PactJUnitBrokerTest {
  @TestTarget
  public final Target target = new HttpTarget(8080);
}
```

<!--Golang-->

#### Consumer

```go
p := dsl.Publisher{}
err := p.Publish(types.PublishRequest{
  PactURLs:        []string{"/path/to/pact/file"},
  PactBroker:      "https://<YOUR_BROKER>.pact.dius.com.au/",
  ConsumerVersion: "1.0.0",
  BrokerToken:     "<TOKEN>",
})
```

#### Provider

```go
_, err := pact.VerifyProvider(t, types.VerifyRequest{
  ProviderBaseURL:            fmt.Sprintf("http://127.0.0.1:%d", port),
  BrokerURL:                  "https://<YOUR_BROKER>.pact.dius.com.au/",
  BrokerToken:                "<TOKEN>",
  PublishVerificationResults: true,
  ProviderVersion:            "1.0.0"
})
```

<!--END_DOCUSAURUS_CODE_TABS-->