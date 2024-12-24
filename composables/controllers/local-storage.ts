export const localStorageController = { tabs: createOperateFunctions(() => 'tabs') };

function createOperateFunctions<F extends (...args: any[]) => string>(toKeyFunction: F) {
    const get = (...args: Parameters<F>) => window.localStorage.getItem(toKeyFunction(...args));
    const getJSON = <T>(...args: Parameters<F>) => {
        const value = get(...args);
        return value === null ? null : JSON.parse(value) as T;
    };

    return {
        get,
        getJSON,
        getJSONOrDefault: <T, D = T>(defaultValue: D, ...args: Parameters<F>) => getJSON<T>(...args) ?? defaultValue,
        getOrDefault: (defaultValue: string, ...args: Parameters<F>) => get(...args) ?? defaultValue,
        set: (value: string, ...args: Parameters<F>) => window.localStorage.setItem(toKeyFunction(...args), value),
        setJSON: (data: any, ...args: Parameters<F>) => window.localStorage.setItem(toKeyFunction(...args), JSON.stringify(data)),
    };
}
