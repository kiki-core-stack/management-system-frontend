import type { HeaderTabData } from '@/globals/controllers/header-tabs';

// eslint-disable-next-line style/max-len
export const enhancedLocalStore = { headerTabs: createKeyedEnhancedLocalStore<HeaderTabData[]>()((id: string) => `headerTabs:${useSystemType()}:${id}`) };
