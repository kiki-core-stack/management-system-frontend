<template>
    <div>
        <Head>
            <Title>登入</Title>
        </Head>
        <h1 class="fs-32px">
            後台管理系統登入
        </h1>
        <el-form
            ref="formRef"
            class="mt-4"
            label-width="auto"
            :model="formData"
            :rules="formRules"
            hide-required-asterisk
            @submit.prevent="login"
        >
            <el-form-input
                ref="accountInputRef"
                v-model="formData.account"
                label="帳號"
                name="account"
                prop="account"
            />
            <el-form-input
                v-model="formData.password"
                label="密碼"
                name="password"
                prop="password"
                type="password"
            />
            <div class="flex items-center">
                <el-form-input
                    ref="verCodeInputRef"
                    v-model="formData.verCode"
                    class="mb-0!"
                    autocomplete="off"
                    label="驗證碼"
                    maxlength="4"
                    name="ver-code"
                    prop="verCode"
                />
                <img
                    class="ml-2 cursor-pointer"
                    alt="刷新驗證碼"
                    height="50"
                    width="150"
                    :src="verCodeSrc"
                    @click="reloadVerCode"
                >
            </div>
            <el-button
                class="mt-4"
                native-type="submit"
            >
                登入
            </el-button>
        </el-form>
        <status-overlay ref="loginStatusOverlayRef" />
    </div>
</template>

<script lang="ts" setup>
import type { AdminLoginFormData } from '@kiki-core-stack/pack/types/data/admin';

import { authApi } from '@/libs/apis/auth';
import { updateProfileState } from '@/libs/profile';
import { initializeAppSession } from '@/libs/session';

definePageMeta({
    keepalive: false,
    layout: 'middle-block',
});

// Variables
const accountInputRef = ref<ElFormInputRef>(null);
const formData = ref<AdminLoginFormData>({
    account: '',
    password: '',
    verCode: '',
});

const formRef = ref<ElFormRef>(null);
const formRules: ElFormRules<AdminLoginFormData> = {
    account: [createElFormItemRule('請輸入帳號')],
    password: [createElFormItemRule('請輸入密碼')],
    verCode: [
        createElFormItemRule('請輸入驗證碼'),
        {
            max: 4,
            message: '驗證碼必須為四個字',
            min: 4,
        },
    ],
};

const loginStatusOverlayRef = ref<StatusOverlayRef>(null);
const verCodeInputRef = ref<ElFormInputRef>(null);
const verCodeSrc = ref('/api/ver-code');

// Functions
async function login() {
    if (!loginStatusOverlayRef.value || loginStatusOverlayRef.value?.isVisible) return;
    await formRef.value?.validate(async (valid) => {
        if (!valid) return;
        loginStatusOverlayRef.value!.showLoading('登入中...');
        const response = await authApi.login(formData.value);
        if (response?.status === 404) accountInputRef.value?.focus();
        else if (response?.data.errorCode === 'invalidVerificationCode') verCodeInputRef.value?.focus();
        else if (response?.data.success) {
            await updateProfileState();
            ElNotification.success('登入成功！');
            initializeAppSession();
            navigateTo(extractFirstValue(useRoute().query.redirect, '/'), { replace: true });
            return;
        }

        loginStatusOverlayRef.value!.hide();
        reloadVerCode();
    });
}

function reloadVerCode() {
    formData.value.verCode = '';
    verCodeSrc.value = `/api/ver-code?${Date.now()}`;
    formRef.value?.resetFields(['verCode']);
}
</script>
