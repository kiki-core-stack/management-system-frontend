export type {} from '@kiki-core-stack/pack/types';

declare global {
    interface GetListApiParams {
        [key: string]: any;
        fields?: string[];
        filters?: AnyRecord;
        limit?: number;
        page?: number;
    }
}
