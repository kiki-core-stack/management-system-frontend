export type {} from '@kikiutils/kiki-core-stack-pack/types/data';

declare global {
	interface BaseFilterQueryFormData {
		endAt: Date | number | string;
		startAt: Date | number | string;
	}
}
