<template>
	<div class="relative py-2 px-4 flex flex-wrap items-center justify-between bg-white dark:bg-dark color-mode-transition">
		<i class="md:hidden mr-4 pt-1 fa-solid fa-bars" @click="mainState.isSidebarShow = true"></i>
		<span class="fs-20px">後台管理系統</span>
		<div class="grow"></div>
		<i class="mr-2 fa-solid fa-sun"></i>
		<el-switch active-value="dark" inactive-value="light" v-model="colorMode.preference" />
		<i class="ml-2 fa-solid fa-moon"></i>
		<el-button class="ml-2" @click="() => logout()">登出</el-button>
	</div>
</template>

<script lang="ts" setup>
// Variables
const colorMode = useColorMode();
const colorModeCookie = useCookie('cm');

watch(
	() => colorMode.preference,
	(nv) => (colorModeCookie.value = nv)
);

if (colorModeCookie.value === undefined) colorModeCookie.value = colorMode.preference;
else colorMode.preference = colorModeCookie.value as string;
</script>
