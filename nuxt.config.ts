// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Nuxt Template',
            titleTemplate: '%s｜Nuxt Template',
        },
        keepalive: true,
    },
    compatibilityDate: '2100-01-01',
    css: ['@/assets/scss/index.scss'],
    devServer: {
        host: process.env.DEV_SERVER_HOST,
        port: Number(process.env.DEV_SERVER_PORT) || undefined,
    },
    imports: { dirs: ['./globals/**/*.ts'] },
    kikiutilsNuxt: {
        enabledModules: {
            robots: true,
            security: true,
        },
    },
    modules: ['@kikiutils/nuxt'],
    postcss: { plugins: { 'postcss-pxtorem': {} } },
    ssr: true,
    vite: {
        server: {
            allowedHosts: (process.env.DEV_VITE_SERVER_ALLOWED_HOSTS || '').split(','),
            hmr: { protocol: process.env.DEV_VITE_SERVER_HMR_PROTOCOL },
        },
    },
});
