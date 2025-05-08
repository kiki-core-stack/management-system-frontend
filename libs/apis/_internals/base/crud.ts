import type { AxiosRequestConfig } from 'axios';

import { BaseApi } from './';

export abstract class BaseCrudApi<T extends TableRowData = TableRowData> extends BaseApi {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async create(data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
        try {
            return await this.postRequest(undefined, await this.processCreateOrUpdateData(data), config);
        } catch {}
    }

    delete(id: string) {
        return this.deleteRequest(`/${id}`);
    }

    get(id: string, params?: any) {
        return this.getRequest<T>(`/${id}`, params);
    }

    getList(params?: GetListApiParams) {
        if (params) params = cloneDeep(params);
        if (params?.fields) params.fields = JSON.stringify(params.fields);
        if (params?.filter) params.filter = JSON.stringify(params.filter);
        return this.getRequest<{ count: number; list: T[]; totals?: Record<string, number | string> }>('/list', params);
    }

    // eslint-disable-next-line require-await
    async processCreateOrUpdateData(data: OmitMongooseTimestampAndOtherFields<T>) {
        return data;
    }

    async update(id: string, data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
        try {
            return await this.putRequest(`/${id}`, await this.processCreateOrUpdateData(data), config);
        } catch {}
    }
}
