<template>
    <el-menu
        class="sidebar h-full"
        background-color="#252828"
        text-color="#ffffff"
        :default-active="route.path"
        router
    >
        <el-scrollbar>
            <component
                :is="menuItemGroup[2] ? ElSubMenu : ElMenuItem"
                v-for="menuItemGroup, groupIndex in mainState.sidebar.menuItemGroups"
                :key="groupIndex"
                :index="menuItemGroup[0]"
                @click="!menuItemGroup[2] && (mainState.sidebar.isShow = false)"
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
                        @click="mainState.sidebar.isShow = false"
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
                        index="/profile/security"
                        text="一般"
                        @click="mainState.sidebar.isShow = false"
                    />
                    <layout-sidebar-menu-item
                        index="/profile/security/session"
                        text="登入裝置"
                        @click="mainState.sidebar.isShow = false"
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
</script>

<style lang="scss" scoped>
.sidebar {
    letter-spacing: 2px;
    padding: 48px 0;
    width: 200px;
}
</style>
