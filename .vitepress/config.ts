import { defineConfig } from 'vitepress'
import { useSidebar } from 'vitepress-openapi'
import spec from '../public/openapi.json'

const openApiSidebar = useSidebar({ spec, linkPrefix: '/operations/' })

export default defineConfig({
  title: 'App-in.io Docs',
  description: 'API Reference & Integration Guides for App-in.io AI Search',
  lang: 'en-US',
  cleanUrls: true,

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
            { text: 'Chat Widget', link: '/guide/chat-widget' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/app-in-io' },
    ],

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
