<template>
    <el-select
        value-key="id"
        :loading="isLoadingData"
        :remote-method="loadData"
        :teleported="false"
        clearable
        filterable
        remote
    >
        <el-option
            v-for="item in items"
            :key="item.id"
            :label="item.name"
            :value="item"
        />
    </el-select>
</template>

<script lang="ts" setup>
import type { AdminRoleData } from '@kiki-core-stack/pack/types/data/admin';
import { map } from 'es-toolkit/compat';

interface Props {
    selectedData?: Partial<AdminRoleData>[];
}

// Define props, models and emits
const props = defineProps<Props>();

// Constants/Refs/Variables
const isLoadingData = ref(true);
const items = ref<AdminRoleData[]>([]);

// Functions
async function loadData(nameQuery: string) {
    isLoadingData.value = true;
    const response = await AdminApis.AdminRole.use().getList({
        fields: ['name'],
        filter: { name: { $regex: nameQuery } },
        limit: 100,
    });

    items.value.length = 0;
    items.value.push(...response?.data?.data?.list || []);
    isLoadingData.value = false;
}

function processSelectedData() {
    if (!props.selectedData?.length) return;
    const existingIds = map(items.value, 'id');
    const incomingData = props.selectedData as Required<NonNullable<Props['selectedData']>[number]>[];
    items.value.push(...incomingData.filter(({ id }) => !existingIds.includes(id)));
}

// Watchers
watch(() => props.selectedData, processSelectedData);

// Hooks
onMounted(processSelectedData);
</script>
