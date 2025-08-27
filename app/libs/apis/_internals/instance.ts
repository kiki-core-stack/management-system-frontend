import axios, { AxiosError } from 'axios';
import type { CreateAxiosDefaults } from 'axios';

export function createApiAxiosInstance(config?: CreateAxiosDefaults) {
    const instance = axios.create(config);
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (!(error instanceof AxiosError)) throw error;
            if (!error.response) {
                if (!error.config?.skipShowErrorMessage) ElNotification.error('請檢查網路連線');
                return { error };
            }

            if (error.response.status === 401) assignUrlWithRedirectParamFromCurrentLocation('/auth/login/');
            else if (!error.config?.skipShowErrorMessage) ElNotification.error(error.response.data.message || '系統錯誤');

            return Object.assign(error.response, { error });
        },
    );

    return instance;
}
