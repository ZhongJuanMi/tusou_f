module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'tuza-兔砸的窝',
    meta: [
      {
        charset: 'utf-8'
      },
      // {
      //   name: 'viewport',
      //   content: 'width=device-width, initial-scale=1'
      // },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel:'stylesheet',
        href:'http://at.alicdn.com/t/font_630574_df24x2c4fdd.css'
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#F56C6C'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    // vendor: ['element-ui', 'axios', 'vue-cookie','mavon-editor','highlight.js'],
    babel: {
      plugins: [
        [
          'component',
          { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
        ]
      ]
    },
  },
  plugins: [
    {
      src: '~plugins/ElementUI',
      ssr: true
    },
    {
      src: '~plugins/axios',
      ssr: true
    },
    {
      src: '~plugins/MavonEditor',
      ssr: false
    },
    {
      src: '~plugins/highlight',
      ssr: false
    },
    {
      src: '~plugins/VueCookie',
      ssr: false
    }
  ],
  css: [
    // 项目中的 CSS 文件
    '~assets/css/index.scss',
    '~assets/css/my_element.scss',
    'mavon-editor/dist/css/index.css',
    'mavon-editor/dist/markdown/github-markdown.min.css',
    'mavon-editor/dist/highlightjs/styles/atom-one-dark.min.css'
  ],
  modules: ['@nuxtjs/axios','@nuxtjs/proxy',['nuxt-sass-resources-loader', '@/assets/css/var.scss']],
  env: {
    serverApiUrl: 'http://47.106.200.223:3000/api/',
    localApiUrl: 'http://localhost:3000/api/'
  },
  proxy: {
    '/api/': {
      target: 'http://47.106.200.223:8000/',
      // target: 'http://localhost:8000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },
  router: {
    base: '/',
    fallback: true,
    middleware: 'common'
  }
}
