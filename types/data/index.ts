export type {} from '@kikiutils/el-plus-admin-pack/types/data';

declare global {
	interface BaseFilterQueryFormData {
		endAt: Date | number | string;
		startAt: Date | number | string;
	}
}
