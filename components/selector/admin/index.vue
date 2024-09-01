<template>
	<el-select :loading="isLoadingData" :remote-method="loadData" :teleported="false" clearable filterable remote>
		<el-option :key="admin.id" :label="admin.account" :value="admin.id" v-for="admin in admins" />
	</el-select>
</template>

<script lang="ts" setup>
import type { AdminData } from '@kikiutils/kiki-core-stack-pack/types/data/admin';

import AdminApi from '@/apis/admin';

// Variables
const admins = reactive<AdminData[]>([]);
const isLoadingData = ref(true);

// Functions
async function loadData(queryAccount: string) {
	isLoadingData.value = true;
	const response = await AdminApi.getList({
		filterQuery: { account: { $regex: queryAccount } },
		limit: 100,
		selectFields: ['account']
	});

	admins.length = 0;
	admins.push(...(response.data.data?.data || []));
	isLoadingData.value = false;
}
</script>
