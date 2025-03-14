# Using PactFlow AI

### Generating Pact Tests

To generate Pact tests we use the `pactflow-ai generate` subcommand.

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

Generate a Pact test for the HTTP 200 use case (default):

```sh
pactflow-ai generate openapi \
  --spec     /tmp/products.yml \
  --endpoint "/product/{id}" \
  --output   /tmp/api.pact.spec.ts \
  --language typescript
```

**Testing Negative Scenarios**

By default, generation will focus on the "happy" paths and ignore the "error" paths. 

We can generate a test for the `404` scenario by explicitly specifying the methods and statuses we are interested in:

```sh
 pactflow-ai generate openapi \
  --spec ./products.yml \
  --endpoint '{"path": "/product/{id}", "methods": ["GET"], "status": ["404"]}' \
  --output ./src/api.pact.spec.ts \
  --language typescript
```

Using these expressions, you have fine-grained control over the generation process.

:::tip
Refer to `pactflow-ai generate openapi --help` for more on the supported matching expressions.
:::

**Considerations**

As this form of generation does not have access to the client source code, tests generated will use a placeholder API client in place of the real API client, when calling the mock service in the test.

Be sure to update your tests to insert the real API client to ensure the tests are valid.

#### Generating Tests from Code

If you already have an existing code base, using the `code` option can help to quickly bootstrap coverage of your contract tests.

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

We can generate pact tests using the `pactflow-ai generate code` subcommand:

```sh
pactflow-ai generate code \
  --output ./src/api.pact.spec.ts \
  --language typescript \
  ./src/api.js \
  ./src/product.js
```

Note how we can pass in multiple files to the command. Providing the right information to PactFlow AI will ensure it has the context to generate usable output.

#### Generating Tests from your OpenAPI Descriptions + Code

If you have both an OAD and code, you can pass both to the `openai` subcommand as follows:

```sh
pactflow-ai generate openapi \
  --spec ./products.yml \
  --endpoint "/product/{id}" \
  --output ./src/api.pact.spec.ts \
  --language typescript \
  --code ./src/product.js \
  --code ./src/api.js
 ```

This tends to provide the best output, as it has the most information about how the API works and how your code integrates with it.

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

```sh
 pactflow-ai generate request-response \   # use the request-response subcommand
  --request ./capture/get.request.http \   # path to the request description
  --response ./capture/get.response.http \ # path to the response description
  --language typescript \
  --output ./src/api.pact.spec.ts
```

**Considerations**

As this form of generation does not have access to the client source code, tests generated will use a placeholder API client in place of the real API client, when calling the mock service in the test.

Be sure to update your tests to insert the real API client to ensure the tests are valid.

### Using Test Templates

Test Templates allow teams to generate contract tests that align with their existing style, frameworks, and SDK versions. By defining templates as code, users can ensure that generated tests match their project conventions from the start, reducing manual refactoring and improving efficiency.

Test Templates are supported for all forms of test generation.

:::warning
TBC - need to finish this section :)
:::

## Best Practices

### 1. Check PactFlow's work

While PactFlow AI is a powerful tool, it is still capable of making mistakes, and you should always validate the code it suggests. Use the following tips to ensure you are accepting accurate, secure suggestions:

1. Understand suggested code before you use it.
2. Ensure the tests are appropriately scoped and target your system under test (SUT), usually an API client package.
   1. Make sure the tests _do not_ use a generic HTTP client. This is particularly relevant for `openapi` and `request-response` generated code.
3. Be sure the tests improve and challenge the quality of your code base. 
   1. Tests that simply affirm what your code does may be useful when establishing contract tests, but in general won't improve your code quality.
4. Make sure the tests follow the conventions of your project.
5. Use automated tests and tooling to check PactFlow AI's work. With the help of tools like linting, code scanning, and IP  scanning, you can automate an additional layer of security and accuracy checks.

### 2. Provide Context

In AI, context is key. The more relevant information you can provide the more targeted and reliable the outcome will be. Examples:

1. When generating code from OpenAPI Descriptions (OAD)
   1. Ensure the OAD is valid
      1. Use API Hub for Design, or tools like https://editor.swagger.io or [spectral](https://github.com/stoplightio/spectral) to quickly validate and enforce standards
   2. Use the `description` property on the various elements, as these help provide context and intent
   3. Provide [examples](https://swagger.io/docs/specification/v3_0/adding-examples/), as these help show real-life usage, provide context
2. When providing code:
   1. Ensure that all of the relevant code is provided. For example, if you have a class representing your API and another representing the resource, provide both of those files

### 3. Use Test Templates

Test Templates reduce the amount of refactoring required after generation. If you start to see a common generation pattern you wish to avoid, update the Test Template to help PactFlow AI generate improved output.