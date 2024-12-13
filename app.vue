<template>
    <NuxtLoadingIndicator />
    <el-config-provider :locale="zhTw">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </el-config-provider>
</template>

<script setup>
import zhTw from 'element-plus/dist/locale/zh-tw.mjs';
</script>
