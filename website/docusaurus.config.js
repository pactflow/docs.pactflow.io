const path = require("path");

module.exports = {
  title: "PactFlow Documentation", // Title for your website.
  tagline: "Distributed systems testing made easy",
  url: "https://docs.pactflow.io",
  baseUrl: "/",
  onBrokenLinks: "throw", // Fail the build on broken links
  favicon: "img/favicon.ico",
  organizationName: "PactFlow", // Usually your GitHub org/user name.
  projectName: "doc-site", // Usually your repo name.
  themeConfig: {
    // announcementBar: {
    //   id: 'announcement-bar',
    //   content: '<div id="announcement-bar">🎂 Happy Official 10th Birthday, Pact! Join us for our <a target="_blank" href="https://pact.io/pactober.html?utm_source=docs.pactflow.io&utm_medium=web&utm_campaign=pactober2023&utm_content=banner">Pactober celebration</a>.</div>',
    //   backgroundColor: '#454CF0',
    //   textColor: '#fff',
    //   isCloseable: false,
    // },
    navbar: {
      title: "PactFlow Documentation",
      logo: {
        alt: "PactFlow Logo",
        src: "img/logo.png",
      },
      items: [
        { to: "/", label: "Docs", position: "left" },
        {
          to: "docs/workshops",
          label: "PactFlow University",
          position: "left",
        },
        { to: "docs/examples", label: "Examples", position: "left" },
        { to: "docs/on-premises", label: "On-Premises", position: "left" },
        { to: "notices", label: "Notices", position: "left" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              href: "https://pact-foundation.slack.com",
            },
            {
              label: "Signup to slack",
              href: "https://slack.pact.io",
            },
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/pact",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/pact_up",
            },
          ],
        },
        {
          title: "Other",
          items: [
            {
              label: "PactFlow main site",
              to: "https://pactflow.io/",
            },
            {
              label: "PactFlow notices",
              to: "https://docs.pactflow.io/notices/",
            },
            {
              label: "PactFlow roadmap",
              to: "https://pactflow.io/pactflow-feature-roadmap/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PactFlow`,
    },
    tableOfContents: {
      maxHeadingLevel: 4,
    },
    docs: {
      sidebar: {
        hideable: true
      }
    },
    cleanUrl: true,
    trailingSlash: true,
    algolia: {
      contextualSearch: false,
      appId: "LY8MHW6MWQ",
      apiKey: "6d5a0494675f3e1d9ea2b3483a38f44b",
      indexName: "Pactflow",
    },

    metadata: [
      { name: "docsearch:docusaurus_tag", content: "docs-default-current" },
    ],


    prism: {
      // default list https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
      // additional supported langs https://prismjs.com/#supported-languages
      additionalLanguages: [
        "powershell",
        "ruby",
        "csharp",
        "java",
        "docker",
        "groovy",
        "scala",
      ],
    },
  },
  themes: ["@you54f/theme-github-codeblock"], // switch to @saucelabs/theme-github-codeblock when merged https://github.com/saucelabs/docusaurus-theme-github-codeblock/pull/19
  plugins: [
    path.resolve(__dirname, "src/plugins/plugin-segment"),
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/docs/user-interface/settings/authentication",
            to: "/docs/authentication/main",
          },{
            from: "/go/publish-provider-self-verification-results",
            to: "/docs/bi-directional-contract-testing/provider"
          },{
            from: "/go/publish-consumer-contract-bdct",
            to: "/docs/bi-directional-contract-testing/consumer"
          },{
            from: "/docs/getting-started/",
            to: "/"
          }
        ],
      },
    ],
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          // It is recommended to set document id as docs home page (`docs/` path).
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/pactflow/docs.pactflow.io/edit/master/website/",
            showLastUpdateAuthor: true,
            // Equivalent to `enableUpdateTime`.
            showLastUpdateTime: true,
        },
        blog: {
          routeBasePath: "notices",
          postsPerPage: 25,
          blogSidebarCount: 25,
          path: "notices",
          showReadingTime: true,
          blogTitle: "PactFlow Updates",
          blogDescription:
            "Updates on the PactFlow platform, including security notices and new on-premises releases",
          // Please change this to your repo.
          editUrl:
            "https://github.com/pactflow/docs.pactflow.io/edit/master/website/blog/",
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} DiUS Computing Pty. Ltd.`,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleAnalytics: {
          trackingID: "UA-8926693-9",
        },
      },
    ],
    [
      'redocusaurus',
      {
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            spec: 'website/static/contractTypes/oas/products.yml',
            route: '/oas/products',
            id: 'oas-product',
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#1890ff',
        },
      },
    ]
  ],
};
