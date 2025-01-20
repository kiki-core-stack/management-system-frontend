import primevueAuraTheme from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: { lang: 'zh-Hant-TW' },
            link: [
                {
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
                    rel: 'stylesheet',
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
        enabledComposables: { axios: false },
        enabledModules: { elementPlus: true },
    },
    modules: [
        '@kikiutils/nuxt',
        '@primevue/nuxt-module',
    ],
    primevue: {
        autoImport: false,
        components: { exclude: '*' },
        composables: { exclude: '*' },
        options: {
            theme: {
                options: { darkModeSelector: '.dark' },
                preset: primevueAuraTheme,
            },
        },
    },
    purgecss: { enabled: false },
    security: { headers: { contentSecurityPolicy: false } },
    ssr: false,
    vite: {
        build: {
            assetsInlineLimit: 0,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.endsWith('.css')) return;
                        const moduleName = id.match(/\.pnpm\/@?([^@]+)@/)?.[1];
                        return moduleName?.includes('nuxt') ? 'nuxt' : moduleName;
                    },
                },
            },
        },
        server: {
            allowedHosts: (process.env.DEV_VITE_SERVER_ALLOWED_HOSTS || '').split(','),
            hmr: { protocol: process.env.DEV_VITE_SERVER_HMR_PROTOCOL },
        },
    },
});
