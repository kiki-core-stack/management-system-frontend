// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: { lang: 'zh-Hant-TW' },
            title: '後台管理系統',
            titleTemplate: '%s｜後台管理系統',
        },
        keepalive: true,
    },
    compatibilityDate: '2100-01-01',
    css: ['@/assets/scss/index.scss'],
    devServer: {
        host: process.env.DEV_SERVER_HOST,
        port: Number(process.env.DEV_SERVER_PORT) || undefined,
    },
    kikiutilsNuxt: {
        enabledComposables: {
            clipboard: true,
            datetime: true,
            hash: true,
        },
        enabledModules: {
            colorMode: true,
            elementPlus: true,
            googleFonts: true,
            robots: true,
            security: true,
        },
        enabledStyles: {
            font: true,
            scrollbar: true,
        },
    },
    modules: ['@kikiutils/nuxt'],
    security: {
        headers: {
            contentSecurityPolicy: {
                'img-src': [
                    `'self'`,
                    'blob:',
                ],
                'media-src': [
                    `'self'`,
                    'blob:',
                ],
            },
        },
    },
    ssr: false,
    vite: {
        server: {
            allowedHosts: (process.env.DEV_VITE_SERVER_ALLOWED_HOSTS || '').split(','),
            hmr: { protocol: process.env.DEV_VITE_SERVER_HMR_PROTOCOL },
        },
    },
});
