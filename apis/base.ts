import type { AxiosRequestConfig } from 'axios';

export abstract class BaseCrudApi<T extends TableRowData = TableRowData> {
    protected readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    create(data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
        return postApi(this.baseUrl, data, config);
    }

    delete(id: string) {
        return deleteApi(`${this.baseUrl}/${id}`);
    }

    get(id: string) {
        return getApi<T>(`${this.baseUrl}/${id}`);
    }

    getList(params?: GetListApiParams) {
        if (params) params = cloneDeep(params);
        if (params?.filterQuery) params.filterQuery = JSON.stringify(params.filterQuery);
        if (params?.selectFields) params.selectFields = JSON.stringify(params.selectFields);
        return getApi<{ count: number; list: T[]; totals?: Dict<number | string> }>(
            `${this.baseUrl}/list`,
            params,
        );
    }

    update(id: string, data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
        return putApi(`${this.baseUrl}/${id}`, data, config);
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
