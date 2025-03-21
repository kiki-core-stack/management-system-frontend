<template>
    <el-container class="bg-color-f5f5f5 color-mode-transition dark:bg-color-2c2c2c wh-full fixed p-0">
        <el-drawer
            v-model="mainState.sidebar.isShow"
            direction="ltr"
            size="200"
            :with-header="false"
        >
            <layout-sidebar />
        </el-drawer>
        <el-aside
            class="hidden md:block"
            width="auto"
        >
            <layout-sidebar />
        </el-aside>
        <el-container>
            <el-header
                class="
                    color-mode-transition
                    dark:bg-dark
                    py-2!
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    bg-white
                "
                height="unset"
            >
                <layout-header />
            </el-header>
            <el-header
                id="layout-header-tabs-container"
                class="bg-color-e0e0e0 dark:bg-color-4a4a4a fs-14px flex overflow-auto"
                height="unset"
            >
                <layout-header-tabs />
            </el-header>
            <el-main
                v-loading="mainState.isPageLoading"
                class="overflow-hidden! p-0!"
            >
                <slot />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
#layout-header-tabs-container {
    padding: 5px 15px 0 !important;
}
</style>
