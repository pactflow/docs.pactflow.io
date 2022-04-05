## An example scenario: Product API

To learn the basic concepts of Bi-Directional-Contract-testing, we will work through an example scenario authoring a consumer test between a consumer (Product Web) and its provider (the Product API).

![Scenario](./assets/scenario.png)

We will implement this system using an approach referred to as _specification first design_, where we will first design the API by hand and then write the actual implementation of the provider.

This is in contrast to _consumer driven contracts_ where the API consumers can drive the design of the API (read more about [consumer driven contracts](https://docs.pact.io)).

One challenge with this approach, is we need to ensure that our provider's implementation doesn't drift from the document. There are several ways to achieve this, which we will discuss in step 3.

We also need to ensure that the provider doesn't introduce a change that will break its service consumers - for this, we will use a Pactflow feature called [Bi-Directional Contract Testing](https://pactflow.io/bi-directional-contract-testing/) to ensure neither the the API Consumer or Provider can accidentally break the integration.

### Definitions

Let's get some terminology out of the way so we have a shared vocabulary:

- **Consumer**: An application that makes use of the functionality or data from another application to do its job. For applications that use HTTP, the consumer is always the application that initiates the HTTP request (eg. the web front end), regardless of the direction of data flow. For applications that use queues, the consumer is the application that reads the message from the queue.

- **Provider**: An application (often called a service) that provides functionality or data for other applications to use, often via an API. For applications that use HTTP, the provider is the application that returns the response. For applications that use queues, the provider (also called producer) is the application that writes the messages to the queue.

- A **consumer contract** is a collection of interactions which describe how the Consumer expects the Provider to behave. Each Consumer will have its own unique consumer contract for each of its Providers.

- A **provider contract** specifies the capability of the Provider. In this workshop, it will take the form of an OpenAPI document, but may be other formats such as a GraphQL schema, a SOAP XSD, a protobuf definition and so on.

### Further Reading

You can read more about this feature: https://pactflow.io/bi-directional-contract-testing/
