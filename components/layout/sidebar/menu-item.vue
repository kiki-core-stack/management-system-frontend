<template>
    <el-menu-item :index="index">
        {{ text }}
    </el-menu-item>
</template>

<script lang="ts" setup>
interface Props {
    index: string;
    text: string;
}

// Define props, models and emits
defineProps<Props>();
</script>
