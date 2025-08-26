<template>
    <div
        class="relative block w-full overflow-hidden p-0"
        :style="divStyle"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
interface Props {
    ratio: number | { height: number; width: number };
}

// Define props, models and emits
const props = defineProps<Props>();

// Computed properties
const divStyle = computed(() => {
    if (typeof props.ratio === 'number') return { aspectRatio: `1 / ${props.ratio}` };
    else return { aspectRatio: `${props.ratio.height} / ${props.ratio.width}` };
});
</script>

<style lang="scss" scoped>
div > :deep(*) {
    @apply inset-0 absolute size-full;
}
</style>
