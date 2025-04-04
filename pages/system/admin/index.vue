<template>
    <data-table-page
        ref="dataTablePageRef"
        add-data-btn-text="新增管理員"
        dialog-title-suffix="管理員"
        title="管理員管理"
        :ask-delete-row-message-render="(row: AdminData) => `確定要刪除 ${row.account} 嗎？`"
        :crud-api-class="adminApi"
        :disable-row-delete-btn-rule="(row: AdminData) => row.id === profileState.id"
        :form-data="formData"
        :form-rules="formRules"
    >
        <template #table>
            <el-table-column
                label="帳號"
                prop="account"
            />
            <el-table-column
                label="名稱"
                prop="name"
            />
            <el-table-column
                label="Email"
                prop="email"
            />
            <el-table-column
                align="center"
                label="啟用"
            >
                <template #default="{ row }">
                    <el-switch
                        v-model="row.enabled"
                        :before-change="() => showAskToggleBooleanFieldMessageBox(row, 'enabled')"
                        :disabled="row.id === profileState.id"
                    />
                </template>
            </el-table-column>
        </template>
        <template #form>
            <el-form-input
                v-model="formData.account"
                label="帳號"
                maxlength="16"
                name="account"
                prop="account"
            />
            <el-form-input
                v-model="formData.name"
                label="名稱"
                maxlength="16"
                name="name"
                prop="name"
            />
            <el-form-input
                v-model="formData.email"
                label="Email"
                name="email"
                prop="email"
                type="email"
            />
            <el-form-input
                v-model="formData.password"
                autocomplete="new-password"
                name="password"
                prop="password"
                type="password"
                :label="`${formData.id ? '修改' : ''}密碼`"
                :rules="[{ message: '請輸入密碼', required: !formData.id }]"
            />
            <el-form-switch
                v-model="formData.enabled"
                label="啟用"
                prop="enabled"
                :disabled="formData.id === profileState.id"
            />
        </template>
    </data-table-page>
</template>

<script lang="ts" setup>
import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';

import { adminApi } from '@/apis/admin';

// Variables
// eslint-disable-next-line vue/max-len
const booleanFieldToTextMap: ReadonlyRecord<FilteredKeyPath<AdminData, boolean>, string> = Object.freeze({ enabled: '啟用' });
const dataTablePageRef = ref<DataTablePageRef>(null);
const formData = reactive<TablePageFormData<AdminData>>({
    account: '',
    email: '',
    enabled: false,
    id: '',
    name: '',
    password: '',
});

const formRules: ElFormRules<AdminData> = {
    account: commonFormRules.account,
    email: commonFormRules.email.nonRequired,
    name: commonFormRules.name,
};

// Functions
function showAskToggleBooleanFieldMessageBox(row: AdminData, field: FilteredKeyPath<AdminData, boolean>) {
    askToggleBooleanFieldMessageBox(
        adminApi,
        '管理員',
        booleanFieldToTextMap,
        row.account,
        dataTablePageRef,
        row,
        field,
    );

    return false;
}
</script>
