import type { AxiosRequestConfig } from 'axios';

export abstract class BaseCrudApi<T extends TableRowData = TableRowData, CF extends string = string> {
	protected abstract readonly baseUrl: string;

	async changeStatus(id: string, field: CF, value: boolean) {
		return await patchApi(`${this.baseUrl}/${id}/status`, { field, value });
	}

	async delete(id: string) {
		return await deleteApi(`${this.baseUrl}/${id}`);
	}

	async get(id: string) {
		return await getApi<T>(`${this.baseUrl}/${id}`);
	}

	async getList(params?: GetListApiParams) {
		if (params?.filterQuery) params.filterQuery = JSON.stringify(params.filterQuery);
		if (params?.selectFields) params.selectFields = JSON.stringify(params.selectFields);
		return await getApi<{ count: number; data: T[]; totals?: Dict<number | string> }>(`${this.baseUrl}/list`, params);
	}

	async save(data: OmitMongooseTimestampAndOtherFields<T>, config?: AxiosRequestConfig) {
		return await putApi(data.id ? `${this.baseUrl}/${data.id}` : this.baseUrl, data, config);
	}
}

export default BaseCrudApi;
