<template>
	<p-table-page
		ref="pTablePageRef"
		title="管理員日誌"
		:crud-api-class="AdminLogApi"
		:filter-query="filterQueryFormData"
		enable-filter-date-range-btn-group
		hide-actions-column
		hide-add-data-btn
		hide-updated-at-column
	>
		<template #before-table>
			<el-filter-form
				class="pb-1 pl-1"
				:model="filterQueryFormData"
				@submit.prevent="pTablePageRef?.loadData()"
				enable-created-at-range-filter
			>
				<el-form-item label="管理員">
					<selector-admin v-model="filterQueryFormData.adminIds" collapse-tags collapse-tags-tooltip multiple />
				</el-form-item>
				<el-form-item label="類型">
					<selector-admin-log-type v-model="filterQueryFormData.types" collapse-tags collapse-tags-tooltip multiple />
				</el-form-item>
			</el-filter-form>
		</template>
		<template #table>
			<PColumn field="admin.account" header="帳號" />
			<PColumn header="類型">
				<template #body="{ data }">{{ adminLogTypeToTextMap[data.type as AdminLogType] }}</template>
			</PColumn>
			<PColumn field="content" header="內容" />
			<PColumn field="ip" header="IP" />
			<PColumn field="fingerprint" header="指紋" />
		</template>
	</p-table-page>
</template>

<script lang="ts" setup>
import { adminLogTypeToTextMap } from '@kikiutils/kiki-core-stack-pack/constants/admin';
import type { AdminLogType } from '@kikiutils/kiki-core-stack-pack/constants/admin';

import { AdminLogApi } from '@/apis/admin/log';
import type { GetAdminLogsFilterQueryFormData } from '@/types/data/admin';

// Variables
const filterQueryFormData = reactive<GetAdminLogsFilterQueryFormData>({
	adminIds: [],
	endAt: getMidnightDateFromToday(1),
	startAt: getMidnightDateFromToday(),
	types: []
});

const pTablePageRef = ref<ComponentRef<'PTablePage'>>(null);
</script>
