export default defineNuxtPlugin(() => {
    apiInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (!(error instanceof AxiosError)) throw error;
            if (!error.response) return ElNotification.error('請檢查網路連線！'), undefined;
            if (error.response.status === 401) return assignToURLOrNavigateTo('/login', true), undefined;
            if (error.response.status === 502) return ElNotification.error('系統錯誤！'), undefined;
            if (accountState.autoUpdateTwoFactorAuthenticationStatus && error.response.data.data?.requiredTwoFactorAuthentications) Object.assign(accountState.twoFactorAuthenticationStatus, error.response.data.data.requiredTwoFactorAuthentications);
            ElNotification.error(error.response.data.message);
            return error.response;
        },
    );
});
