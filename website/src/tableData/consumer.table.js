import React from "react";

export const tableData = [
  {
    linkTitle: "React JS Website tested using Pact to generate consumer pacts",
    linkUrl: "/docs/examples/js/consumer",
    badges: [
      "https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider/consumer/pactflow-example-consumer/latest/badge.svg",
    ],
    language: "JS/NodeJS",
    useCase: "Web",
    side: "Consumer",
  },
  {
    linkTitle:
      "React JS Website tested using Cypress to generate consumer pacts",
    linkUrl: "/docs/examples/cypress",
    badges: [
      "https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider/consumer/example-consumer-cypress/latest/badge.svg",
    ],
    language: "JS/NodeJS",
    useCase: "Web",
    side: "Consumer",
  },
  {
    linkTitle: "ExpressJS API provider tested with Pact Verifier",
    linkUrl: "/docs/examples/js/provider",
    badges: [
      "https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider/consumer/pactflow-example-consumer/latest/badge.svg",
      "https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider/consumer/example-consumer-cypress/latest/badge.svg",
    ],
    language: "JS/NodeJS",
    useCase: "API",
    side: "Provider",
  },
  {
    linkTitle: ".NET API Provider tested wtih Swashbuckle and Schemathesis against OAS",
    linkUrl: "/docs/examples/bi-directional/provider/dotnet",
    badges: [],
    language: ".NET",
    useCase: "OpenAPI Spec",
    side: "Provider",
  },
  {
    linkTitle: "SpringBoot API Provider tested with RestAssured against OAS",
    linkUrl: "/docs/examples/bi-directional/provider/restassured",
    badges: [],
    language: "Java",
    useCase: "OpenAPI Spec",
    side: "Provider",
  },
  {
    linkTitle: "ExpressJS API Provider tested with Postman against OAS",
    linkUrl: "/docs/examples/bi-directional/provider/postman",
    badges: [],
    language: "JS",
    useCase: "OpenAPI Spec",
    side: "Provider",
  },
  {
    linkTitle: "ExpressJS API Provider tested with Dredd against OAS",
    linkUrl: "/docs/examples/bi-directional/provider/dredd",
    badges: [],
    language: "JS",
    useCase: "OpenAPI Spec",
    side: "Provider",
  },
  {
    linkTitle: "Python API Provider tested with Pact Verifier",
    linkUrl: "/docs/examples/provider/python",
    badges: [],
    language: "Python",
    useCase: "API",
    side: "Provider",
  },
  {
    linkTitle: "Golang Gin API Provider tested with Pact Verifier",
    linkUrl: "/docs/examples/golang/python",
    badges: [],
    language: "Golang",
    useCase: "API",
    side: "Provider",
  },
  {
    linkTitle: ".NET API Provider tested with Pact Verifier",
    linkUrl: "/docs/examples/dotnet/python",
    badges: [],
    language: ".NET",
    useCase: "API",
    side: "Provider",
  },
  {
    linkTitle: "Java SOAP API provider tested with Pact Verifier",
    linkUrl: "/docs/examples/soap/java/provider",
    badges: [],
    language: "Java",
    useCase: "SOAP",
    side: "Provider",
  },
  {
    linkTitle: "Java Kafka message provider tested with Pact Verifier",
    linkUrl: "/docs/examples/kafka/java/provider",
    badges: [],
    language: "Java",
    useCase: "Messages",
    side: "Provider",
  },
  {
    linkTitle: "Java Spring Boot API provider tested with Pact Verifier",
    linkUrl: "/docs/examples/java/provider-springboot",
    badges: [],
    language: "Java",
    useCase: "API",
    side: "Provider",
  },
  {
    linkTitle: "ExpressJS AWS Lambda SNS Provider tested with Pact Verifier",
    linkUrl: "/docs/examples/aws/sns/provider",
    badges: [],
    language: "JS/NodeJS",
    useCase: "AWS/SNS/Messages",
    side: "Provider",
  },
  {
    linkTitle: "Node API consumer using Mountebank stubs and Pact Bi-Directional BYO adapters to generate Pact contracts",
    linkUrl: "/docs/examples/bi-directional/consumer/mountebank",
    badges: [],
    language: "JS/NodeJS",
    useCase: "OpenAPI",
    side: "Consumer",
  },
  {
    linkTitle: "Java API consumer using Wiremock stubs and Pact Bi-Directional BYO adapters to generate Pact contracts",
    linkUrl: "/docs/examples/bi-directional/consumer/wiremock",
    badges: [],
    language: "Java",
    useCase: "OpenAPI",
    side: "Consumer",
  },
  {
    linkTitle: "React JS Website using MSW mocks and pact-msw-adapter to generate Pact contracts",
    linkUrl: "/docs/examples/bi-directional/consumer/msw",
    badges: [],
    language: "JS/NodeJS",
    useCase: "OpenAPI",
    side: "Consumer",
  },
  {
    linkTitle: "React JS Website using Cypress fixtures and pact-cypress-adapter to generate Pact contracts",
    linkUrl: "/docs/examples/bi-directional/consumer/cypress",
    badges: [],
    language: "JS/NodeJS",
    useCase: "OpenAPI",
    side: "Consumer",
  },
  {
    linkTitle: "React JS Website using Nock Record & Replay feature and pact-nock-adapter to generate Pact contracts",
    linkUrl: "/docs/examples/bi-directional/consumer/recordreplay",
    badges: [],
    language: "JS/NodeJS",
    useCase: "OpenAPI",
    side: "Consumer",
  },

  {
    linkTitle:
      "Python API Consumer tested using Pact to generate consumer pacts",
    linkUrl: "/docs/examples/python/consumer",
    badges: [],
    language: "Python",
    useCase: "API",
    side: "Consumer",
  },
  {
    linkTitle:
      "Golang API Consumer tested using Pact to generate consumer pacts",
    linkUrl: "/docs/examples/golang/consumer",
    badges: [],
    language: "Golang",
    useCase: "API",
    side: "Consumer",
  },
  {
    linkTitle:
      ".NET (v3.x.x) API Consumer tested using Pact to generate consumer pacts",
    linkUrl: "/docs/examples/golang/dotnet",
    badges: [],
    language: ".NET",
    useCase: "API",
    side: "Consumer",
  },
  {
    linkTitle:
      ".NET (v4.x.x) API Consumer tested using Pact to generate consumer pacts",
    linkUrl: "/docs/examples/bi-directional/consumer/dotnet",
    badges: [],
    language: ".NET",
    useCase: "API",
    side: "Consumer",
  },
  {
    linkTitle:
      "Java Junit API Consumer tested using Pact to generate consumer pacts",
    linkUrl: "/docs/examples/java/consumer/junit",
    badges: [],
    language: "Java",
    useCase: "API",
    side: "Consumer",
  },
  {
    linkTitle:
      "Java SOAP API Consumer tested using Pact to generate consumer pacts",
    linkUrl: "/docs/examples/soap/java/consumer",
    badges: [],
    language: "Java",
    useCase: "SOAP",
    side: "Consumer",
  },
  {
    linkTitle:
      "Java Kafka Consumer tested using Pact to generate consumer pacts",
    linkUrl: "/docs/examples/kafka/java/consumer",
    badges: [],
    language: "Java",
    useCase: "Messages",
    side: "Consumer",
  },
  {
    linkTitle:
      "NodeJS Kafka Consumer tested using Pact to generate consumer pacts",
    linkUrl: "/docs/examples/kafka/js/consumer",
    badges: [],
    language: "NodeJS",
    useCase: "Messages",
    side: "Consumer",
  },
  {
    linkTitle:
      "NodeJS AWS Lambda SNS Consumer tested using Pact to generate consumer pacts",
    linkUrl: "/docs/examples/aws/sns/consumer",
    badges: [],
    language: "NodeJS",
    useCase: "AWS/SNS/Messages",
    side: "Consumer",
  },
];

export const columns = [
  {
    Header: "Language",
    accessor: "language",
    className: "data-table",
  },
  {
    Header: "Type",
    accessor: "side",
    className: "data-table",
  },
  {
    Header: "Use Case",
    accessor: "useCase",
    className: "data-table",
  },
  {
    Header: "Description",
    accessor: "linkTitle",
    className: "data-table left",
    Cell: ({ cell: { value }, row: { original } }) => (
      <a href={`${original.linkUrl}`} rel="noreferrer noopener">
        {value}
      </a>
    ),
  },
  {
    Header: "Contracts",
    accessor: "badges",
    className: "data-table",
    Cell: ({ row: { original } }) => {
      const badges = original.badges;
      if (!badges) return "";
      return badges.map((w) => (
        <a href={w.replace("/badge.svg", "")}>
          {" "}
          <img src={w} />
        </a>
      ));
    },
  },
];
