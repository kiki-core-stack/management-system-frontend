<template>
    <div class="wh-full bg-color-f5f5f5 dark:bg-color-2c2c2c fixed left-0 top-0 overflow-auto">
        <div class="min-h-100svh flex flex-col items-center p-4">
            <div
                id="middle-block"
                class="dark:bg-dark rounded-10px relative my-auto flex flex-col items-center overflow-auto bg-white p-4 text-center"
            >
                <slot />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#middle-block {
    box-shadow: 1px 2px 12px 0px rgba(black, 0.25);
}
</style>
