import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  base: '/validator/',
  title: "Arcstack Validator",
  description: "Lightweight framework-agnostic and TypeScript-first validation library",
  head: [
    ['link', { rel: 'icon', href: '/banner.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: 'Lightweight framework-agnostic and TypeScript-first validation library' }],
    ['meta', { name: 'keywords', content: 'Validation, TypeScript, Framework-agnostic, Lightweight' }],
    ['meta', { name: 'author', content: 'Toneflix' }],
    ['meta', { property: 'og:title', content: 'Arcstack Validator' }],
    ['meta', { property: 'og:description', content: 'Lightweight framework-agnostic and TypeScript-first validation library' }],
    ['meta', { property: 'og:image', content: '/banner.png' }],
    ['meta', { property: 'og:url', content: 'https://arcstack-hq.github.io/validator/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Arcstack Validator' }],
    ['meta', { name: 'twitter:description', content: 'Lightweight framework-agnostic and TypeScript-first validation library' }],
    ['meta', { name: 'twitter:image', content: '/banner.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/api/resource' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Validation Rules', link: '/guide/validation-rules' },
          { text: 'Custom Rules', link: '/guide/custom-rules' },
          { text: 'Error Handling', link: '/guide/error-handling' },
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Validator', link: '/api/validator' },
          { text: 'ValidationRule', link: '/api/validation-rule' },
          { text: 'ValidationException', link: '/api/validation-exception' },
        ]
      },
      {
        text: 'More',
        items: [
          { text: 'Roadmap', link: '/more/roadmap' },
          { text: 'Contributing', link: '/more/contributing' },
          { text: 'Changelog', link: '/more/changelog' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/arcstack-hq/validator' }
    ]
  }
})
