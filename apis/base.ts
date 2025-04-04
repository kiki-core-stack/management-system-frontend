import type { AxiosRequestConfig } from 'axios';

export abstract class BaseCrudApi<T extends TableRowData = TableRowData> {
    protected readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    create(data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
        return postApi(this.baseUrl, this.processCreateOrUpdateData(data), config);
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

    processCreateOrUpdateData(data: OmitMongooseTimestampAndOtherFields<T>) {
        return data;
    }

    update(id: string, data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
        return putApi(`${this.baseUrl}/${id}`, this.processCreateOrUpdateData(data), config);
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
