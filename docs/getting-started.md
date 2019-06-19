---
id: getting-started
title: Getting Started with Pactflow
---

To access Pactflow via its API, grab an API token from the settings page of your Pactflow account, and try out this command:

```console
curl -v https://<YOUR DOMAIN HERE>.pact.dius.com.au -H "Authorization: Bearer <YOUR_TOKEN_HERE>"
```

where `<YOUR DOMAIN HERE>` is the domain name for your broker (which was specified at signup) and `<YOUR_TOKEN_HERE>` is the token from the settings page.

In your tests, make sure you are using the latest version of the Pact library for your language, to ensure that the token authentication feature is supported.

Before you jump in, also make sure you've read the [Quick Start](https://github.com/pact-foundation/pact_broker/wiki) guide on the Pact Broker wiki. There is an excellent guide to [Versioning in the Pact Broker](https://docs.pact.io/getting-started/versioning-in-the-pact-broker) on the docs.pact.io website that will ensure you get the most out of Pactflow. You can find documentation on all the Pactflow screens under [Help | Pactflow User Interface Help](/docs/user-interface).

We also have a Slack workspace where you can chat with other members and get general support with the product. Join us by registering [here](http://slack.pact.io/).

If you need general Pact support, we have a number of channels you can reach us on:

* [slack.pact.io](http://slack.pact.io/)
* [https://stackoverflow.com/questions/tagged/pact](https://stackoverflow.com/questions/tagged/pact)
