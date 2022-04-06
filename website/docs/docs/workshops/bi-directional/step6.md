# Write the API consumer

## The Consumer

Time to create our consumer code base. For the sake of simplicity, we're going to focus only on the bits of our application that communicate to the provider. In our project, they are:

- The model (the `Product` class), representing the data returned from the Product API: `example-bi-directional-consumer-mountebank/src/api.js`{{open}}
- The API client (the `ProductApiClient`) which will be responsible for making the HTTP calls to the Product API and returning an internal representation of an Product: `example-bi-directional-consumer-mountebank/src/product.js`{{open}}

Install the dependencies for the project: `npm i`{{execute}}

### Product Model

```javascript
export class Product {
  constructor({id, name, type}) {
    if (!id || !name || !type) {
      throw Error("id, name and type are required properties")
    }
    this.id = id
    this.name = name
    this.type = type
  }
}
```

### Product API Client

Here is a simplified version of our API client code. This code is responsible for fetching products from the API, and returning a `Product`:

```javascript
const axios = require("axios");
const { Product } = require("./product");

export class ProductAPIClient {

  // ... removed for simplicity

  async getAllProducts() {
    return axios
      .get(this.withPath("/products"))
      .then((r) => r.data.map((p) => new Product(p)));
  }

  async getProduct(id) {
    return axios
      .get(this.withPath("/product/" + id))
      .then((r) => new Product(r.data));
  }
}

```

This class, and specifically the `getProduct()` and `getAllProducts` methods, will be the target of our contract tests.

### Check

Before moving to the next step, check the following:

1. You are in the correct directory `cd /root/example-bi-directional-consumer-mountebank`{{execute}}
1. You have run `npm i`{{execute}} and the dependencies have been installed
1. You have studied and understood the Product class: `example-bi-directional-consumer-mountebank/src/product.js`{{open}}
1. You have studied and understood the API client: `example-bi-directional-consumer-mountebank/src/api.js`{{open}}
