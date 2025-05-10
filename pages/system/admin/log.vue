<template>
    <data-table-page
        ref="dataTablePageRef"
        v-model:filter="filter"
        v-model:time-range-end="filter.createdAt.$lt"
        v-model:time-range-start="filter.createdAt.$gte"
        title="管理員日誌"
        :crud-api="useAdminLogApi()"
        hide-actions-column
        hide-add-data-btn
        hide-updated-at-column
        show-time-range-quick-select
    >
        <template #toolbar-prepend>
            <filter-form
                v-model="filter"
                class="pb-1 pl-1"
                @submit.prevent="dataTablePageRef?.loadData()"
            >
                <filter-time-range-fields
                    v-model:end="filter.createdAt.$lt"
                    v-model:start="filter.createdAt.$gte"
                />
                <el-form-item label="管理員">
                    <selector-admin
                        v-model="filter.aObjectId.$in"
                        multiple
                    />
                </el-form-item>
                <el-form-item label="類型">
                    <selector-admin-log-type
                        v-model="filter.type.$in"
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

import type { GetAdminLogListFilter } from '@/types/admin';

// Variables
const dataTablePageRef = ref<DataTablePageRef>(null);
const filter = ref<GetAdminLogListFilter>({
    aObjectId: { $in: [] },
    createdAt: {
        $gte: getMidnightDateFromToday(),
        $lt: getMidnightDateFromToday(1),
    },
    type: { $in: [] },
});
</script>
