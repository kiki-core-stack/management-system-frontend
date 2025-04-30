import type { AxiosRequestConfig } from 'axios';

export abstract class BaseCrudApi<T extends TableRowData = TableRowData> {
    protected readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async create(data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
        try {
            return await postApi(this.baseUrl, await this.processCreateOrUpdateData(data), config);
        } catch {}
    }

    delete(id: string) {
        return deleteApi(`${this.baseUrl}/${id}`);
    }

    get(id: string, params?: Record<string, any>, config?: AxiosRequestConfig) {
        return getApi<T>(`${this.baseUrl}/${id}`, params, config);
    }

    getList(params?: GetListApiParams) {
        if (params) params = cloneDeep(params);
        if (params?.fields) params.fields = JSON.stringify(params.fields);
        if (params?.filter) params.filter = JSON.stringify(params.filter);
        return getApi<{ count: number; list: T[]; totals?: Record<string, number | string> }>(
            `${this.baseUrl}/list`,
            params,
        );
    }

    // eslint-disable-next-line require-await
    async processCreateOrUpdateData(data: OmitMongooseTimestampAndOtherFields<T>) {
        return data;
    }

    async update(id: string, data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
        try {
            return await putApi(`${this.baseUrl}/${id}`, await this.processCreateOrUpdateData(data), config);
        } catch {}
    }

    updateBooleanField(id: string, field: FilteredKeyPath<TableRowData, boolean>, value: boolean) {
        return patchApi(
            `${this.baseUrl}/${id}/boolean-field`,
            {
                field,
                value,
            },
        );
    }
}
