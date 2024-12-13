<template>
    <el-form-input
        v-show="isEmailOTPEnable"
        ref="emailOTPCodeFormInputItemRef"
        v-model="formData.emailOTPCode!"
        label="Email OTP驗證碼"
        maxlength="6"
        prop="emailOTPCode"
        :rules="isEmailOTPEnable ? formRules.emailOTPCode : []"
        enable-append-slot
    >
        <template #append>
            <el-button
                type="primary"
                :disabled="false
                    || !!sendEmailOTPCodeCoolingSecondsRef
                    || sendEmailOTPCodeState.state.error
                    || sendEmailOTPCodeState.state.loading
                    || sendEmailOTPCodeState.state.success
                "
                @click="sendEmailOTPCode"
            >
                <icon-xmark
                    v-if="sendEmailOTPCodeState.state.error"
                    class="fs-18px text-#dc3545"
                />
                <loading-spinner
                    v-else-if="sendEmailOTPCodeState.state.loading"
                    border-size="0.125rem"
                    size="1rem"
                />
                <icon-check
                    v-else-if="sendEmailOTPCodeState.state.success"
                    class="fs-18px text-#198754"
                />
                <span v-else>{{ sendEmailOTPCodeCoolingSecondsRef || '獲取' }}</span>
            </el-button>
        </template>
    </el-form-input>
    <el-form-input
        v-show="isTOTPEnable"
        ref="totpCodeFormInputItemRef"
        v-model="formData.totpCode!"
        inputmode="tel"
        label="TOTP驗證碼"
        maxlength="6"
        prop="totpCode"
        :rules="isTOTPEnable ? formRules.totpCode : []"
    />
</template>

<script lang="ts" setup>
import { sendEmailOTPCodeCoolingSeconds } from '@kiki-core-stack/pack/constants/two-factor-authentication';

interface Props {
    forceEnabledFields?: TwoFactorAuthenticationMethod[];
    formData: TwoFactorAuthenticationCodesData;
}

// Props and emits
const props = defineProps<Props>();

// Variables
const emailOTPCodeFormInputItemRef = ref<ComponentRef<'ElFormInput'>>(null);
const formRules: ElFormRules<TwoFactorAuthenticationCodesData> = {
    emailOTPCode: [
        createElFormItemRule('請輸入驗證碼'),
        {
            max: 6,
            message: '驗證碼必須為六個字',
            min: 6,
        },
    ],
    totpCode: [
        createElFormItemRule('請輸入驗證碼'),
        {
            message: '驗證碼必須為六位數字',
            pattern: /^\d{6}$/,
        },
    ],
};

const sendEmailOTPCodeCoolingInterval = ref<Nullable<NodeJS.Timeout>>(null);
const sendEmailOTPCodeCoolingSecondsRef = ref(0);
const sendEmailOTPCodeState = createLoadingState();
const totpCodeFormInputItemRef = ref<ComponentRef<'ElFormInput'>>(null);

// Computed properties
const isEmailOTPEnable = computed(() => props.forceEnabledFields?.includes('emailOTP') || accountState.twoFactorAuthenticationStatus.emailOTP);
const isTOTPEnable = computed(() => props.forceEnabledFields?.includes('totp') || accountState.twoFactorAuthenticationStatus.totp);

// Functions
async function sendEmailOTPCode() {
    if (sendEmailOTPCodeState.state.loading) return;
    clearIntervalRef(sendEmailOTPCodeCoolingInterval);
    sendEmailOTPCodeState.state.loading = true;
    const response = await postAPI('/api/admin/auth/otp/email/send');
    sendEmailOTPCodeState.reset();
    sendEmailOTPCodeState.state.loading = false;
    if (!response?.data.success) return sendEmailOTPCodeState.state.error = true;
    sendEmailOTPCodeState.state.success = true;
    sendEmailOTPCodeCoolingSecondsRef.value = sendEmailOTPCodeCoolingSeconds + 1;
    sendEmailOTPCodeCoolingInterval.value = setInterval(() => {
        sendEmailOTPCodeCoolingSecondsRef.value--;
        if (sendEmailOTPCodeCoolingSecondsRef.value <= 0) clearIntervalRef(sendEmailOTPCodeCoolingInterval);
    }, 1000);
}

// Exposes
defineExpose({
    focus(field?: 'emailOTPCode' | 'totpCode') {
        if (field === 'emailOTPCode' || (!field && isEmailOTPEnable.value && !props.formData.emailOTPCode)) emailOTPCodeFormInputItemRef.value?.focus();
        if (field === 'totpCode' || (!field && isTOTPEnable.value && !props.formData.totpCode)) totpCodeFormInputItemRef.value?.focus();
    },
});
</script>
