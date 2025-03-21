<template>
    <p-table-page
        ref="pTablePageRef"
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
            <PColumn
                field="account"
                header="帳號"
            />
            <PColumn
                field="name"
                header="名稱"
            />
            <PColumn
                field="email"
                header="Email"
            />
            <PColumn
                class="header-center"
                header="啟用"
            >
                <template #body="{ data }">
                    <div class="flex-middle">
                        <el-switch
                            v-model="data.enabled"
                            :before-change="() => showAskToggleBooleanFieldMessageBox(data, 'enabled')"
                            :disabled="data.id === profileState.id"
                        />
                    </div>
                </template>
            </PColumn>
            <PColumn
                class="header-center"
                header="Email OTP驗證"
            >
                <template #body="{ data }">
                    <div class="flex-middle">
                        <el-switch
                            v-model="data.twoFactorAuthenticationStatus.emailOtp"
                            :before-change="() => {
                                return showAskToggleBooleanFieldMessageBox(
                                    data,
                                    'twoFactorAuthenticationStatus.emailOtp',
                                );
                            }"
                        />
                    </div>
                </template>
            </PColumn>
            <PColumn
                class="header-center"
                header="TOTP驗證"
            >
                <template #body="{ data }">
                    <div class="flex-middle">
                        <el-switch
                            v-model="data.twoFactorAuthenticationStatus.totp"
                            :before-change="() => {
                                return showAskToggleBooleanFieldMessageBox(data, 'twoFactorAuthenticationStatus.totp');
                            }"
                        />
                    </div>
                </template>
            </PColumn>
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
    </p-table-page>
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

const pTablePageRef = ref<ComponentRef<'PTablePage'>>(null);

// Functions
function showAskToggleBooleanFieldMessageBox(rowData: AdminData, field: FilteredKeyPath<AdminData, boolean>) {
    askToggleBooleanFieldMessageBox(
        adminApi,
        '管理員',
        booleanFieldToTextMap,
        rowData.account,
        pTablePageRef,
        rowData,
        field,
    );

    return false;
}
</script>
