export type {} from '@kiki-core-stack/pack/types';

declare global {
    type BooleanPropertyName<T> = Exclude<{ [K in keyof T]: T[K] extends boolean ? K : never }[keyof T], undefined>;

    interface GetListApiParams {
        [key: string]: any;
        limit?: number;
        page?: number;
    }
}
