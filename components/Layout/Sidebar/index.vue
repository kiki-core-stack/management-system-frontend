<template>
    <el-menu
        class="sidebar h-full w-[200px] py-[48px] tracking-[2px]"
        background-color="#252828"
        text-color="#fff"
        :default-active="route.path"
        router
    >
        <el-scrollbar>
            <component
                :is="menuItemGroup[2] ? ElSubMenu : ElMenuItem"
                v-for="menuItemGroup, groupIndex in sidebarState.menuItemGroups"
                :key="groupIndex"
                :index="menuItemGroup[0]"
                @click="() => {
                    if (!menuItemGroup[2]) sidebarState.isShow = false;
                }"
            >
                <template #title>
                    <span>{{ menuItemGroup[1] }}</span>
                </template>
                <div v-if="menuItemGroup[2]">
                    <layout-sidebar-menu-item
                        v-for="item, itemIndex in menuItemGroup[2]"
                        :key="itemIndex"
                        :index="item[0]"
                        :text="item[1]"
                        @click="sidebarState.isShow = false"
                    />
                </div>
            </component>
            <ElSubMenu index="/profile">
                <template #title>
                    個人
                </template>
                <ElSubMenu index="/profile/security">
                    <template #title>
                        安全性
                    </template>
                    <layout-sidebar-menu-item
                        index="/profile/security/"
                        text="一般"
                        @click="sidebarState.isShow = false"
                    />
                    <layout-sidebar-menu-item
                        index="/profile/security/session/"
                        text="登入裝置"
                        @click="sidebarState.isShow = false"
                    />
                </ElSubMenu>
            </ElSubMenu>
        </el-scrollbar>
    </el-menu>
</template>

<script lang="ts" setup>
import {
    ElMenuItem,
    ElSubMenu,
} from 'element-plus';

// Variables
const route = useRoute();
const sidebarState = useSidebarState();
</script>
