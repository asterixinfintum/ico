export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'bergmarkets',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://s3.tradingview.com/tv.js',
        type: 'text/javascript',
        body: true // Include the script just before the closing </body> tag
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
      '~/assets/scss/animations.scss',
      '~/assets/scss/mixins.scss',
      '~/assets/scss/classes.scss',
      '~/assets/scss/table.scss'
    ],
    hoistUseStatements: true
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
