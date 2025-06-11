import type {} from '@kiki-core-stack/pack/types/data';

declare global {
    type TablePageFormData<
        T extends object,
        O extends keyof T = never,
    > = Required<OmitMongooseTimestampAndOtherFields<T, O>>;
}
