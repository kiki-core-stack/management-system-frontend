<template>
    <span
        class="loading-spinner inline-block rounded-full"
        :style="{
            '--border-color': color,
            '--border-width': borderWidth,
            'height': size,
            'width': size,
        }"
    />
</template>

<script lang="ts" setup>
interface Props {
    borderWidth?: string;
    color?: string;
    size: string;
}

// Define props, models and emits
withDefaults(
    defineProps<Props>(),
    {
        borderWidth: '0.25rem',
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
    border: var(--border-width) solid var(--border-color);
    border-right: var(--border-width) solid transparent;
    vertical-align: -var(--border-width);
}
</style>
