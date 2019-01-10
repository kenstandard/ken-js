/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
];

const siteConfig = {
  title: 'Ken', // Title for your website.
  tagline: 'Static & Composable Knowledge Graphs',
  url: 'https://kenstandard.github.io', // Your website URL
  baseUrl: '/', // Base URL for your project */
  projectName: 'ken-js',
  organizationName: 'kenstandard',
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'introduction', label: 'Docs'},
    { href: "https://explorer.kenstandard.com", label: "Explorer"},
    { href: "https://github.com/kenstandard/ken-js", label: "Github"}
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/ken-logo-small.png',
  footerIcon: 'img/ken-logo-small.png',
  favicon: 'img/favicon/favicon2.png',

  /* Colors for website */
  colors: {
    primaryColor: '#48b179',
    secondaryColor: '#205C3B',
  },
  //This doesn't seem to be working though.
  usePrism: ['TOML', 'reason'],
  

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
  stylesheets: [
    "https://fonts.googleapis.com/css?family=Noto+Serif:400,700"
  ],

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: ``,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/ken-logo-small.png',
  twitterImage: 'img/ken-logo-small.png',

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
