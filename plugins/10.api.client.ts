export default defineNuxtPlugin(() => {
    apiInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (!(error instanceof AxiosError)) throw error;
            if (!error.response) {
                ElNotification.error('請檢查網路連線！');
                return;
            }

            if (error.response.status === 401) {
                assignToUrlOrNavigateTo('/login', true);
                return;
            }

            if (error.response.status === 502) {
                ElNotification.error('系統錯誤！');
                return;
            }

            if (accountState.autoUpdateTwoFactorAuthenticationStatus && error.response.data.data?.requiredTwoFactorAuthentications) {
                Object.assign(
                    accountState.twoFactorAuthenticationStatus,
                    error.response.data.data.requiredTwoFactorAuthentications,
                );
            }

            ElNotification.error(error.response.data.message);
            return error.response;
        },
    );
});
