import { createKeyedEnhancedLocalStore } from '@kikiutils/shared/storage/enhanced/local';

import type { HeaderTabData } from '@/globals/controllers/header-tabs';

// eslint-disable-next-line style/max-len
export const enhancedLocalStore = { headerTabs: createKeyedEnhancedLocalStore<HeaderTabData[]>()((adminId: string) => `headerTabs:${adminId}`) };
