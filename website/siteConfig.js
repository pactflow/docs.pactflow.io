/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: 'Pactflow Documentation', // Title for your website.
  tagline: 'Distributed systems testing made easy',
  url: 'https://docs.pactflow.io', // Your website URL
  baseUrl: '/', // Base URL for your project */

  // Used for publishing and more
  projectName: 'doc-site',
  organizationName: 'Pactflow',

  /* path to images for header/footer */
  headerIcon: 'img/apple-icon.png',
  footerIcon: 'img/logo-white.png',
  favicon: 'img/favicon-32x32.png',

  /* Colors for website */
  colors: {
    primaryColor: '#20232a',
    secondaryColor: '#25a6ad',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Pactflow`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-block-buttons.js',
    'https://code.jquery.com/jquery-3.4.1.min.js',
    '/js/github-links.js'
  ],

  stylesheets: [

  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',

  headerLinks: [
    // Links to document with id for current language/version
    { doc: "getting-started", label: "Docs" },
    { doc: "workshops/ci-cd/index", label: "Workshops"},
    { doc: "on-premises/index", label: "On-Premises"},
    { doc: "api", label: "API" },
    // Link to page found at pages/en/help.js or if that does not exist, pages/help.js, for current language
    // { page: "guides", label: "Guides" },
    // Determines search bar position among links
    { search: true },
    // Determines language drop down position among links
    { languages: true },
  ],

  docsSideNavCollapsible: true,

  gaTrackingId: "UA-8926693-9"
};

module.exports = siteConfig;
