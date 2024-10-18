<template>
	<el-form
		ref="formRef"
		class="relative w-full p-4 bg-white dark:bg-dark rounded-10px color-mode-transition overflow-auto"
		:model="formData"
		:rules="formRules"
		@submit.prevent="changePassword"
	>
		<p class="fs-20px text-center">變更密碼</p>
		<el-form-input
			class="mt-4"
			label="舊密碼"
			name="old-password"
			prop="oldPassword"
			type="password"
			v-model="formData.oldPassword"
		/>
		<el-form-input
			autocomplete="new-password"
			label="新密碼"
			name="new-password"
			prop="newPassword"
			type="password"
			v-model="formData.newPassword"
		/>
		<el-form-input
			autocomplete="new-password"
			label="確認密碼"
			name="conform-password"
			prop="conformPassword"
			type="password"
			v-model="formData.conformPassword"
		/>
		<two-factor-authentication-code-inputs :form-data="formData" />
		<div class="flex-middle gap-btns">
			<el-button @click="clearChangePasswordForm">清空</el-button>
			<el-button native-type="submit">變更</el-button>
		</div>
		<state-absolute loading-text="變更中..." success-text="變更成功！" :state="changePasswordState" />
	</el-form>
</template>

<script lang="ts" setup>
import type { ProfileSecurityChangePasswordFormData } from '@kikiutils/kiki-core-stack-pack/types/data/profile';

import { ProfileSecurityAPI } from '@/apis/profile/security';

// Variables
const { state: changePasswordState } = createLoadingState();
const formData = reactive<ProfileSecurityChangePasswordFormData & TwoFactorAuthenticationCodesData>({
	conformPassword: '',
	emailOTPCode: '',
	oldPassword: '',
	newPassword: '',
	totpCode: ''
});

const formRef = ref<ElFormRef>(null);
const formRules: ElFormRules<ProfileSecurityChangePasswordFormData> = {
	conformPassword: [createElFormItemRule('請輸入確認密碼')],
	oldPassword: [createElFormItemRule('請輸入舊密碼')],
	newPassword: [createElFormItemRule('請輸入新密碼')]
};

// Functions
const clearChangePasswordForm = () => formRef.value?.resetFields();
async function changePassword() {
	if (changePasswordState.loading) return;
	await formRef.value?.validate(async (valid) => {
		if (!valid) return;
		changePasswordState.loading = true;
		const response = await ProfileSecurityAPI.changePassword(formData);
		if (!response?.data.success) return (changePasswordState.loading = false), undefined;
		changePasswordState.success = true;
		setTimeout(() => assignToUrlOrNavigateTo('/login', true), 1000);
	});
}
</script>
