import type { ManagementSystemType } from '@kiki-core-stack/pack/types';
import type { ReadonlyRecord } from '@kikiutils/shared/types';

// Constants
const systemTypeToHomePathMap: ReadonlyRecord<ManagementSystemType, string> = { admin: '/admin' };

// Functions
export const getSystemType = () => useNuxtApp().$systemType as ManagementSystemType;

export function buildSystemRoute(subPath: string = '') {
    return `${systemTypeToHomePathMap[getSystemType()]}/${subPath.replace(/^\/+/, '')}`;
}

export function getCurrentSystemUserId() {
    switch (getSystemType()) {
        case 'admin': return useAdminProfileState().value.id;
    }
}
