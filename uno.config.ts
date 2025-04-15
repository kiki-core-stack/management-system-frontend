import { defineConfig } from 'unocss';

export default defineConfig({
    rules: [
        [
            /^fs-(\d+(\.\d+)?(px|rem))$/,
            (matches) => ({ 'font-size': matches[1] }),
        ],
    ],
    shortcuts: {
        'flex-middle': 'flex items-center justify-center',
        'h-s-screen': 'h-100svh',
        'w-s-screen': 'w-100svw',
        'wh-full': 'h-full w-full',
        'wh-s-screen': 'h-s-screen w-s-screen',
    },
});
