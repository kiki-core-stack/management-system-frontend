import primevueAuraTheme from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: { lang: 'zh-Hant-TW' },
			link: [{ href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css', rel: 'stylesheet' }],
			title: '後台管理系統',
			titleTemplate: '%s｜後台管理系統'
		},
		keepalive: true
	},
	compatibilityDate: '2100-01-01',
	css: ['@/assets/scss/index.scss'],
	devServer: { host: process.env.DEV_SERVER_HOST, port: Number(process.env.DEV_SERVER_PORT) || undefined },
	kikiutilsNuxt: {
		enabledComposables: { axios: false },
		enabledModules: { elementPlus: true }
	},
	modules: ['@kikiutils/nuxt', '@primevue/nuxt-module'],
	primevue: {
		autoImport: false,
		components: { exclude: '*' },
		composables: { exclude: '*' },
		options: { theme: { preset: primevueAuraTheme, options: { darkModeSelector: '.dark' } } }
	},
	purgecss: { enabled: false },
	security: { headers: { contentSecurityPolicy: false } },
	ssr: false
});
