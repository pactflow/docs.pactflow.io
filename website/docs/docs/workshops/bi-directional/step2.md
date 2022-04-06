# 2. Create and document an API using OpenAPI Specification

## The Provider

### Design the API

As we are following a specification or [design first approach](https://swagger.io/blog/api-design/design-first-or-code-first-api-development/) to API development, we start by creating an [OpenAPI](https://oai.github.io/Documentation/start-here.html) description document, that describes how our API should work.

Authoring an OAS document is beyond the scope of this tutorial, but you can find plenty of resources on the internet (such as at [swagger.io](https://swagger.io)).

```
openapi: 3.0.1
info:
  title: Product API
  description: Pactflow Product API demo
  version: 1.0.0
paths:
  /products:
    post:
      summary: Create a product
      description: Creates a new product
      operationId: createProduct
      requestBody:
        description: Create a new Product
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Product'
            examples:
              application/json:
                value:
                  id: "1234"
                  type: "food"
                  price: 42
      responses:
        "200":
          description: successful operation
          content:
            "application/json; charset=utf-8":
              schema:
                oneOf:
                  - $ref: '#/components/schemas/Product'
              examples:
                application/json:
                  value:
                    id: "1234"
                    type: "food"
                    price: 42
    get:
      summary: List all products
      description: Returns all products
      operationId: getAllProducts
      responses:
        "200":
          description: successful operation
          content:
            "application/json; charset=utf-8":
              schema:
                type: "array"
                items:
                  $ref: '#/components/schemas/Product'
              examples:
                application/json:
                  value:
                    - id: "1234"
                      type: "food"
                      price: 42
                      # name: "pizza"
                      # version: "1.0.0"
                      # see https://github.com/apiaryio/dredd/issues/1430 for why
        "400":
          description: Invalid ID supplied
          content: {}
  /product/{id}:
    get:
      summary: Find product by ID
      description: Returns a single product
      operationId: getProductByID
      parameters:
      - name: id
        in: path
        description: ID of product to get
        schema:
          type: string
        required: true
        example: 10
      responses:
        "200":
          description: successful operation
          content:
            "application/json; charset=utf-8":
              schema:
                $ref: '#/components/schemas/Product'
              examples:
                application/json:
                  value:
                    id: "1234"
                    type: "food"
                    price: 42
                    # name: "pizza"
                    # version: "1.0.0"
                    # see https://github.com/apiaryio/dredd/issues/1430 for why
        "400":
          description: Invalid ID supplied
          content: {}
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
      additionalProperties: false
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

As you can see, we have 3 main endpoints:

1. `POST /products` - create a new product
1. `GET /products` - gets all products
1. `GET /products/:id` - gets a single product

Having designed our API, we can now set about building it.

### Implement the Product API

Here is the Product API using the [Express JS](https://expressjs.com) framework. Once again, writing an API is beyond the scope of this tutorial.

_NOTE: you can see the full project here: https://github.com/pactflow/example-bi-directional-provider-dredd_

We define our product, the available routes, the datastore (an simple in-memory database) and the server.

`example-bi-directional-provider-dredd/src/product/product.js`{{open}}

```
class Product {
    constructor(id, type, name, version, price) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.version = version;
        this.price = price;
    }
}

module.exports = Product;
```

`example-bi-directional-provider-dredd/src/product/product.routes.js`{{open}}

```
const router = require('express').Router();
const controller = require('./product.controller');

router.get("/product/:id", controller.getById);
router.get("/products", controller.getAll);
router.post("/products", controller.create);

module.exports = router;
```

`example-bi-directional-provider-dredd/src/product/product.repository.js`{{open}}

```
const Product = require('./product');

class ProductRepository {

    constructor() {
        this.products = new Map([
            ["09", new Product("09", "CREDIT_CARD", "Gem Visa", "v1", 99.99)],
            ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1", 49.49)],
            ["11", new Product("11", "PERSONAL_LOAN", "MyFlexiPay", "v2", 16.50)],
        ]);
    }

    async fetchAll() {
        return [...this.products.values()]
    }

    async getById(id) {
        return this.products.get(id);
    }

    async create(product) {
        return this.products.set(product.id, product)
    }
}

module.exports = ProductRepository;
```

`example-bi-directional-provider-dredd/src/product/product.controller.js`{{open}}

```
const Product = require("./product");
const ProductRepository = require("./product.repository");

const repository = new ProductRepository();

exports.create = async (req, res) => {
    const data = req.body
    const product = new Product(data.id, data.type, data.name, data.version, data.price)
    product ? res.send(product) : res.status(400).send({message: "invalid product"})
};
exports.getAll = async (req, res) => {
    res.send(await repository.fetchAll())
};
exports.getById = async (req, res) => {
    const product = await repository.getById(req.params.id);
    product ? res.send(product) : res.status(404).send({message: "Product not found"})
};

exports.repository = repository;
```

`example-bi-directional-provider-dredd/src/server.js`{{open}}

```
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./src/product/product.routes");

const port = 3000;

const init = () => {
  app.use(express.json());
  app.use(cors());
  app.use(routes);
  return app.listen(port, () =>
    console.log(`Provider API listening on port ${port}...`)
  );
};

init();
```

### Check

Before moving to the next step, cd into the `example-bi-directional-provider-dredd` directory and run the provider to see if it starts.

The tutorial environment should have installed 2 projects and their dependencies. Once the terminal process completes you can run:

1. `cd /root/example-bi-directional-provider-dredd`{{execute}}
1. `npm i`{{execute}}
1. `npm start`{{execute}}

Open up a separate terminal and run the following command:

1. `cd /root/example-bi-directional-provider-dredd`{{execute}}
1. `curl localhost:3000/products | jq .`{{execute}}

You should see the following output:

```
[
  {
    "id": "09",
    "type": "CREDIT_CARD",
    "name": "Gem Visa",
    "version": "v1",
    "price": 99.99
  },
  {
    "id": "10",
    "type": "CREDIT_CARD",
    "name": "28 Degrees",
    "version": "v1",
    "price": 49.49
  },
  {
    "id": "11",
    "type": "PERSONAL_LOAN",
    "name": "MyFlexiPay",
    "version": "v2",
    "price": 16.5
  }
]
```

Switch back to your first terminal and terminate (`ctrl-c`) the process to make sure your provider is no longer running.
