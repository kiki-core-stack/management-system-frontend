<template>
    <i
        class="fa-bars fa-solid mr-4 cursor-pointer pt-1 md:hidden"
        @click="mainState.sidebar.isShow = true"
    />
    <span class="fs-20px">後台管理系統</span>
    <div class="grow" />
    <i class="fa-solid fa-sun mr-2" />
    <el-switch
        v-model="colorMode.preference"
        active-value="dark"
        inactive-value="light"
    />
    <i class="fa-moon fa-solid ml-2" />
    <el-button
        class="ml-2"
        @click="logout()"
    >
        登出
    </el-button>
</template>

<script lang="ts" setup>
import { logout } from '@/libs/auth';

// Variables
const colorMode = useColorMode();
const colorModeCookie = useCookie('cm');

// Watchers
watch(() => colorMode.preference, (nv) => colorModeCookie.value = nv);

// ColorMode
if (colorModeCookie.value === undefined) colorModeCookie.value = colorMode.preference;
else colorMode.preference = colorModeCookie.value as string;
</script>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
    padding: 0 !important;
}
</style>
