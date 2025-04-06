<template>
    <data-table-page
        ref="dataTablePageRef"
        v-model:form-data="formData"
        add-data-btn-text="新增管理員"
        dialog-title-suffix="管理員"
        title="管理員管理"
        :confirm-delete-message-render="(row: AdminData) => `確認刪除管理員 ${row.account} 嗎？`"
        :crud-api="adminApi"
        :disable-row-delete-btn-rule="(row: AdminData) => row.id === profileState.id"
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
const dataTablePageRef = ref<DataTablePageRef>(null);
const formData = ref<TablePageFormData<AdminData>>({
    account: '',
    email: '',
    enabled: false,
    id: '',
    name: '',
    password: '',
});

const formRules: ElFormRules<AdminData> = {
    account: [createElFormItemRule('請輸入帳號')],
    email: [
        createElFormItemRule(
            '請輸入正確的Email',
            {
                required: false,
                type: 'email',
            },
        ),
    ],
    name: [createElFormItemRule('請輸入名稱')],
};
</script>
