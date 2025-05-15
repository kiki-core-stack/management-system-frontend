<template>
    <el-table-column
        align="center"
        width="156"
        :formatter="(row) => formatDate(row[field])"
    />
</template>

<script lang="ts" setup>
interface Props {
    field?: string;
}

// Define props, models and emits
withDefaults(defineProps<Props>(), { field: 'createdAt' });
</script>
