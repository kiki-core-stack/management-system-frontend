<template>
    <el-menu
        class="sidebar h-full w-[200px] py-[48px] tracking-[2px]"
        background-color="#252828"
        text-color="#fff"
        :default-active="route.path"
        router
    >
        <el-scrollbar>
            <layout-sidebar-menu-item
                v-for="menuItem, index in sidebarState.menuItems"
                :key="index"
                :item="menuItem"
            />
        </el-scrollbar>
    </el-menu>
</template>

<script lang="ts" setup>
// Variables
const route = useRoute();
const sidebarState = useSidebarState();
</script>
