import { defineConfig } from 'vitepress'
import { useSidebar } from 'vitepress-openapi'
import llmstxt from 'vitepress-plugin-llms'
import spec from '../public/openapi.json'

const openApiSidebar = useSidebar({ spec, linkPrefix: '/operations/' })

export default defineConfig({
  title: 'App-in.io Docs',
  description: 'API Reference & Integration Guides for App-in.io AI Search',
  lang: 'en-US',
  cleanUrls: true,

  // Built-in since VitePress 1.x: writes dist/sitemap.xml with every page,
  // dynamic routes (operations/*) included. robots.txt points crawlers here.
  sitemap: {
    hostname: 'https://docs.app-in.io',
  },

  // vitepress-plugin-llms writes dist/llms.txt, dist/llms-full.txt and a .md
  // copy of every page for AI agents. Operation pages render through a Vue
  // component, so their LLM text comes from operations/[operationId].paths.ts.
  //
  // `apply: 'build'` keeps the plugin out of `vitepress dev`. Its dev-server
  // middleware reads `outDir + req.url` for any .md/.txt request with no `..`
  // check, so `/../../CLAUDE.md` returned files outside the build output.
  vite: {
    plugins: llmstxt({
      domain: 'https://docs.app-in.io',
      details:
        'The full machine-readable API contract (OpenAPI 3) is at https://docs.app-in.io/openapi.json.',
    }).map((plugin) => ({ ...plugin, apply: 'build' as const })),
  },

  // VitePress treats every .md under the project root as a page, and it scans the
  // working directory rather than the git index — so neither gitignoring a file
  // nor "it's obviously not documentation" keeps it off the public site.
  //
  // `graphify-out/` holds dated GRAPH_REPORT.md backups whose prose contains text
  // Vue's SFC compiler reads as unclosed HTML, which killed `npm run build`
  // locally for anyone with the knowledge graph built (app-in-io/docs#10).
  // Cloudflare Pages builds from a clean clone where the directory does not
  // exist, which is why that one stayed invisible in production.
  //
  // `CLAUDE.md` is the opposite case (app-in-io/docs#12): it IS tracked, so it
  // built to /CLAUDE and was live on docs.app-in.io — internal working rules and
  // repo layout served from the product's documentation domain.
  //
  // Anything added to the repo root that is not meant for API consumers belongs
  // in this list.
  srcExclude: ['graphify-out/**', 'CLAUDE.md'],

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'API Reference', link: '/operations/searchCollection' },
      { text: 'Guide', link: '/guide/' },
      { text: 'app-in.io', link: 'https://app-in.io' },
    ],

    sidebar: {
      '/operations/': [
        ...openApiSidebar.generateSidebarGroups(),
      ],
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Authentication', link: '/guide/authentication' },
          ],
        },
        {
          text: 'Integration',
          items: [
            { text: 'WooCommerce Plugin', link: '/guide/woocommerce-plugin' },
            { text: 'Shopify App', link: '/guide/shopify-app' },
            { text: 'Search Widget', link: '/guide/search-widget' },
            { text: 'Chat Widget', link: '/guide/chat-widget' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: 'AI-powered search for your website',
      copyright: '© 2026 App-in.io',
    },

    outline: 'deep',
  },

  transformPageData(pageData) {
    if (pageData.params?.pageTitle) {
      pageData.title = pageData.frontmatter.title = pageData.params.pageTitle
    }
  },
})
