<template>
    <data-table-page
        ref="dataTablePageRef"
        v-model:form-data="formData"
        add-data-btn-text="新增管理員"
        dialog-title-suffix="管理員"
        title="管理員管理"
        :confirm-delete-message-render="(row) => `確定要刪除 ${row.account} 嗎？`"
        :crud-api="useAdminApi()"
        :disable-row-delete-btn-rule="(row) => row.id === profileState.id"
        :form-rules="formRules"
    >
        <template #table>
            <el-table-column
                label="帳號"
                prop="account"
            />
            <el-table-column
                label="Email"
                prop="email"
            />
            <el-table-confirmable-status-switch-column
                field="enabled"
                label="啟用"
                :confirm-message="(row) => `是否切換管理員 ${row.account} 的啟用狀態？`"
                :crud-api="useAdminApi()"
                :disabled-condition="(row) => row.id === profileState.id"
                @status-change="dataTablePageRef?.loadData()"
            />
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
                :rules="[
                    {
                        message: '請輸入密碼',
                        required: !formData.id,
                    },
                    ...commonElFormItemRules.adminPassword,
                ]"
            />
            <el-form-input
                v-model="formData.confirmPassword"
                label="確認密碼"
                name="confirm-password"
                prop="confirmPassword"
                type="password"
                :rules="formConfirmPasswordFieldItemRules"
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
import type { FormItemRule } from 'element-plus';

import type { AdminFormData } from '@/types/data/admin';

// Variables
const dataTablePageRef = useTemplateRef('dataTablePageRef');
const formData = ref<AdminFormData>({
    account: '',
    confirmPassword: '',
    email: '',
    enabled: false,
    id: '',
    password: '',
});

const formRules: ElFormRules<AdminFormData> = {
    account: [createElFormItemRuleWithDefaults('請輸入帳號')],
    email: [
        createElFormItemRuleWithDefaults(
            '請輸入正確的Email',
            {
                required: false,
                type: 'email',
            },
        ),
    ],
};

const profileState = useProfileState();

// Computed properties
const formConfirmPasswordFieldItemRules = computed<FormItemRule[]>(() => [
    {
        message: '請輸入確認密碼',
        required: !formData.value.id || !!formData.value.password,
    },
    {
        validator(_, value, callback) {
            if (value !== formData.value.password) return callback('確認密碼與密碼不一致');
            return callback();
        },
    },
]);
</script>
