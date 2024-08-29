<template>
	<el-config-provider :locale="zhTw">
		<NuxtLayout>
			<NuxtLoadingIndicator />
			<NuxtPage></NuxtPage>
		</NuxtLayout>
	</el-config-provider>
</template>

<script setup>
import zhTw from 'element-plus/dist/locale/zh-tw.mjs';
</script>
