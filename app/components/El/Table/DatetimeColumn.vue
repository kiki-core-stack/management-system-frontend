<template>
    <el-table-column
        align="center"
        width="156"
        :formatter="formatDateCell"
    />
</template>

<script lang="ts" setup>
import { get } from 'es-toolkit/compat';

interface Props {
    emptyText?: string;
    field?: string;
}

// Define props, models and emits
const props = withDefaults(
    defineProps<Props>(),
    {
        emptyText: '',
        field: 'createdAt',
    },
);

// Functions
function formatDateCell(row: AnyRecord) {
    const value = get(row, props.field);
    if (value === null || value === undefined) return props.emptyText;
    return formatDate(value);
}
</script>
