export type {} from '@kiki-core-stack/pack/types';

declare global {
    interface GetListApiParams {
        [key: string]: any;
        fields?: string[];
        filter?: AnyRecord;
        limit?: number;
        page?: number;
    }
}
