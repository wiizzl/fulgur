import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/fulgur/",
  srcDir: "src",

  title: "Fulgur",
  description:
    "Vite-native fullstack integration layer powered by Bun, Vite and Elysia.",
  sitemap: { hostname: "https://wiizzl.github.io/fulgur/" },
  head: [["link", { rel: "icon", href: "/fulgur/logo.png" }]],

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    editLink: {
      pattern: "https://github.com/wiizzl/fulgur/edit/main/docs/src/:path",
    },

    logo: "/logo.png",
    externalLinkIcon: true,

    footer: { message: "Released under the MIT License." },

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Project Structure", link: "/guide/project-structure" },
        ],
      },
      {
        text: "Core Concepts",
        items: [
          { text: "Server Routes", link: "/guide/server-routes" },
          { text: "Client API", link: "/guide/client-api" },
        ],
      },
      {
        text: "Advanced",
        items: [
          { text: "Configuration", link: "/guide/configuration" },
          { text: "Production", link: "/guide/production" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/wiizzl/fulgur" },
      { icon: "npm", link: "https://npmx.dev/package/fulgur" },
    ],

    search: {
      provider: "local",
    },
  },

  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
  },
});
