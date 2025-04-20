import type { createEnhancedLocalStorage } from './create';

export function createEnhancedLocalStoreKeyHandler<D = any>(storage: ReturnType<typeof createEnhancedLocalStorage>) {
    return <P extends any[]>(getKeyFunction: (...args: P) => string) => ({
        getItem: (...args: P) => storage.getItem<D>(getKeyFunction(...args)),
        hasItem: (...args: P) => storage.hasItem(getKeyFunction(...args)),
        removeItem: (...args: P) => storage.removeItem(getKeyFunction(...args)),
        setItem: (value: D, ...args: P) => storage.setItem(getKeyFunction(...args), value),
    });
}
