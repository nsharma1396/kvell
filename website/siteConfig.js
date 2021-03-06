// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const path = require("path");

const siteConfig = {
  title: "Kvell.js", // Title for the website.
  tagline:
    "Create Node.js applications with pre-defined configurations, app flow and abstractions.",
  url: "", // Website URL
  baseUrl: "/", // Base URL for your project */

  customDocsPath: path.basename(__dirname) + "/docs",

  // Used for publishing and more
  projectName: "kvell",
  organizationName: "nsharma1396",

  headerLinks: [
    { doc: "getting-started/installation", label: "Docs" },
    { doc: "database-plugins/overview", label: "Database Plugins" },
    { href: "https://www.github.com/nsharma1396/kvell", label: "Github" },
    { search: true },
  ],

  algolia: {
    apiKey: "27a07e425cb3479414dde03ae83d124b",
    indexName: "kvelljs",
  },

  editUrl: "https://github.com/nsharma1396/kvell/edit/master/website/docs/",

  /* path to images for header/footer */
  headerIcon: "img/kvell-logo.png",
  footerIcon: "img/kvell-logo.png",
  // favicon: "img/favicon.png",
  favicon: "img/kvell-logo.png",

  /* Colors for website */
  colors: {
    // primaryColor: "#17223b",
    // secondaryColor: "#263859"
    // primaryColor: "#199190",
    // secondaryColor: "#19b2b1"
    primaryColor: "#133337",
    secondaryColor: "#185760",
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Neeraj Sharma.`,

  gaTrackingId: "UA-160040520-2",

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "railscasts",
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/code-block-buttons.js",
  ],

  separateCss: ["./static/css/code-block-buttons.css"],

  onPageNav: "separate",

  // No .html extensions for paths.
  cleanUrl: true,

  // docsSideNavCollapsible: true,

  twitter: true,
  twitterUsername: "nsharma1396",

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // scrollToTop: true,
};

module.exports = siteConfig;
