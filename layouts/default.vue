<template>
    <el-container class="wh-full fixed bg-[#f5f5f5] p-0 dark:bg-[#2c2c2c]">
        <el-drawer
            v-model="mainState.sidebar.isShow"
            body-class="p-0!"
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
                class="fs-14px flex overflow-auto bg-[#e0e0e0] dark:bg-[#4a4a4a]"
                height="unset"
            >
                <layout-header-tabs />
            </el-header>
            <el-main class="overflow-hidden! p-0!">
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
