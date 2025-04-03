<template>
    <div class="wh-full fixed left-0 top-0 overflow-auto bg-[#f5f5f5] dark:bg-[#2c2c2c]">
        <div
            id="middle-block-container"
            class="min-h-100svh flex flex-col items-center p-4"
        >
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
#middle-block-container > :deep(:first-child) {
    @apply dark:bg-dark rounded-10px relative my-auto flex flex-col items-center overflow-auto bg-white p-4 text-center;
    box-shadow: 1px 2px 12px 0px rgba(black, 0.25);
}
</style>
