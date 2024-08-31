<template>
	<Head>
		<Title>登入</Title>
	</Head>
	<p class="fs-32px">後台管理系統登入</p>
	<el-form ref="formRef" class="mt-4" :model="formData" :rules="formRules" @submit.prevent="login" hide-required-asterisk>
		<el-form-input ref="accountInputRef" label="帳號" name="account" prop="account" v-model="formData.account" />
		<el-form-input label="密碼" name="password" prop="password" type="password" v-model="formData.password" />
		<two-factor-authentication-code-inputs ref="twoFactorAuthenticationCodeInputsRef" :form-data="formData" />
		<div class="flex items-center">
			<el-form-input
				ref="verCodeInputRef"
				class="mb-0!"
				autocomplete="off"
				label="驗證碼"
				maxlength="4"
				name="ver-code"
				prop="verCode"
				v-model="formData.verCode"
			/>
			<img class="ml-2 cursor-pointer" height="50" width="150" :src="verCodeSrc" @click="reloadVerCode" />
		</div>
		<el-button class="mt-4" native-type="submit">登入</el-button>
	</el-form>
	<state-absolute loading-text="登入中..." success-text="登入成功！" :state="loginState" />
</template>

<script lang="ts" setup>
import type { AdminLoginFormData } from '@kikiutils/el-plus-admin-pack/types/data/admin';
import { mapValues } from 'lodash-es';

import AdminAuthApi from '@/apis/admin/auth';

definePageMeta({ layout: 'middle-block' });

// Variables
const { state: loginState } = createLoadingState();
const accountInputRef = ref<ElFormInputRef>(null);
const formData = reactive<AdminLoginFormData>({
	account: '',
	emailOtpCode: '',
	password: '',
	totpCode: '',
	verCode: ''
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
			min: 4
		}
	]
};

const twoFactorAuthenticationCodeInputsRef = ref<ComponentRef<'TwoFactorAuthenticationCodeInputs'>>(null);
const verCodeInputRef = ref<ElFormInputRef>(null);
const verCodeSrc = ref('/api/ver-code');

// Functions
async function login() {
	if (loginState.loading) return;
	await formRef.value?.validate(async (valid) => {
		if (!valid) return;
		loginState.loading = true;
		const response = await AdminAuthApi.login(formData);
		if (response.status === 404) {
			accountInputRef.value?.focus();
			mapValues(accountState.twoFactorAuthenticationStatus, () => false);
		} else if (response.data.data?.isVerCodeIncorrect) verCodeInputRef.value?.focus();
		else if (response.data.data?.requiredTwoFactorAuthentications) twoFactorAuthenticationCodeInputsRef.value?.focus();
		else if (response.data.success) {
			formRef.value?.resetFields();
			loginState.success = true;
			await updateAdminInfoState();
			setTimeout(() => navigateTo(flattenToSingleValue(useRoute().query.redirect, '/'), { replace: true }), 1000);
			return;
		}

		loginState.loading = false;
		reloadVerCode();
		formRef.value?.resetFields([
			'emailOtpCode',
			'totpCode',
			'verCode'
		]);
	});
}

function reloadVerCode() {
	formData.verCode = '';
	verCodeSrc.value = `/api/ver-code?${Date.now()}`;
}
</script>
