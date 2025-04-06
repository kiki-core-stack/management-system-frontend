<template>
    <el-select
        :loading="isLoadingData"
        :remote-method="loadData"
        :teleported="false"
        clearable
        filterable
        remote
    >
        <el-option
            v-for="admin in admins"
            :key="admin.id"
            :label="admin.account"
            :value="admin.id"
        />
    </el-select>
</template>

<script lang="ts" setup>
import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';

import { adminApi } from '@/apis/admin';

// Variables
const admins = ref<AdminData[]>([]);
const isLoadingData = ref(true);

// Functions
async function loadData(accountQuery: string) {
    isLoadingData.value = true;
    const response = await adminApi.getList({
        fields: ['account'],
        filter: { account: { $regex: accountQuery } },
        limit: 100,
    });

    admins.value.length = 0;
    admins.value.push(...response?.data.data?.list || []);
    isLoadingData.value = false;
}
</script>
