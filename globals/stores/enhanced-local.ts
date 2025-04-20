import type { HeaderTabData } from '@/globals/controllers/header-tabs';
import { createEnhancedLocalStoreKeyHandler } from '@/libs/storages/enhanced-local/factory';

// eslint-disable-next-line style/max-len
export const enhancedLocalStore = { headerTabs: createEnhancedLocalStoreKeyHandler<HeaderTabData[]>(enhancedLocalStorage)((adminId: string) => `headerTabs:${adminId}`) };
