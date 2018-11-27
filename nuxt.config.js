const pkg = require('./package')

module.exports = {
  // mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'http://at.alicdn.com/t/font_630574_df24x2c4fdd.css'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#F56C6C' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/index.scss',
    '~assets/css/my_element.scss',
    'mavon-editor/dist/css/index.css',
    'mavon-editor/dist/markdown/github-markdown.min.css',
    'mavon-editor/dist/highlightjs/styles/atom-one-dark.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/mavon-editor',
    '@/plugins/axios',
    '@/plugins/vue-cookie',
    '@/plugins/highlight'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['nuxt-sass-resources-loader', '@/assets/css/var.scss']
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    '/api/bdl/': {
      target: 'https://api.map.baidu.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api/bdl/': '/'
      }
    },
    '/api/xz/': {
      target: 'https://api.seniverse.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api/xz/': '/'
      }
    },
    '/api/': {
      target: 'http://47.106.200.223:8000/',
      // target: 'http://localhost:8000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },
  env: {
    serverApiUrl: 'http://47.106.200.223:3000/api/',
    localApiUrl: 'http://localhost:3000/api/'
  },
  router: {
    base: '/',
    fallback: true,
    middleware: 'common'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
