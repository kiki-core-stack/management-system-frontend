import type { ManagementSystemType } from '@kiki-core-stack/pack/types';

export const useSystemType = () => useNuxtApp().$systemType as ManagementSystemType;
