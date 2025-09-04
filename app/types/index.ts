import type {} from '@kiki-core-stack/pack/types';

declare global {
    type TablePageElFormRules<
        T extends object,
        O extends Exclude<keyof T, keyof WithAdminAuditData> = never,
    > = ElFormRules<TablePageFormData<T, O>>;

    interface GetListApiParams {
        [key: string]: any;
        fields?: string[];
        filter?: AnyRecord;
        limit?: number;
        page?: number;
    }
}
