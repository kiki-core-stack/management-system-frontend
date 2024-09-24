export default defineNuxtPlugin(() => {
	apiInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			if (!(error instanceof AxiosError)) throw error;
			if (!error.response) return ElNotification.error('請檢查網路連線！'), undefined;
			if (error.response.status === 401) return assignToUrlOrNavigateTo('/login', true), undefined;
			error.response.error = error.response.data;
			error.response.data = { message: '系統錯誤！', success: false };
			try {
				const errorMessageData = JSON.parse(error.response.error?.message || '{}');
				error.response.data.data = errorMessageData.data;
				error.response.data.message = errorMessageData.message || '系統錯誤！';
				if (accountState.autoUpdateTwoFactorAuthenticationStatus && error.response.data.data?.requiredTwoFactorAuthentications) Object.assign(accountState.twoFactorAuthenticationStatus, error.response.data.data.requiredTwoFactorAuthentications);
			} catch {}
			ElNotification.error(error.response.data.message);
			return error.response;
		}
	);
});
