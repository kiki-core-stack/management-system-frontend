import type { AxiosRequestConfig } from 'axios';

export abstract class BaseCrudAPI<T extends TableRowData = TableRowData> {
	protected abstract readonly baseUrl: string;

	async delete(id: string) {
		return await deleteAPI(`${this.baseUrl}/${id}`);
	}

	async get(id: string) {
		return await getAPI<T>(`${this.baseUrl}/${id}`);
	}

	async getList(params?: GetListAPIParams) {
		if (params?.filterQuery) params.filterQuery = JSON.stringify(params.filterQuery);
		if (params?.selectFields) params.selectFields = JSON.stringify(params.selectFields);
		return await getAPI<{ count: number; data: T[]; totals?: Dict<number | string> }>(`${this.baseUrl}/list`, params);
	}

	async save(data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
		return await putAPI(data.id ? `${this.baseUrl}/${data.id}` : this.baseUrl, data, config);
	}

	async updateBooleanField(id: string, field: FilteredKeyPath<TableRowData, boolean>, value: boolean) {
		return await patchAPI(`${this.baseUrl}/${id}/boolean-field`, { field, value });
	}
}
