import type { ManagementSystemType } from '@kiki-core-stack/pack/types';
import type { ReadonlyRecord } from '@kikiutils/shared/types';

// Constants
const systemTypeToHomePathMap: ReadonlyRecord<ManagementSystemType, string> = { admin: '/admin' };

// Functions
export function buildSystemRoute(subPath: string = '') {
    return `${systemTypeToHomePathMap[useSystemType()]}/${subPath.replace(/^\/+/, '')}`;
}

export function getCurrentSystemUserId() {
    switch (useSystemType()) {
        case 'admin': return useAdminProfileState().value.id;
    }
}
