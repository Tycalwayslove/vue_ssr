const path = require('path')
const colors = require('vuetify/es5/util/colors').default
module.exports = {
  mode: 'spa',
  server: {
    host: 'localhost',
    port: 8080
  },
  /*
   ** Headers of the pagecv
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   ** false is forbidden
   */
  loading:false,
  /*
   ** Global CSS
   */
  css: ['@/assets/css/index.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/axios',
      ssr: false
    }
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.NODE_ENV == 'production'? "http://120.78.74.49:8080":"http://localhost:8080"
  },
  vuetify: {
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3
    }
  },
  proxy: {
    '/api': {
      target: 'http://120.78.74.49:8080/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/vuetify',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources' // with styleResources
    
  ],
  /*
   ** Nuxt Style Resources (sass,less,stylus )
   ** github: https://github.com/nuxt-community/style-resources-module
   */
  styleResources: {
    // your settings here
    scss: [
      '@/assets/css/variable.scss',
      '@/assets/css/utils.scss'
      // use underscore "_" & also file extension ".scss"
    ]
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      /*
       ** alias
       */
      config.resolve.alias.components = path.resolve(__dirname, 'components')

      /*
       **  Run ESLint on save
       */
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
