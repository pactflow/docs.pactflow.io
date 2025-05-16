# Using PactFlow AI

### Generating Pact Tests

To generate Pact tests we use the `pactflow-ai generate` command.

**Example**
Let's assume we have a simple Product API for which we would like to create Pact tests, described by the following OpenAPI description:

```yml
openapi: 3.0.1
info:
  title: Product API
  description: Pactflow Product API demo
  version: 1.0.0
paths:
  /product/{id}:
    get:
      summary: Find product by ID
      description: Returns a single product
      operationId: getProductByID
      parameters:
      - name: id
        in: path
        description: Product ID
        schema:
          type: string
        required: true
      responses:
        "200":
          description: successful operation
          content:
            "application/json; charset=utf-8":
              schema:
                $ref: '#/components/schemas/Product'
        "404":
          description: Product not found
          content: {}
components:
  schemas:
    Product:
      type: object
      required:
        - id
        - name
        - price
      properties:
        id:
          type: string
        type:
          type: string
        name:
          type: string
        version:
          type: string
        price:
          type: number
```

#### Generating Tests from OpenAPI Descriptions

OpenAPI Descriptions (OAD) are machine and human-readable descriptions of an API. As it includes details such as  resources, verbs, status codes and request/response bodies, it is a great source for Pact tests. Learn more about OpenAPI [here](https://swagger.io/docs/.specification/v3_0/about/).

Generate a Pact test for the HTTP 200 use case (default), specify a `--openapi` and `--endpoint`:

```console
pactflow-ai generate \
  --openapi  products.yml \
  --endpoint "/product/{id}" \
  --output   src/api.pact.spec.ts \
  --language typescript
```

**Testing Negative Scenarios**

By default, generation will focus on the "happy" paths and ignore the "error" paths. 

We can generate a test for the `404` scenario by explicitly specifying the methods and statuses we are interested in:

```console
pactflow-ai generate \
  --openapi  products.yml \
  --endpoint '{"path": "/product/{id}", "methods": ["GET"], "status": ["404"]}' \
  --output   src/api.pact.spec.ts \
  --language typescript
```

Using these expressions, you have fine-grained control over the generation process.

:::tip
Refer to `pactflow-ai generate --help` for more on the supported matching expressions.
:::

**Considerations**

As this form of generation does not have access to the client source code, tests generated will use a placeholder API client in place of the real API client, when calling the mock service in the test.

Be sure to update your tests to insert the real API client to ensure the tests are valid.

#### Generating Tests from Code

If you already have an existing code base, using the `--code` flag can help to quickly bootstrap coverage of your contract tests.

**Example**

Let's assume you already have a client implemented and integrated with the Product API, and you have the following (simplified) API client code:

**api.js**
```js
export class API {
  // ...
  async getProduct(id) {
    return axios
      .get(this.withPath("/product/" + id), {
        headers: {
          Authorization: this.generateAuthToken(),
        },
      })
      .then((r) => new Product(r.data));
  }
}
```

...and the following `Product` definition:

**product.js**
```js
export class Product {
  constructor({id, name, price}) {
    this.id = id
    this.name = name
    this.price = price
  }
}
```

We can generate pact tests using the `pactflow-ai generate` command:

```console
pactflow-ai generate \
  --output   src/api.pact.spec.ts \
  --language typescript \
  --code     src/api.js \
  --code     src/product.js
```

Note how we can pass in multiple files to the command. Providing the right information to PactFlow AI will ensure it has the context to generate usable output.

#### Generating Tests from Request-Response

In some cases, you may not have access to an OAD or code. You may already have a large test suite where you have - or can - record the request and response details. You may simply have detailed descriptions such as a BDD suite, describing how the solution should work.

In these cases, you can create a suite of Pact tests from these recordings.

Given the following request-response pairs (taken from the output of `curl` command, and in the format of an [HTTP Message](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)):

**get.request.http**
```
GET /product/10 HTTP/1.1
Host: api.example.com
User-Agent: curl/8.1.2
Authorization: Bearer notarealtoken
Accept: application/json; charset=UTF-8
```

**get.response.http**
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 96

{
  "id": "10",
  "name": "Aussie",
  "type": "Pizza",
  "version": "v1",
  "price": 9.99,
}
```

Run the following command to generate a Pact test:

```console
pactflow-ai generate \
  --request  capture/get.request.http \   # path to the request description
  --response capture/get.response.http \ # path to the response description
  --language typescript \
  --output   src/api.pact.spec.ts
```

**Considerations**

As this form of generation does not have access to the client source code, tests generated will use a placeholder API client in place of the real API client, when calling the mock service in the test.

Be sure to update your tests to insert the real API client to ensure the tests are valid. 

As an example:

```js
return provider.executeTest(async (mockserver) => {
  const client = new ProductClient(mockserver.url);
  const response = await client.getProduct(10);
  expect(response.data).to.deep.equal({
    id: 27,
    storeId: '009111fc-992a-4cae-96d4-6507b657b0e4',
    price: 99.09,
    categories: ['hardware'],
  });
});
```

You need to replace the `ProductClient` with your actual API client.

#### Generating Tests from multiple sources


If you have more than one source available, such as an OAD and code, you can pass both as inputs to the `generate` command as follows:

```console
pactflow-ai generate \
  --openapi  products.yml \
  --endpoint "/product/{id}" \
  --output   src/api.pact.spec.ts \
  --language typescript \
  --code     src/product.js \
  --code     src/api.js
 ```

This tends to provide the best output, as it has the most information about how the API works and how your code integrates with it.

When generating the output, the precedence from least-to-most specific impact on the output is as follows:

1. Request-response
2. Code
3. OpenAPI Document

For example, if combining a request-response with an OpenAPI doc, PactFlow AI will automatically determine what part of the OAD is relevant and trim the rest (effectively building its own `--endpoint` matcher).

### Using Test Templates

Test Templates allow teams to generate contract tests that align with their existing style, frameworks, and SDK versions. By defining templates as code or providing additional contextual prompts, users can ensure that generated tests match their project conventions from the start, reducing manual refactoring and improving efficiency.

Test Templates are supported for all forms of test generation.

#### Providing Code Templates

When generating code, you can ask PactFlow to use a template test to customise output. Using the template, PactFlow AI will attempt to use the style, conventions and patterns it sees in your code. To provide a template, use the `--test-template` parameter, passing the location of a file containing the template.

**Example:**

Node JS:

```js
import { SpecificationVersion, PactV4, MatchersV3 } from "@pact-foundation/pact";
import { ProductAPI } from './product'

// Extract matchers here to improve readability when used in the test
const { like } = MatchersV3;

// Create a 3 level test hierarchy
//
// 1. Top level describe block containing the name of the API being tested
// 2. Describe block for the specific API endpoint
// 3. Test block for the specific test case
// 4. Execute the test case
// 5. Call the API under test
// 6. Assert the response
// 8. Use Pact matchers to constrain and test the Provider response
// 7. Use Jest matchers to assert the API client behaviour

// Top level - name of the API
describe("Product API", () => {
  // Use the PactV4 class, and serialise the Pact as V4 Pact Specification
  const pact = new PactV4({
    consumer: "ProductConsumer",
    provider: "ProviderProvider",
    spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
  });

  // Level 2 - Describe block for the specific API endpoint
  describe("GET /products/:id", () => {

    // Level 3 - Test block for the specific test case
    test("given a valid product, returns 200", async () => {
      await pact
        .addInteraction()
        .given("a product with id 1 exists")
        .uponReceiving("a request for a valid product")
        // Avoid matchers on the request unless necessary
        .withRequest("GET", "/products/1", (builder) => {
          builder.headers({ Accept: "application/json" });
        })
        .willRespondWith(200, (builder) => {
          // Use loose matchers where possible, to avoid unnecessary constraints on the provider
          builder.jsonBody(
            like({
              id: 1,
              name: "Product 1",
              price: 100,
            })
          );
        })
        .executeTest(async (mockserver) => {
          // Instantiate the ProductAPI client
          const productAPI = new ProductAPI(mockserver.url);

          // Call the API under test
          const product = await productAPI.getProductById(1);

          // Use Jest matchers to assert the response
          expect(product).toEqual({
            id: 1,
            name: "Product 1",
            price: 100,
          });
        });
    });
  });
});

```


#### Passing Additional Prompts

When generating code, you can specify additional instructions for PactFlow AI to use to customise the output. For example, you might wish to provide extra guidelines or configurations, useful for handling special cases, overriding default behaviors, or adding constraints to the generation logic for a specific test.

To customise the output with prompts, use the `--instructions` parameter.

Instructions can be provided as a direct string or read from a local file.
          
**Example**

To provide specific updates or constraints for the test generation, use a concise instruction like:
          
`--instructions "Include the 'X-HMAC-SIGNATURE' header in all GET requests (format: 'SHA256-HMAC-SIGNATURE: {sig}')"`

Alternatively, you can load instructions from a file `--instructions @/path/to/instructions.txt`

This would instruct the test generation process to read the file content and use it as the instruction.

**Example:**

`prompts.txt`:
```
* Make sure to cover happy and non-happy paths
  * Specifically, ensure to include test cases for the positive (HTTP 200) scenario and negative scenarios, specifically the case of 400, 401 and 404
* Only include endpoints/properties used by the API client - do not include additional fields in the OAS that are not in the client code
  * You can check the properties used in the Product class to help make this determination
* Use the Jest testing framework
* Use the native Jest expect (https://jestjs.io/docs/expect) matchers such as `toEqual` and `toBeTruthy`
* Prefer the use of the async/await pattern when using Promises
* Use the PactV4 interface
```

## Best Practices

### 1. Check PactFlow's work

While PactFlow AI is a powerful tool, it is still capable of making mistakes, and you should always validate the code it suggests. Use the following tips to ensure you are accepting accurate, secure suggestions:

1. Understand suggested code before you use it.
2. Ensure the tests are appropriately scoped and target your system under test (SUT), usually an API client package.
   1. Make sure the tests _do not_ use a generic HTTP client (see below). We do our best to prevent this, but it can occasionally be generated. This is particularly relevant for `--openapi` and `--request/--response` generated code. Without knowing your codebase, a placeholder is used which needs to be replaced with the relevant calls to your codebase.

     ```js
        // AI generated a dummy client that actually works
        class ProductClient {
          constructor(private baseUrl: string) {}

          async getProduct(productId: string) {
            return fetch(`${this.baseUrl}/product/${productId}`, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer xyz',
                'Accept': 'application/json; charset=UTF-8',
              },
            });
          }
        }

        // ...

        // Test then uses this dummy client, instead of the real one. 
        // We no longer have a trustworthy test!
        return provider.executeTest(async (mockserver) => {
          const client = new ProductClient(mockserver.url);
          const response = await client.getProduct(10);
          expect(response.data).to.deep.equal({
            id: 27,
            storeId: '009111fc-992a-4cae-96d4-6507b657b0e4',
            price: 99.09,
            categories: ['hardware'],
          });
        });        

     ```
3. Be sure the tests improve and challenge the quality of your code base. 
   1. Tests that simply affirm what your code does may be useful when establishing contract tests, but in general won't improve your code quality.
4. Make sure the tests follow the conventions of your project.
5. Use automated tests and tooling to check PactFlow AI's work. With the help of tools like linting, code scanning, and IP  scanning, you can automate an additional layer of security and accuracy checks.

### 2. Provide Context

In AI, context is key. The more relevant information you can provide the more targeted and reliable the outcome will be. Examples:

1. When generating code from OpenAPI Descriptions (OAD)
   1. Ensure the OAD is valid
      1. Use [API Hub for Design](https://smartbear.com/api-hub/), or tools like https://editor.swagger.io or [spectral](https://github.com/stoplightio/spectral) to quickly validate and enforce standards
   2. Use the `description` property on the various elements, as these help provide context and intent
   3. Provide [examples](https://swagger.io/docs/specification/v3_0/adding-examples/), as these help show real-life usage, provide context
2. When providing code:
   1. Ensure that all of the relevant code is provided. For example, if you have a class representing your API and another representing the resource, provide both of those files

### 3. Use Test Templates

Test Templates reduce the amount of refactoring required after generation. If you start to see a common generation pattern you wish to avoid, update the Test Template to help PactFlow AI generate improved output.