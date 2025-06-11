<template>
    <el-table-column align="center">
        <template #default="{ row }">
            <el-switch
                :before-change="() => beforeChange(row)"
                :disabled="typeof disabledCondition === 'boolean' ? disabledCondition : disabledCondition?.(row)"
                :model-value="get(row, field)"
            />
        </template>
    </el-table-column>
</template>

<script lang="ts" setup>
import { get } from 'lodash-es';

import type { BaseCrudApi } from '@/libs/apis/_internals/base/crud';

interface Props {
    confirmMessage: ((row: any) => string) | string;
    crudApi: BaseCrudApi;
    disabledCondition?: ((row: any) => boolean) | boolean;
    field: string;
}

// Define props, models and emits
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'statusChange'): void }>();

// Variables
const confirmChange = createElMessageBoxConfirmHandler<TableRowData>(
    (data) => typeof props.confirmMessage === 'string' ? props.confirmMessage : props.confirmMessage(data),
    '切換中...',
    async (data) => {
        const response = await props.crudApi.updateBooleanField(data.id, props.field, !get(data, props.field));
        return !!response?.data.success;
    },
    () => {
        ElNotification.success('切換成功！');
        emit('statusChange');
    },
);

// Functions
function beforeChange(row: TableRowData) {
    confirmChange(row);
    return false;
}
</script>
