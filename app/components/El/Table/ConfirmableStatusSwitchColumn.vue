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

<script lang="ts" generic="TR extends TableRowData = TableRowData" setup>
import { get } from 'lodash-es';

import type { BaseCrudApi } from '@/libs/apis/_internals/base/crud';

interface Props {
    confirmMessage: ((row: TR) => string) | string;
    crudApi: BaseCrudApi<TR>;
    disabledCondition?: ((row: TR) => boolean | undefined) | boolean;
    field: string;
}

// Define props, models and emits
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'statusChange'): void }>();

// Variables
const confirmChange = createElMessageBoxConfirmHandler<TR>(
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
function beforeChange(row: TR) {
    confirmChange(row);
    return false;
}
</script>
