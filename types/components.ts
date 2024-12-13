declare module 'vue' {
    interface GlobalComponents {
        PColumn: (typeof import('primevue/column'))['default'];
    }
}

declare global {
    type ElFormInputRef = ComponentRef<'ElFormInput'>;
    type ElFormRef = ComponentRef<'ElForm'>;
    type ElInputNumberRef = ComponentRef<'ElInputNumber'>;
    type ElInputRef = ComponentRef<'ElInput'>;
}

export {};
