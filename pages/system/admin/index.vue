<template>
    <el-table-page
        ref="elTablePageRef"
        add-data-btn-text="新增管理員"
        dialog-title-suffix="管理員"
        title="管理員管理"
        :ask-delete-row-message-render="(rowData: AdminData) => `確定要刪除 ${rowData.account} 嗎？`"
        :crud-api-class="adminApi"
        :disable-row-delete-btn-rule="(rowData: AdminData) => rowData.id === profileState.id"
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
            <el-table-column
                align="center"
                label="Email OTP驗證"
            >
                <template #default="{ row }">
                    <el-switch
                        v-model="row.twoFactorAuthenticationStatus.emailOtp"
                        :before-change="() => {
                            return showAskToggleBooleanFieldMessageBox(row, 'twoFactorAuthenticationStatus.emailOtp');
                        }"
                    />
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="TOTP驗證"
            >
                <template #default="{ row }">
                    <el-switch
                        v-model="row.twoFactorAuthenticationStatus.totp"
                        :before-change="() => {
                            return showAskToggleBooleanFieldMessageBox(row, 'twoFactorAuthenticationStatus.totp');
                        }"
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
            <el-form-switch
                v-model="formData.twoFactorAuthenticationStatus.emailOtp"
                label="Email OTP驗證"
                prop="twoFactorAuthenticationStatus.emailOtp"
            />
            <el-form-switch
                v-model="formData.twoFactorAuthenticationStatus.totp"
                label="TOTP驗證"
                prop="twoFactorAuthenticationStatus.totp"
            />
        </template>
    </el-table-page>
</template>

<script lang="ts" setup>
import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';

import { adminApi } from '@/apis/admin';

// Variables
const booleanFieldToTextMap: ReadonlyRecord<FilteredKeyPath<AdminData, boolean>, string> = Object.freeze({
    'enabled': '啟用',
    'twoFactorAuthenticationStatus.emailOtp': 'Email OTP驗證',
    'twoFactorAuthenticationStatus.totp': 'TOTP驗證',
});

const elTablePageRef = ref<ComponentRef<'ElTablePage'>>(null);
const formData = reactive<TablePageFormData<AdminData, 'totpSecret'>>({
    account: '',
    email: '',
    enabled: false,
    id: '',
    name: '',
    password: '',
    twoFactorAuthenticationStatus: {
        emailOtp: false,
        totp: false,
    },
});

const formRules: ElFormRules<AdminData> = {
    account: commonFormRules.account,
    email: commonFormRules.email.nonRequired,
    name: commonFormRules.name,
};

// Functions
function showAskToggleBooleanFieldMessageBox(rowData: AdminData, field: FilteredKeyPath<AdminData, boolean>) {
    askToggleBooleanFieldMessageBox(
        adminApi,
        '管理員',
        booleanFieldToTextMap,
        rowData.account,
        elTablePageRef,
        rowData,
        field,
    );

    return false;
}
</script>
