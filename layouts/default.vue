<template>
    <div class="wh-full bg-color-f5f5f5 dark:bg-color-2c2c2c color-mode-transition fixed mt-0 flex p-0">
        <sidebar />
        <el-drawer
            v-model="mainState.sidebar.isShow"
            direction="ltr"
            size="200"
            :with-header="false"
        >
            <sidebar is-drawer />
        </el-drawer>
        <div class="relative grow">
            <div class="wh-full absolute flex flex-col">
                <Header />
                <header-tabs />
                <div class="relative grow">
                    <div class="wh-full absolute overflow-auto">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
    padding: 0 !important;
}
</style>
