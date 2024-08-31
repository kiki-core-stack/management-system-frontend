declare module 'vue' {
	interface GlobalComponents {
		PColumn: (typeof import('primevue/column'))['default'];
	}
}

declare global {
	type ElFormRef = ComponentRef<'ElForm'>;
	type ElInputNumberRef = ComponentRef<'ElInputNumber'>;
	type ElInputRef = ComponentRef<'ElInput'>;
}

export {};
