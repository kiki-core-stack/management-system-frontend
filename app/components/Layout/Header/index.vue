<template>
    <el-header
        class="dark:bg-dark py-2! flex flex-wrap items-center justify-between bg-white"
        height="unset"
    >
        <i-fa6-solid-bars
            class="mr-4 mt-0.5 cursor-pointer md:hidden"
            @click="sidebarState.isShow = true"
        />
        <span class="fs-20px">後台管理系統</span>
        <div class="grow" />
        <i-fa6-solid-sun class="mr-2" />
        <el-switch
            v-model="colorMode.preference"
            active-value="dark"
            inactive-value="light"
        />
        <i-fa6-solid-moon class="ml-2" />
        <el-button
            class="ml-2"
            @click="logout()"
        >
            登出
        </el-button>
    </el-header>
</template>

<script lang="ts" setup>
import { logout } from '@/libs/auth';

// Variables
const colorMode = useColorMode();
const sidebarState = useSidebarState();
</script>

<style lang="scss" scoped>
/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-drawer__body) {
    @apply p-0!;
}
</style>
