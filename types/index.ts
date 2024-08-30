export type {} from '@kikiutils/el-plus-admin-pack/types';

declare global {
	type BooleanPropertyName<T> = Exclude<{ [K in keyof T]: T[K] extends boolean ? K : never }[keyof T], undefined>;

	interface GetListApiParams {
		limit?: number;
		page?: number;
		[key: string]: any;
	}
}
