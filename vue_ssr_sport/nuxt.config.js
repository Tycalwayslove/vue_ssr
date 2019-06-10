const path = require('path')
module.exports = {
    mode: 'spa',
    server: {
        port: 8080, // default: 3000
        host: 'localhost' // default: localhost
    },
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: ['@/assets/css/index.scss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [{
        src: '~/plugins/axios',
        ssr: false
    }],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
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
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        proxy: true,
        prefix: '/api',
        credentials: true
    },
    proxy: {
        '/api/': {
            target: 'http://3.1.85.182:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ""
            }
        }
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