---
id: troubleshooting
title: Help and Trouble shooting
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

<!--END_DOCUSAURUS_CODE_TABS-->
