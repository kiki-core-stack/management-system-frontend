import type {} from '@kiki-core-stack/pack/types/data';

declare global {
    type TablePageFormData<T extends object, O extends Exclude<keyof T, keyof WithAdminAuditData> = never> = Required<
        OmitMongooseTimestampAndOtherFields<T, keyof WithAdminAuditData | O>
    >;
}
