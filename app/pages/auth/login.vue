<template>
    <div>
        <Head>
            <Title>登入</Title>
        </Head>
        <h1 class="fs-32px text-center">
            後台管理系統登入
        </h1>
        <div class="mt-4 flex w-full items-center gap-8 md:px-8">
            <el-form
                ref="formRef"
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
                <div class="mt-4 flex justify-center gap-1">
                    <el-button
                        class="md:hidden!"
                        @click="isLoginQrCodeDialogOpen = true"
                    >
                        QR Code登入
                    </el-button>
                    <el-button
                        class="ml-0!"
                        native-type="submit"
                    >
                        登入
                    </el-button>
                </div>
            </el-form>
            <qr-code-login-block
                class="hidden! md:flex!"
                :qr-code-image-src="qrCodeLoginImageSrc"
                @reload="reloadLoginQrCodeAndStartPolling"
            />
        </div>
        <el-dialog
            v-model="isLoginQrCodeDialogOpen"
            :width="elDialogWidthByWindowSize"
            align-center
            append-to-body
            center
        >
            <qr-code-login-block
                class="mt-4"
                :qr-code-image-src="qrCodeLoginImageSrc"
                @reload="reloadLoginQrCodeAndStartPolling"
            />
        </el-dialog>
        <status-overlay ref="statusOverlayRef" />
    </div>
</template>

<script lang="ts" setup>
import type { AdminLoginFormData } from '@kiki-core-stack/pack/types/data/admin';
import { useQRCode } from '@vueuse/integrations/useQRCode';
import { CanceledError } from 'axios';

import { updateProfileState } from '@/libs/profile';
import { initializeAppSession } from '@/libs/session';

definePageMeta({
    keepalive: false,
    layout: 'middle-block',
});

// Constants/Refs/Variables
const accountInputRef = useTemplateRef('accountInputRef');
const authApi = useAuthApi();
let currentQrCodeLoginPollingAbortController: AbortController | undefined;
const formData = ref<AdminLoginFormData>({
    account: '',
    password: '',
    verCode: '',
});

const formRef = useTemplateRef('formRef');
const formRules: ElFormRules<AdminLoginFormData> = {
    account: [createElFormItemRuleWithDefaults('請輸入帳號')],
    password: [createElFormItemRuleWithDefaults('請輸入密碼')],
    verCode: [
        createElFormItemRuleWithDefaults('請輸入驗證碼'),
        {
            max: 4,
            message: '驗證碼必須為四個字',
            min: 4,
        },
    ],
};

const isLoginQrCodeDialogOpen = ref(false);
const qrCodeLoginToken = shallowRef('');
const qrCodeLoginImageSrc = useQRCode(
    qrCodeLoginToken,
    {
        errorCorrectionLevel: 'L',
        margin: 0,
        type: 'image/webp',
    },
);

const statusOverlayRef = useTemplateRef('statusOverlayRef');
const verCodeInputRef = useTemplateRef('verCodeInputRef');
const verCodeSrc = ref('/api/ver-code');

// Functions
async function handleLoginSuccess() {
    currentQrCodeLoginPollingAbortController?.abort();
    await updateProfileState();
    ElNotification.success('登入成功');
    initializeAppSession();
    navigateTo(extractFirstValue(useRoute().query.redirect, '/'), { replace: true });
}

async function login() {
    if (!statusOverlayRef.value || statusOverlayRef.value?.isVisible) return;
    await formRef.value?.validate(async (valid) => {
        if (!valid) return;
        statusOverlayRef.value!.showLoading('登入中...');
        const response = await authApi.login(formData.value);
        if (response?.status === 404) accountInputRef.value?.focus();
        else if (response?.data?.errorCode === 'invalidVerificationCode') verCodeInputRef.value?.focus();
        else if (response?.data?.success) return await handleLoginSuccess();
        statusOverlayRef.value!.hide();
        reloadVerCode();
    });
}

async function reloadLoginQrCodeAndStartPolling() {
    currentQrCodeLoginPollingAbortController?.abort();
    const response = await authApi.getQrCodeLoginToken(qrCodeLoginToken.value || undefined);
    if (response?.data?.success) {
        qrCodeLoginToken.value = response.data.data!.token;
        startQrCodeLoginPolling();
    }
}

function reloadVerCode() {
    formRef.value?.resetFields(['verCode']);
    verCodeSrc.value = `/api/ver-code?${Date.now()}`;
}

async function startQrCodeLoginPolling() {
    currentQrCodeLoginPollingAbortController?.abort();
    currentQrCodeLoginPollingAbortController = new AbortController();
    const response = await authApi.checkQrCodeLoginStatus(
        qrCodeLoginToken.value,
        undefined,
        {
            signal: currentQrCodeLoginPollingAbortController.signal,
            skipShowErrorMessage: true,
        },
    );

    if (response?.error instanceof CanceledError) return;
    if (response?.data?.data?.status === 'success') return await handleLoginSuccess();
    else if (!response?.data?.success) {
        if (response?.status === 410) {
            ElNotification.error('QR Code已過期，已自動刷新');
            await reloadLoginQrCodeAndStartPolling();
        } else {
            ElNotification.error(response?.data?.message || '系統錯誤');
            return setTimeout(startQrCodeLoginPolling, 1000);
        }
    }

    startQrCodeLoginPolling();
}

// Hooks
onMounted(reloadLoginQrCodeAndStartPolling);
</script>
