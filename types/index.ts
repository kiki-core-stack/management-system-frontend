export type {} from '@kikiutils/kiki-core-stack-pack/types';

declare global {
	type BooleanPropertyName<T> = Exclude<{ [K in keyof T]: T[K] extends boolean ? K : never }[keyof T], undefined>;

	interface GetListAPIParams {
		limit?: number;
		page?: number;
		[key: string]: any;
	}
}
