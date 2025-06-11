import type { BaseApi } from './base';

const apiInstances = new Map<string, BaseApi>();

export function createUseApiFunction<T extends BaseApi, C extends new (...args: any[]) => T>(apiClass: C) {
    return (...args: ConstructorParameters<C>) => {
        const key = `${apiClass.name}:${JSON.stringify(args)}`;
        // eslint-disable-next-line new-cap
        if (!apiInstances.has(key)) apiInstances.set(key, new apiClass(...args));
        return apiInstances.get(key) as InstanceType<C>;
    };
}
