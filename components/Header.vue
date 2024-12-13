<template>
    <div class="dark:bg-dark color-mode-transition relative flex flex-wrap items-center justify-between bg-white px-4 py-2">
        <i
            class="fa-solid fa-bars mr-4 pt-1 md:hidden"
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
        <i class="fa-solid fa-moon ml-2" />
        <el-button
            class="ml-2"
            @click="() => logout()"
        >
            登出
        </el-button>
    </div>
</template>

<script lang="ts" setup>
// Variables
const colorMode = useColorMode();
const colorModeCookie = useCookie('cm');

watch(() => colorMode.preference, (nv) => colorModeCookie.value = nv);
if (colorModeCookie.value === undefined) colorModeCookie.value = colorMode.preference;
else colorMode.preference = colorModeCookie.value as string;
</script>
