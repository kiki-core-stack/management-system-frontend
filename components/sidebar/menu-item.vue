<template>
	<el-menu-item :index="index">{{ text }}</el-menu-item>
</template>

<script lang="ts" setup>
interface Props {
	index: string;
	text: string;
}

// Emits and props
defineProps<Props>();
</script>
