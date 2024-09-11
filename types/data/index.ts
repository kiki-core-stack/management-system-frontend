export type {} from '@kikiutils/kiki-core-stack-pack/types/data';

declare global {
	type TablePageFormData<T extends {}, O extends keyof T = never> = Required<OmitMongooseTimestampAndOtherFields<T, O>>;

	interface BaseFilterQueryFormData {
		endAt: Date | number | string;
		startAt: Date | number | string;
	}
}
