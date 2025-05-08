import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
} from 'axios';

import { createApiAxiosInstance } from '../instance';

export class BaseApi {
    protected readonly axiosInstance: AxiosInstance;

    constructor(baseUrl?: string) {
        this.axiosInstance = createApiAxiosInstance({ baseURL: baseUrl });
    }

    protected deleteRequest<T extends object | undefined = undefined, E extends string | undefined = undefined>(
        url?: string,
        params?: any,
        config?: AxiosRequestConfig,
    ) {
        return this.request<T, E>('delete', url, params, config);
    }

    protected getRequest<T extends object | undefined = undefined, E extends string | undefined = undefined>(
        url?: string,
        params?: any,
        config?: AxiosRequestConfig,
    ) {
        return this.request<T, E>('get', url, params, config);
    }

    protected patchRequest<T extends object | undefined = undefined, E extends string | undefined = undefined>(
        url?: string,
        data?: any,
        config?: AxiosRequestConfig,
    ) {
        return this.request<T, E>('patch', url, {}, data, config);
    }

    protected postRequest<T extends object | undefined = undefined, E extends string | undefined = undefined>(
        url?: string,
        data?: any,
        config?: AxiosRequestConfig,
    ) {
        return this.request<T, E>('post', url, {}, data, config);
    }

    protected putRequest<T extends object | undefined = undefined, E extends string | undefined = undefined>(
        url?: string,
        data?: any,
        config?: AxiosRequestConfig,
    ) {
        return this.request<T, E>('put', url, {}, data, config);
    }

    protected request<
        T extends object | undefined = undefined,
        E extends string | undefined = undefined,
        R extends AxiosResponse<ApiResponseData<T, E>> | undefined = AxiosResponse<ApiResponseData<T, E>> | undefined,
        D = any,
    >(
        method: Method,
        url?: string,
        params?: any,
        data?: D,
        config?: AxiosRequestConfig<D>,
    ) {
        return this.axiosInstance.request<T, R, D>({
            ...config,
            data,
            method,
            params,
            url,
        });
    }
}
