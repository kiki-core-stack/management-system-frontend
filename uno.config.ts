// prettier-multiline-arrays-set-threshold: 4

import { defineConfig } from 'unocss';

export default defineConfig({
	rules: [
		[/^bg-color-([a-z\d]+)$/, ([_, value]) => ({ 'background-color': `#${value}` })],
		[/^color-([a-z\d]+)$/, ([_, value]) => ({ color: `#${value}` })],
		[/^fs-(\d+px)$/, ([_, value]) => ({ 'font-size': value })],
		[/^minww-(\d+px)$/, ([_, value]) => ({ 'min-width': value, width: value })]
	],
	shortcuts: {
		'flex-middle': 'flex items-center justify-center',
		'gap-btns': 'gap-1 children:(m-0!)',
		'h-s-screen': 'h-100svh',
		'w-s-screen': 'w-100svw',
		'wh-full': 'h-full w-full',
		'wh-s-screen': 'h-s-screen w-s-screen'
	}
});
