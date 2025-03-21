<template>
    <el-table-page
        ref="elTablePageRef"
        title="管理員日誌"
        :crud-api-class="adminLogApi"
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
                enable-created-at-range-filter
                @submit.prevent="elTablePageRef?.loadData()"
            >
                <el-form-item label="管理員">
                    <selector-admin
                        v-model="filterQueryFormData.adminIds"
                        collapse-tags
                        collapse-tags-tooltip
                        multiple
                    />
                </el-form-item>
                <el-form-item label="類型">
                    <selector-admin-log-type
                        v-model="filterQueryFormData.types"
                        collapse-tags
                        collapse-tags-tooltip
                        multiple
                    />
                </el-form-item>
            </el-filter-form>
        </template>
        <template #table>
            <el-table-column
                label="帳號"
                prop="admin.account"
            />
            <el-table-column
                label="類型"
                :formatter="({ type }) => adminLogTypeToTextMap[type as AdminLogType]"
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
    </el-table-page>
</template>

<script lang="ts" setup>
import { adminLogTypeToTextMap } from '@kiki-core-stack/pack/constants/admin';
import type { AdminLogType } from '@kiki-core-stack/pack/constants/admin';

import { adminLogApi } from '@/apis/admin/log';
import type { GetAdminLogsFilterQueryFormData } from '@/types/data/admin';

// Variables
const elTablePageRef = ref<ComponentRef<'ElTablePage'>>(null);
const filterQueryFormData = reactive<GetAdminLogsFilterQueryFormData>({
    adminIds: [],
    endAt: getMidnightDateFromToday(1),
    startAt: getMidnightDateFromToday(),
    types: [],
});
</script>
