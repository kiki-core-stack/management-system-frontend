<template>
	<el-form-input
		ref="emailOtpCodeFormInputItemRef"
		label="Email OTP驗證碼"
		maxlength="6"
		prop="emailOtpCode"
		:rules="isEmailOtpEnable ? formRules.emailOtpCode : []"
		v-model="formData.emailOtpCode!"
		v-show="isEmailOtpEnable"
		enable-append-slot
	>
		<template #append>
			<el-button
				type="primary"
				:disabled="
					!!sendEmailOtpCodeCoolingSecondsRef ||
					sendEmailOtpCodeState.state.error ||
					sendEmailOtpCodeState.state.loading ||
					sendEmailOtpCodeState.state.success
				"
				@click="sendEmailOtpCode"
			>
				<icon-xmark class="fs-18px text-#dc3545" v-if="sendEmailOtpCodeState.state.error" />
				<loading-spinner border-size="0.125rem" size="1rem" v-else-if="sendEmailOtpCodeState.state.loading" />
				<icon-check class="fs-18px text-#198754" v-else-if="sendEmailOtpCodeState.state.success" />
				<span v-else>{{ sendEmailOtpCodeCoolingSecondsRef || '獲取' }}</span>
			</el-button>
		</template>
	</el-form-input>
	<el-form-input
		ref="totpCodeFormInputItemRef"
		inputmode="tel"
		label="TOTP驗證碼"
		maxlength="6"
		prop="totpCode"
		:rules="isTotpEnable ? formRules.totpCode : []"
		v-model="formData.totpCode!"
		v-show="isTotpEnable"
	/>
</template>

<script lang="ts" setup>
import { sendEmailOtpCodeCoolingSeconds } from '@kikiutils/kiki-core-stack-pack/constants';

interface Props {
	forceEnabledFields?: TwoFactorAuthenticationMethod[];
	formData: TwoFactorAuthenticationCodesData;
}

// Props and emits
const props = defineProps<Props>();

// Variables
const emailOtpCodeFormInputItemRef = ref<ComponentRef<'ElFormInput'>>(null);
const formRules: ElFormRules<TwoFactorAuthenticationCodesData> = {
	emailOtpCode: [
		createElFormItemRule('請輸入驗證碼'),
		{
			max: 6,
			message: '驗證碼必須為六個字',
			min: 6
		}
	],
	totpCode: [
		createElFormItemRule('請輸入驗證碼'),
		{ message: '驗證碼必須為六位數字', pattern: /^[0-9]{6}$/ } /**/
	]
};

const sendEmailOtpCodeCoolingInterval = ref<Nullable<NodeJS.Timeout>>(null);
const sendEmailOtpCodeCoolingSecondsRef = ref(0);
const sendEmailOtpCodeState = createLoadingState();
const totpCodeFormInputItemRef = ref<ComponentRef<'ElFormInput'>>(null);

// Computed properties
const isEmailOtpEnable = computed(
	() => props.forceEnabledFields?.includes('emailOtp') || accountState.twoFactorAuthenticationStatus.emailOtp
);

const isTotpEnable = computed(
	() => props.forceEnabledFields?.includes('totp') || accountState.twoFactorAuthenticationStatus.totp
);

// Functions
async function sendEmailOtpCode() {
	if (sendEmailOtpCodeState.state.loading) return;
	clearIntervalRef(sendEmailOtpCodeCoolingInterval);
	sendEmailOtpCodeState.state.loading = true;
	const response = await postApi('/api/admin/auth/otp/email/send');
	sendEmailOtpCodeState.reset();
	sendEmailOtpCodeState.state.loading = false;
	if (!response?.data.success) return (sendEmailOtpCodeState.state.error = true);
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
	}
});
</script>
