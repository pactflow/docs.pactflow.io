const path = require("path");

module.exports = {
  title: "Pactflow Documentation", // Title for your website.
  tagline: "Distributed systems testing made easy",
  url: "https://docs.pactflow.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
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
    hideableSidebar: true,
    cleanUrl: true,
    trailingSlash:true,
    algolia: {
      contextualSearch: false,
      appId: "LY8MHW6MWQ",
      apiKey: "6d5a0494675f3e1d9ea2b3483a38f44b",
      indexName: "Pactflow"
    },
    
    metadata: [ {name: 'docsearch:docusaurus_tag', content: 'docs-default-current'} ],

  },
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
  ],
};
