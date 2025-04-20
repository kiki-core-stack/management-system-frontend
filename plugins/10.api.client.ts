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
                assignUrlWithOptionalRedirect('/auth/login/', true);
                return;
            }

            if (error.response.status === 502) {
                ElNotification.error('系統錯誤！');
                return;
            }

            ElNotification.error(error.response.data.message);
            return error.response;
        },
    );
});
