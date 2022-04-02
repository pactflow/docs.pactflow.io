import React from "react";

export const tableData = [
  {
    linkTitle: "React JS website relying on a Products API",
    linkUrl: "/docs/examples/js/consumer",
    badges: [
      "https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider/consumer/pactflow-example-consumer/latest/badge.svg",
      "https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider/consumer/example-consumer-cypress/latest/badge.svg",
    ],
    language: "JS/NodeJS",
    useCase: "Web",
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
    Header: "Link",
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
      return badges.map((w) =><a href={w.replace('/badge.svg','')}> <img src={w}/></a>);
    },
  },
];
