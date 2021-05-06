---
id: getting-started
title: Getting Started with Pactflow
slug: /
---

Pactflow is a fully-managed, highly-available, and hardened deployment of the open source "Pact Broker" with a re-imagined user experience. It allows you to integrate Pact into your CI/CD pipelines by providing a central point for managing your consumer driven contracts.

## Tutorials

### Videos

We've created an introductory level [video series on contract-testing](https://youtube.com/playlist?list=PLwy9Bnco-IpfZ72VQ7hce8GicVZs7nm0i) to help you learn and understand what it's all about.

### Workshops

To get you started, we have created a several short in-browser [tutorials](/docs/tutorials). If you're new to Pact, or want some help integrating to Pactflow, you should start here.

If you want something a little more in-depth, check out [Pactflow University](/docs/workshops).

## Essential reading

Here are some key resources to help you on your way:

* [How Pact works](https://pactflow.io/how-pact-works)
* The [Pact Broker overview](https://docs.pact.io/pact_broker/overview)
* [Versioning in the Pact Broker](https://docs.pact.io/getting_started/versioning_in_the_pact_broker)
* [General Pact documentation](https://docs.pact.io)
* You can find documentation on all the Pactflow screens under [Pactflow User Interface](/docs/user-interface/dashboard).

We also have a Slack workspace where you can chat with other members and get general support with the product. Join us by registering [here](http://slack.pact.io/).

If you need general Pact support, we have a number of channels you can reach us on:

* [slack.pact.io](http://slack.pact.io/)
* [https://stackoverflow.com/questions/tagged/pact](https://stackoverflow.com/questions/tagged/pact)

If you need Pactflow specific support, you can email us at <a href="mailto:support@pactflow.io">support@pactflow.io</a>.

## Configuring your API token

**NOTE: You cannot use your username and password to access the Pactflow API.**

To publish or verify pacts you need to use one of the bearer tokens from the [API Tokens](docs/user-interface/settings/api-tokens) section of your Pactflow settings page.

Open your Pactflow account in a browser and log in with your username and password. Click on the settings icon (the cog wheel icon at the top right of the screen).

You will see the API Tokens page with two tokens listed - a read only token, and a read/write token.

![API Token Screen](/ui/api-tokens.png)

Pacts and verification results are generally only published from a CI machine, so use the read only token on a local development machine, and keep the read/write token for CI.

While each of the following examples shows the use of a hardcoded token, note that you would normally be accessing the token via an environment variable or build parameter that is stored and provided in a secure manner (eg. a Jenkins build secret or a Travis encrypted environment variable).

To configure the token:

### Pact JS (Node JS)
<!--DOCUSAURUS_CODE_TABS-->
<!--Node-->

#### Consumer


```js
const { Publisher } = require("@pact-foundation/pact")
const opts = {
  pactBroker: 'https://<YOUR_BROKER>.pactflow.io',
  pactBrokerToken: '<TOKEN>',
  consumerVersion: process.env.GIT_COMMIT
  pactFilesOrDirs: ['./pacts'],
};

new Publisher(opts).publishPacts()
```

See the [Pact-JS documentation](https://github.com/pact-foundation/pact-node/#pact-broker-publishing) for all the pact publication options.

#### Provider


```js
const { Verifier } = require('@pact-foundation/pact');

return new Verifier().verifyProvider({
  provider: '<Your provider name here>',
  providerBaseUrl: 'http://localhost:8081',

  // Fetch pacts from broker
  pactBrokerUrl: 'https://<YOUR_BROKER>.pactflow.io/',
  pactBrokerToken: '<TOKEN>',

  publishVerificationResult: process.env.CI === 'true',
  providerVersion: process.env.GIT_COMMIT
});
```

See the [Pact-JS documentation](https://docs.pact.io/implementation_guides/javascript/readme#verification-options) for all the pact verification options.

<!--Gradle -->
### Gradle

#### Consumer

```groovy
pact {
  publish {
    providerVersion = {  '<GIT_COMMIT>' } //yes, this field name is correct :(
    pactBrokerUrl = 'https://<YOUR_BROKER>.pactflow.io/'
    pactBrokerToken = '<TOKEN>'
  }
}
```

See the [Pact-JVM documentation](https://docs.pact.io/implementation_guides/jvm/provider/gradle#publishing-pact-files-to-a-pact-broker) for all the pact publication options.

#### Provider

```groovy
// To turn on the verification publishing,
// set the project property `pact.verifier.publishResults` to `true`

pact {
  serviceProviders {
    '<Your provider name here>' {

      providerVersion = { '<GIT_COMMIT>' }
      hasPactsFromPactBroker('https://<YOUR_BROKER>.pactflow.io/',
        authentication: ['Bearer', '<TOKEN>'])

    }
  }
}
```

See the [Pact-JVM documentation](https://docs.pact.io/implementation_guides/jvm/provider/gradle#publishing-verification-results-to-a-pact-broker) for all the pact verification options.

<!--Java - JUnit5-->
### Java / JUnit 5

#### Consumer

See the Gradle documentation.


#### Provider

```java
@Provider("<Your provider name here>")
@PactBroker(host = "<YOUR_BROKER>.pactflow.io", scheme = "https",
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
### Java / JUnit 4

#### Consumer

See the Gradle documentation.

#### Provider

```java
@RunWith(PactRunner.class)
@Provider("<Your provider name here>")
@PactBroker(host = "<YOUR_BROKER>.pactflow.io", scheme = "https",
  authentication = @PactBrokerAuth(scheme = "bearer", username = "<TOKEN>", password = ""))
public class PactJUnitBrokerTest {
  @TestTarget
  public final Target target = new HttpTarget(8080);
}
```

<!--Golang-->
### Golang

#### Consumer

```go
p := dsl.Publisher{}
err := p.Publish(types.PublishRequest{
  PactURLs:        []string{"/path/to/pact/file"},
  PactBroker:      "https://<YOUR_BROKER>.pactflow.io",
  ConsumerVersion: "<GIT_COMMIT>",
  BrokerToken:     "<TOKEN>",
})
```

#### Provider

```go
_, err := pact.VerifyProvider(t, types.VerifyRequest{
  ProviderBaseURL:            fmt.Sprintf("http://127.0.0.1:%d", port),
  BrokerURL:                  "https://<YOUR_BROKER>.pactflow.io",
  BrokerToken:                "<TOKEN>",
  PublishVerificationResults: true,
  ProviderVersion:            "<GIT_COMMIT>"
})
```

<!--Ruby-->
### Ruby

#### Consumer


```ruby
# In your Rakefile

require 'pact_broker/client/tasks'

PactBroker::Client::PublicationTask.new do | task |
  task.consumer_version = ENV['GIT_COMMIT']
  task.pact_broker_base_url = "https://<YOUR_BROKER>.pactflow.io"
  task.pact_broker_token = "<TOKEN>"
end
```

See the [Pact Ruby documentation](https://github.com/pact-foundation/pact_broker-client#usage---ruby) for all the pact publishing options.

#### Provider

```ruby
# In your spec/pact_helper.rb

Pact.service_provider "<Your provider name here>" do
  app_version ENV['GIT_COMMIT']
  publish_verification_results ENV['CI'] == 'true'

  honours_pacts_from_pact_broker do
    pact_broker_base_url "https://<YOUR_BROKER>.pactflow.io", { token: "<TOKEN>" }
  end
end
```

See the [Pact Ruby documentation](https://docs.pact.io/implementation_guides/ruby/verifying_pacts/) for all the verification options.

<!-- .NET -->
### .NET

#### Consumer

##### PowerShell

```Powershell
# Ensure TLS1.2 is set, otherwise it will default to TLS1.0 and you won't be able to connect
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$res = Invoke-WebRequest -Uri "https://<YOUR_BROKER>.pactflow.io/pacts/provider/AProvider/consumer/AConsumer/version/SomeVersion" -Method Put -InFile .\a_consumer-a_provider.json -ContentType "application/json" -Headers @{'Authorization' = 'Bearer <your token here>'}
```

##### C\#

```csharp
var pactPublisher = new PactPublisher("http://<YOUR_BROKER>.pactflow.io",
  new PactUriOptions("<TOKEN>"));
pactPublisher.PublishToBroker("/pact/to/pacts/dir",
  Environment.GetEnvironmentVariable("GIT_COMMIT"));
```

See the [PactNet documentation](https://github.com/pact-foundation/pact-net#using-the-c-client) for all the pact publishing options.

#### Provider

```csharp

var config = new PactVerifierConfig
{
    ProviderVersion = Environment.GetEnvironmentVariable("GIT_COMMIT")
    PublishVerificationResults = "true".Equals(Environment.GetEnvironmentVariable("CI"))
};

IPactVerifier pactVerifier = new PactVerifier(config);
pactVerifier
    .ServiceProvider("<Your provider name here>", "http://your-test-provider-url")
   .PactBroker("https://<YOUR_BROKER>.pactflow.io", uriOptions: new PactUriOptions("<TOKEN>"))
   .Verify();
```

See the [PactNet documentation](https://github.com/pact-foundation/pact-net#publishing-provider-verification-results-to-a-broker) for all the pact verification options.

<!-- Docker -->
### Docker
#### Consumer

```bash

docker run --rm \
 -v ${PWD}:${PWD} \
 -e PACT_BROKER_BASE_URL="https://<YOUR_BROKER>.pactflow.io" \
 -e PACT_BROKER_TOKEN="<TOKEN>" \
  pactfoundation/pact-cli:latest \
  publish \
  ${PWD}/pacts \
  --consumer-app-version ${GIT_COMMIT}

```

See the [Pact CLI Docker documentation](https://hub.docker.com/r/pactfoundation/pact-cli) for all the pact publishing options.

#### Provider

```yaml
version: "3"

services:
  api:
    image: "your image"
    expose:
      - "9292"

  pact_verifier:
    image: pactfoundation/pact-cli:latest
    depends_on:
      - api
    environment:
      - PACT_BROKER_BASE_URL="https://<YOUR_BROKER>.pactflow.io"
      - PACT_BROKER_TOKEN="<TOKEN>"
    command: >
      verify
      --provider-base-url http://api:9292
      --provider "<Your provider name here>"
```

```bash
docker-compose -f docker-compose-verify.yml up \
    --build --abort-on-container-exit --exit-code-from pact_verifier

```

<!--END_DOCUSAURUS_CODE_TABS-->