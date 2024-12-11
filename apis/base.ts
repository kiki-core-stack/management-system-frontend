import type { AxiosRequestConfig } from 'axios';

export abstract class BaseCrudAPI<T extends TableRowData = TableRowData> {
	protected abstract readonly baseURL: string;

	async delete(id: string) {
		return await deleteAPI(`${this.baseURL}/${id}`);
	}

	async get(id: string) {
		return await getAPI<T>(`${this.baseURL}/${id}`);
	}

	async getList(params?: GetListAPIParams) {
		if (params?.filterQuery) params.filterQuery = JSON.stringify(params.filterQuery);
		if (params?.selectFields) params.selectFields = JSON.stringify(params.selectFields);
		return await getAPI<{ count: number; list: T[]; totals?: Dict<number | string> }>(`${this.baseURL}/list`, params);
	}

	async save(data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
		return await putAPI(data.id ? `${this.baseURL}/${data.id}` : this.baseURL, data, config);
	}

	async updateBooleanField(id: string, field: FilteredKeyPath<TableRowData, boolean>, value: boolean) {
		return await patchAPI(`${this.baseURL}/${id}/boolean-field`, { field, value });
	}
}
