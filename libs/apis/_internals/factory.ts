import type { BaseApi } from './base';

const apiInstances: Record<string, BaseApi> = {};

export function createUseApiFunction<T extends BaseApi>(apiClass: new (...args: any[]) => T) {
    return () => {
        // eslint-disable-next-line new-cap
        if (!apiInstances[apiClass.name]) apiInstances[apiClass.name] = new apiClass();
        return apiInstances[apiClass.name] as T;
    };
}
