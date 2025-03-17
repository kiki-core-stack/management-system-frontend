<template>
    <el-form-input
        v-show="isEmailOtpEnable"
        ref="emailOtpCodeFormInputItemRef"
        v-model="formData.emailOtpCode!"
        label="Email OTP驗證碼"
        maxlength="6"
        prop="emailOtpCode"
        :rules="isEmailOtpEnable ? formRules.emailOtpCode : []"
        enable-append-slot
    >
        <template #append>
            <el-button
                type="primary"
                :disabled="false
                    || !!sendEmailOtpCodeCoolingSecondsRef
                    || sendEmailOtpCodeState.state.error
                    || sendEmailOtpCodeState.state.loading
                    || sendEmailOtpCodeState.state.success
                "
                @click="sendEmailOtpCode"
            >
                <icon-xmark
                    v-if="sendEmailOtpCodeState.state.error"
                    class="fs-18px text-#dc3545"
                />
                <loading-spinner
                    v-else-if="sendEmailOtpCodeState.state.loading"
                    border-size="0.125rem"
                    size="1rem"
                />
                <icon-check
                    v-else-if="sendEmailOtpCodeState.state.success"
                    class="fs-18px text-#198754"
                />
                <span v-else>{{ sendEmailOtpCodeCoolingSecondsRef || '獲取' }}</span>
            </el-button>
        </template>
    </el-form-input>
    <el-form-input
        v-show="isTotpEnable"
        ref="totpCodeFormInputItemRef"
        v-model="formData.totpCode!"
        inputmode="tel"
        label="TOTP驗證碼"
        maxlength="6"
        prop="totpCode"
        :rules="isTotpEnable ? formRules.totpCode : []"
    />
</template>

<script lang="ts" setup>
import { sendEmailOtpCodeCoolingSeconds } from '@kiki-core-stack/pack/constants/otp';
import type { EmailOtpCodeType } from '@kiki-core-stack/pack/types/otp';

interface Props {
    emailOtpCodeType: EmailOtpCodeType;
    forceEnabledFields?: TwoFactorAuthenticationMethod[];
    formData: TwoFactorAuthenticationCodesData;
}

// Define props, models and emits
const props = defineProps<Props>();

// Variables
const emailOtpCodeFormInputItemRef = ref<ComponentRef<'ElFormInput'>>(null);
const formRules: ElFormRules<TwoFactorAuthenticationCodesData> = {
    emailOtpCode: [
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

const sendEmailOtpCodeCoolingInterval = ref<Nullable<NodeJS.Timeout>>(null);
const sendEmailOtpCodeCoolingSecondsRef = ref(0);
const sendEmailOtpCodeState = createLoadingState();
const totpCodeFormInputItemRef = ref<ComponentRef<'ElFormInput'>>(null);

// Computed properties
const isEmailOtpEnable = computed(() => {
    return props.forceEnabledFields?.includes('emailOtp') || accountState.twoFactorAuthenticationStatus.emailOtp;
});

const isTotpEnable = computed(() => {
    return props.forceEnabledFields?.includes('totp') || accountState.twoFactorAuthenticationStatus.totp;
});

// Functions
async function sendEmailOtpCode() {
    if (sendEmailOtpCodeState.state.loading) return;
    clearIntervalRef(sendEmailOtpCodeCoolingInterval);
    sendEmailOtpCodeState.state.loading = true;
    const response = await postApi('/api/send-email-otp-code', { type: props.emailOtpCodeType });
    sendEmailOtpCodeState.reset();
    sendEmailOtpCodeState.state.loading = false;
    if (!response?.data.success) {
        sendEmailOtpCodeState.state.error = true;
        return;
    }

    sendEmailOtpCodeState.state.success = true;
    sendEmailOtpCodeCoolingSecondsRef.value = sendEmailOtpCodeCoolingSeconds + 1;
    sendEmailOtpCodeCoolingInterval.value = setInterval(() => {
        sendEmailOtpCodeCoolingSecondsRef.value--;
        if (sendEmailOtpCodeCoolingSecondsRef.value <= 0) clearIntervalRef(sendEmailOtpCodeCoolingInterval);
    }, 1000);
}

// Exposes
defineExpose({
    focus(field?: 'emailOtpCode' | 'totpCode') {
        if (field === 'emailOtpCode' || (!field && isEmailOtpEnable.value && !props.formData.emailOtpCode)) {
            emailOtpCodeFormInputItemRef.value?.focus();
        }

        if (field === 'totpCode' || (!field && isTotpEnable.value && !props.formData.totpCode)) {
            totpCodeFormInputItemRef.value?.focus();
        }
    },
});
</script>
