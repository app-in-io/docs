import { defineConfig } from 'vitepress'
import { useSidebar } from 'vitepress-openapi'
import spec from '../public/openapi.json'

const openApiSidebar = useSidebar({ spec, linkPrefix: '/operations/' })

export default defineConfig({
  title: 'App-in.io Docs',
  description: 'API Reference & Integration Guides for App-in.io AI Search',
  lang: 'en-US',
  cleanUrls: true,

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
