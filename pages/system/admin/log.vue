<template>
    <data-table-page
        ref="dataTablePageRef"
        v-model:filters="filters"
        title="管理員日誌"
        :crud-api="useAdminLogApi()"
        hide-actions-column
        hide-add-data-btn
        hide-updated-at-column
        show-time-range-quick-select
    >
        <template #toolbar-prepend>
            <filter-form
                v-model="filters"
                class="pb-1 pl-1"
                show-time-range
                @submit.prevent="dataTablePageRef?.loadData()"
            >
                <el-form-item label="管理員">
                    <selector-admin
                        v-model="filters.aIds"
                        multiple
                    />
                </el-form-item>
                <el-form-item label="類型">
                    <selector-admin-log-type
                        v-model="filters.types"
                        multiple
                    />
                </el-form-item>
            </filter-form>
        </template>
        <template #table>
            <el-table-column
                label="帳號"
                prop="a.account"
            />
            <el-table-column
                label="類型"
                :formatter="(row: AdminLogData) => adminLogTypeToTextMap[row.type]"
            />
            <el-table-column
                label="內容"
                prop="content"
            />
            <el-table-column
                label="IP"
                prop="ip"
            />
            <el-table-column
                label="指紋"
                prop="fingerprint"
            />
        </template>
    </data-table-page>
</template>

<script lang="ts" setup>
import { adminLogTypeToTextMap } from '@kiki-core-stack/pack/constants/admin';
import type { AdminLogData } from '@kiki-core-stack/pack/types/data/admin';

import type { GetAdminLogListFilters } from '@/types/admin';

// Variables
const dataTablePageRef = ref<DataTablePageRef>(null);
const filters = ref<GetAdminLogListFilters>({
    aIds: [],
    endAt: getMidnightDateFromToday(1),
    startAt: getMidnightDateFromToday(),
    types: [],
});
</script>
