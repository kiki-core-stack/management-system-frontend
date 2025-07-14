import type {} from '@kiki-core-stack/pack/types/data';

type TablePageFormDataExcludeField = 'createdByAdmin' | 'editedByAdmin';

declare global {
    type TablePageFormData<
        T extends object,
        O extends Exclude<keyof T, TablePageFormDataExcludeField> = never,
    > = Required<OmitMongooseTimestampAndOtherFields<T, O | TablePageFormDataExcludeField>>;
}
