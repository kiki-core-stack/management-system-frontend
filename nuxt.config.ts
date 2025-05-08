import IconsResolver from 'unplugin-icons/resolver';
import ViteComponents from 'unplugin-vue-components/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: { lang: 'zh-Hant-TW' },
            link: [
                {
                    as: 'style',
                    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap',
                    rel: 'preload',
                },
                {
                    crossorigin: '',
                    href: 'https://fonts.googleapis.com',
                    rel: 'preconnect',
                },
            ],
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
        enabledModules: {
            colorMode: true,
            elementPlus: true,
            robots: true,
            security: true,
        },
        enabledUtils: {
            clipboard: true,
            datetime: true,
            hash: true,
        },
    },
    modules: [
        '@kikiutils/nuxt',
        'unplugin-fonts/nuxt',
        'unplugin-icons/nuxt',
    ],
    postcss: { plugins: { 'postcss-pxtorem': {} } },
    robots: { disallow: '/' },
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
    typescript: { tsConfig: { include: ['./vite-components.d.ts'] } },
    unfonts: {
        google: {
            families: [
                {
                    defer: false,
                    name: 'Noto+Sans+TC',
                    styles: 'wght@100..900',
                },
            ],
        },
    },
    vite: {
        plugins: [
            ViteComponents({
                dts: './.nuxt/vite-components.d.ts',
                resolvers: [IconsResolver()],
            }),
        ],
        server: {
            allowedHosts: (process.env.DEV_VITE_SERVER_ALLOWED_HOSTS || '').split(','),
            hmr: { protocol: process.env.DEV_VITE_SERVER_HMR_PROTOCOL },
        },
    },
});
