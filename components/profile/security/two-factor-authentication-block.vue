<template>
	<div
		class="relative w-full p-4 bg-white dark:bg-dark rounded-10px color-mode-transition overflow-auto"
		v-loading="isLoadingData"
	>
		<p class="mb-4 fs-20px text-center">二階段驗證</p>
		<el-form-switch
			label="Email OTP驗證碼"
			:before-change="() => beforeSwitchChange('emailOtp')"
			v-model="accountState.twoFactorAuthenticationStatus.emailOtp"
		/>
		<el-form-switch
			class="mb-0!"
			label="TOTP驗證碼"
			:before-change="() => beforeSwitchChange('totp')"
			v-model="accountState.twoFactorAuthenticationStatus.totp"
		/>
	</div>
	<el-dialog
		width="96vmin"
		:close-on-click-modal="!toggleState.loading"
		:close-on-press-escape="!toggleState.loading"
		:title="`切換${methodToTextMap[toToggleMethod]}狀態`"
		v-model="isDialogOpen"
		append-to-body
		align-center
		center
		draggable
	>
		<el-form ref="formRef" class="fs-16px text-center" :model="formData" @submit.prevent="toggleStatus">
			<p class="mb-1">輸入驗證碼並送出以切換狀態</p>
			<div v-if="toToggleMethod === 'totp'">
				<div class="w-full flex-col flex-middle" v-if="totpSecretData.secret">
					<p>請使用TOTP應用程式(例如Google Authenticator)掃描該QRCode或自行輸入設定金鑰獲取驗證碼</p>
					<QRCodeVue
						class="max-w-250px! w-full! h-auto! mt-4 p-3 bg-white rounded-3"
						level="L"
						render-as="svg"
						:value="decodeURI(totpSecretData.url)"
					/>
					<el-form-input
						class="w-full mt-4"
						label="設定金鑰"
						v-model="totpSecretData.secret"
						enable-copy-btn
						disabled
					/>
				</div>
			</div>
			<two-factor-authentication-code-inputs :force-enabled-fields="[toToggleMethod]" :form-data="formData" />
			<el-button native-type="submit" type="primary">切換</el-button>
		</el-form>
		<state-absolute loading-text="切換中..." :state="toggleState" />
	</el-dialog>
</template>

<script lang="ts" setup>
import type { ProfileSecurityTotpSecretData } from '@kikiutils/kiki-core-stack-pack/types/data/profile';
import QRCodeVue from 'qrcode.vue';

import ProfileSecurityApi from '@/apis/profile/security';

// Variables
const { state: toggleState } = createLoadingState();
const formData = reactive<TwoFactorAuthenticationCodesData>({ emailOtpCode: '', totpCode: '' });
const formRef = ref<ElFormRef>(null);
const isDialogOpen = ref(false);
const isLoadingData = ref(true);
const methodToTextMap: Record<TwoFactorAuthenticationMethod, string> = { emailOtp: 'Email OTP驗證碼', totp: 'TOTP驗證碼' };
const toToggleMethod = ref<TwoFactorAuthenticationMethod>('emailOtp');
const totpSecretData = reactive<ProfileSecurityTotpSecretData>({ secret: '', url: '' });

// Functions
function beforeSwitchChange(method: TwoFactorAuthenticationMethod) {
	formRef.value?.resetFields();
	isDialogOpen.value = true;
	toToggleMethod.value = method;
	return false;
}

async function loadData() {
	isLoadingData.value = true;
	const response = await ProfileSecurityApi.getTotpSecret();
	isLoadingData.value = false;
	if (response.data.success) clearAndAssignObject(totpSecretData, response.data.data);
}

async function toggleStatus() {
	if (toggleState.loading) return;
	await formRef.value?.validate(async (valid) => {
		if (!valid) return;
		accountState.autoUpdateTwoFactorAuthenticationStatus = !(toggleState.loading = true);
		const response = await ProfileSecurityApi.toggleTwoFactorAuthenticationStatus(toToggleMethod.value, formData);
		accountState.autoUpdateTwoFactorAuthenticationStatus = !(toggleState.loading = false);
		if (!response.data.success) return;
		ElNotification.success('切換成功！');
		isDialogOpen.value = false;
		setTimeout(loadData, 500);
		await updateAdminInfoState();
	});
}

// Hooks
onMounted(loadData);
</script>
