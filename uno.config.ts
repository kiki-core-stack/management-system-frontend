import { defineConfig } from 'unocss';

export default defineConfig({
    rules: [
        [
            /^bg-color-([a-z\d]+)$/,
            (matches) => ({ 'background-color': `#${matches[1]}` }),
        ],
        [
            /^color-([a-z\d]+)$/,
            (matches) => ({ color: `#${matches[1]}` }),
        ],
        [
            /^fs-(\d+px)$/,
            (matches) => ({ 'font-size': matches[1] }),
        ],
        [
            /^min-width-and-width-(\d+px)$/,
            (matches) => ({
                'min-width': matches[1],
                'width': matches[1],
            }),
        ],
    ],
    shortcuts: {
        'flex-middle': 'flex items-center justify-center',
        'gap-btns': 'gap-1 children:(m-0!)',
        'h-s-screen': 'h-100svh',
        'w-s-screen': 'w-100svw',
        'wh-full': 'h-full w-full',
        'wh-s-screen': 'h-s-screen w-s-screen',
    },
});
