const path = require("path");

module.exports = {
  title: "Pactflow Documentation", // Title for your website.
  tagline: "Distributed systems testing made easy",
  url: "https://docs.pactflow.io",
  baseUrl: "/",
  onBrokenLinks: "error", // Fail the build on broken links
  favicon: "img/favicon.ico",
  organizationName: "Pactflow", // Usually your GitHub org/user name.
  projectName: "doc-site", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Pactflow Documentation",
      logo: {
        alt: "Pactflow Logo",
        src: "img/logo.png",
      },
      items: [
        { to: "/", label: "Docs", position: "left" },
        {
          to: "docs/workshops",
          label: "Pactflow University",
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
              href: "https://twitter.com/pactflow",
            },
          ],
        },
        {
          title: "Other",
          items: [
            {
              label: "Pactflow main site",
              to: "https://pactflow.io/",
            },
            {
              label: "Pactflow notices",
              to: "https://pactflow.io/notices/",
            },
            {
              label: "Pactflow roadmap",
              to: "https://go.pactflow.io/roadmap",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Pactflow`,
    },
    tableOfContents: {
      maxHeadingLevel: 4,
    },
    hideableSidebar: true,
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
        "scala"
      ],
    },
  },
  themes: ["@you54f/theme-github-codeblock"], // switch to @saucelabs/theme-github-codeblock when merged https://github.com/saucelabs/docusaurus-theme-github-codeblock/pull/19
  plugins: [path.resolve(__dirname, "src/plugins/plugin-segment")],
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
        },
        blog: {
          routeBasePath: "notices",
          postsPerPage: 25,
          blogSidebarCount: 25,
          path: "notices",
          showReadingTime: true,
          blogTitle: "Pactflow Updates",
          blogDescription:
            "Updates on the Pactflow platform, including security notices and new on-premises releases",
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
