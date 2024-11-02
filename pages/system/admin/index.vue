<template>
	<p-table-page
		ref="pTablePageRef"
		add-data-btn-text="新增管理員"
		dialog-title-suffix="管理員"
		title="管理員管理"
		:ask-delete-row-message-render="(rowData: AdminData) => `確定要刪除 ${rowData.account} 嗎？`"
		:crud-api-class="AdminAPI"
		:disable-row-delete-btn-rule="(rowData: AdminData) => rowData.id === adminInfoState.id"
		:form-data="formData"
		:form-rules="formRules"
	>
		<template #table>
			<PColumn field="account" header="帳號" />
			<PColumn field="name" header="名稱" />
			<PColumn field="email" header="Email" />
			<PColumn class="minww-65px center" header="啟用">
				<template #body="{ data }">
					<div class="flex-middle">
						<el-switch
							:before-change="() => showAskToggleBooleanFieldMessageBox(data, 'enabled')"
							:disabled="data.id === adminInfoState.id"
							v-model="data.enabled"
						/>
					</div>
				</template>
			</PColumn>
			<PColumn class="minww-139px center" header="Email OTP驗證">
				<template #body="{ data }">
					<div class="flex-middle">
						<el-switch
							:before-change="
								() => showAskToggleBooleanFieldMessageBox(data, 'twoFactorAuthenticationStatus.emailOTP')
							"
							v-model="data.twoFactorAuthenticationStatus.emailOTP"
						/>
					</div>
				</template>
			</PColumn>
			<PColumn class="minww-95px center" header="TOTP驗證">
				<template #body="{ data }">
					<div class="flex-middle">
						<el-switch
							:before-change="
								() => showAskToggleBooleanFieldMessageBox(data, 'twoFactorAuthenticationStatus.totp')
							"
							v-model="data.twoFactorAuthenticationStatus.totp"
						/>
					</div>
				</template>
			</PColumn>
		</template>
		<template #form>
			<el-form-input label="帳號" maxlength="16" name="account" prop="account" v-model="formData.account" />
			<el-form-input label="名稱" maxlength="16" name="name" prop="name" v-model="formData.name" />
			<el-form-input label="Email" name="email" prop="email" type="email" v-model="formData.email" />
			<el-form-input
				autocomplete="new-password"
				name="password"
				prop="password"
				type="password"
				:label="`${formData.id ? '修改' : ''}密碼`"
				:rules="[{ message: '請輸入密碼', required: !formData.id }]"
				v-model="formData.password"
			/>
			<el-form-switch
				label="啟用"
				prop="enabled"
				:disabled="formData.id === adminInfoState.id"
				v-model="formData.enabled"
			/>
			<el-form-switch
				label="Email OTP驗證"
				prop="twoFactorAuthenticationStatus.emailOTP"
				v-model="formData.twoFactorAuthenticationStatus.emailOTP"
			/>
			<el-form-switch
				label="TOTP驗證"
				prop="twoFactorAuthenticationStatus.totp"
				v-model="formData.twoFactorAuthenticationStatus.totp"
			/>
		</template>
	</p-table-page>
</template>

<script lang="ts" setup>
import type { AdminData } from '@kikiutils/kiki-core-stack-pack/types/data/admin';

import { AdminAPI } from '@/apis/admin';

// Variables
const booleanFieldToTextMap: ReadonlyRecord<FilteredKeyPath<AdminData, boolean>, string> = Object.freeze({
	'twoFactorAuthenticationStatus.emailOTP': 'Email OTP驗證',
	'twoFactorAuthenticationStatus.totp': 'TOTP驗證',
	enabled: '啟用'
});

const formData = reactive<TablePageFormData<AdminData, 'totpSecret'>>({
	account: '',
	email: '',
	enabled: false,
	id: '',
	name: '',
	password: '',
	twoFactorAuthenticationStatus: { emailOTP: false, totp: false }
});

const formRules: ElFormRules<AdminData> = {
	account: commonFormRules.account,
	email: commonFormRules.email.nonRequired,
	name: commonFormRules.name
};

const pTablePageRef = ref<ComponentRef<'PTablePage'>>(null);

// Functions
function showAskToggleBooleanFieldMessageBox(rowData: AdminData, field: FilteredKeyPath<AdminData, boolean>) {
	askToggleBooleanFieldMessageBox(AdminAPI, '管理員', booleanFieldToTextMap, rowData.account, pTablePageRef, rowData, field);
	return false;
}
</script>
