<template>
    <el-menu
        class="sidebar h-full md:block"
        :class="{ hidden: !isDrawer }"
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
                @click="() => !menuItemGroup[2] && (mainState.sidebar.isShow = false)"
            >
                <template #title>
                    <span>{{ menuItemGroup[1] }}</span>
                </template>
                <div v-if="menuItemGroup[2]">
                    <sidebar-menu-item
                        v-for="item, itemIndex in menuItemGroup[2]"
                        :key="itemIndex"
                        :index="item[0]"
                        :text="item[1]"
                        @click="mainState.sidebar.isShow = false"
                    />
                </div>
            </component>
        </el-scrollbar>
    </el-menu>
</template>

<script lang="ts" setup>
import {
    ElMenuItem,
    ElSubMenu,
} from 'element-plus';

// Props and emits
defineProps<{ isDrawer?: boolean }>();

const route = useRoute();
</script>

<style lang="scss" scoped>
.sidebar {
    letter-spacing: 2px;
    padding: 48px 0;
    width: 200px;
}
</style>
