<template>
    <span
        class="loading-spinner inline-block rounded-full"
        :style="{
            '--border-color': color,
            '--border-size': borderSize,
            'height': size,
            'width': size,
        }"
    />
</template>

<script lang="ts" setup>
interface Props {
    borderSize?: string;
    color?: string;
    size: string;
}

// Define props, models and emits
withDefaults(
    defineProps<Props>(),
    {
        borderSize: '0.25rem',
        color: 'red',
    },
);
</script>

<style lang="scss" scoped>
@keyframes loading-spinner {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
}

.loading-spinner {
    animation: loading-spinner 0.75s linear infinite;
    border: var(--border-size) solid var(--border-color);
    border-right: var(--border-size) solid transparent;
    vertical-align: -var(--border-size);
}
</style>
