import type { ComponentCustomOptions as _ComponentCustomOptions, ComponentCustomProperties as _ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
	interface ComponentCustomOptions extends _ComponentCustomOptions {}
	interface ComponentCustomProperties extends _ComponentCustomProperties {}
}
