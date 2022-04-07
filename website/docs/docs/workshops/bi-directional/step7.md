# 7. Write consumer tests

Now is the time to write consumer tests using your mocking tool of choice, and convert those mocks into a consumer contract.

## Consumer Contract Test

Now that we have written our consumer code, we need to test it, and ensure that it is compatible with its provider.

### Scope of a consumer contract test

Ideally, contract tests should be closer to a _unit test_ for your API client class, and they should just focus on ensuring that the request creation and response handling are correct. Running in the context of a unit testing framework (Jest, JUnit, PHPUnit etc.) will give you the most flexible and reliable tests - even if the test is not strictly a unit test by definition.

_NOTE: In Bi-Directional Contract Testing however, you don't need to worry as much if these tests overlap into functional or other forms of tests like you would with Pact. This means they may be higher level - including initiated via a UI test (see this [Cypress example](https://github.com/pactflow/example-bi-directional-consumer-cypress))._

Usually, your application will be broken down into a number of sub-components, depending on what type of application your consumer is \(e.g. a Web application or another API\). This is how you might visualise the focus of a consumer contract test:

![Scope of a consumer contract test](../../../../static/workshops/bi-directional/consumer-test-coverage.png)

Here, a _Collaborator_ is a component whose job is to communicate with another system. In our case, this is the `API` class communicating with the external `Product API` system. This is what we want our consumer test to inspect.

### Choosing a contract testing strategy

Pactflow currently supports pact files as a consumer contract format. In order to produce a consumer contract, you need to decide on a testing approach to capture the contract:

1. Use [Pact](https://docs.pact.io) - this will be the default choice for many, as it can both mock the API calls and produce a pact file
2. Use an existing mocking tools such as Wiremock or Mountebank, or record/replay tools (such as VCR or Polly), and convert the mocks to a pact file after a successful run.

[Read more](https://docs.pactflow.io/docs/bi-directional-contract-testing/contracts/pact#strategies-to-capture-consumer-contracts) on these strategies.

As there are plenty of [example projects](https://docs.pactflow.io/docs/examples) for how to write Pact tests, _we will choose option (2)_ and use [Mountebank](http://mbtest.org/) to mock our APIs so you have a model to follow for your specific mocking tool.

### The contract test

Let's dive in! First, let's open up the API spec and go through the key bits: `example-bi-directional-consumer-mountebank/src/api.spec.js`

The following key libraries and tools are used:

1. Mountebank - for stubbing API behaviour
2. Jest - for running our unit tests and providing assertions

#### Setup

At the start of our test, we configure a few important lifecycle hooks:

```javascript
const mb = new Mountebank(); // (1)
const api = new ProductAPIClient(`http://localhost:${imposterPort}`); // (2)
const imposter = new Imposter() // (3)
  .withPort(imposterPort)
  .withRecordRequests(true);

beforeAll(() => startAndClearStubs()); // (4)
afterEach(() => writeStubs(mb, imposterPort)); // (5)
afterAll(() => stopStubs()); // (6)
```

1. First, we use a [neat little library](https://github.com/AngelaE/ts-mountebank) that wraps the Mountebank API for us, enabling us to configure Mountebank mocks in code.
1. We create a new `ProductAPIClient`, directing it to send API calls to the Mountebank mock server, instead of the real one
1. We create a new Imposter (Mountebank's term for creating a mock) that we'll use to mock out various API calls

We then have a few lifecycle methods:

4. Before any tests run, we must start the Mountebank mock server
5. After each test, we will use a little utility to inspect what mocks were called, and write them to a pact file
6. At the end of all tests, we shut down the Mountebank process

#### Test

Now that we have the infrastructure in place, we can simply write our tests.

```javascript
describe("retrieving products", () => {
  test("products exists", async () => {
    // (1) Arrange
    imposter.withStub(
      new Stub()
        .withPredicate(
          new EqualPredicate().withMethod(HttpMethod.GET).withPath("/products")
        )
        .withResponse(
          new Response().withStatusCode(200).withJSONBody([expectedProduct])
        )
    );
    await mb.createImposter(imposter);

    // (2) Act
    const products = await api.getAllProducts();

    // (3) Assert that we got the expected response
    expect(products).toStrictEqual([new Product(expectedProduct)]);
  });
});
```

There's a lot here, so let's break it down a little.

4. _Arrange_: we tell Mountebank what we're expecting our code to do and what we expect the provider to return when we do it
5. _Act_: we execute the call to the API method we wish to test
6. _Assert_: we check that our call to `getAllProducts()` worked as expected. This should just do what a regular unit test of this method does.

After each `test` block finishes successfully, the `afterEach` block will append the new interaction to our contract file.

#### Producing a (reliable, valid) pact file

To generate our pact file, we have created a few helper functions to inspect Mountebank and write the mocks to file

- `example-bi-directional-consumer-mountebank/test/mountebank.js`
- `example-bi-directional-consumer-mountebank/test/mountebankSerialiser.js`

To extract the mock information, we have a few choices (see http://www.mbtest.org/docs/api/mocks). In this case, when we start Mountebank, we actually pass the `--debug` [flag](http://www.mbtest.org/docs/commandLine#start) giving us a really important behaviour:

> Include a `matches` array with each stub in the body of a GET imposter response for debugging why a particular stub did or did not match a request. Every time a response from the stub is used, a match will be added containing the request, the response configuration, the actual generated response (even if it is proxied), and the overall processing time.

This means we can inspect this information to only serialise what our API client actually called (i.e. excluding any unused mocks) ensuring the contract we produce is valid and reliable.

This information is retrieved via an API call to Mountebank to retrieve the current Imposter information. Alternatively, Mountebank has a [save](http://www.mbtest.org/docs/commandLine#save) option which we could also use to transform a file.

This process is essentially same for any mocking tool, such as Wiremock or Cypress.

[Read more](https://docs.pactflow.io/docs/bi-directional-contract-testing/contracts/pact#converting-mocks-into-a-pact-compatible-format) for detail on how to serialise a pact file.

#### Run the tests

OK, time to run the tests!

1. Run the tests `npm t`

### Check

1. It has generated a pact file `example-bi-directional-consumer-mountebank/pacts/pactflow-example-consumer-mountebank-pactflow-example-bi-directional-provider-dredd.json`
2. You have studied the API spec and understood how it works: `example-bi-directional-consumer-mountebank/src/api.spec.js`
