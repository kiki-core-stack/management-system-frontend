import type { ManagementSystemType } from '@kiki-core-stack/pack/types';

import type { AdminTypes } from './admin';

export type PermissionPattern<T extends ManagementSystemType | undefined = undefined> =
    ManagementSystemTypeToPermissionPatternMap[T extends undefined ? ManagementSystemType : T];

export interface ManagementSystemTypeToPermissionPatternMap {
    admin: AdminTypes.AdminPermissionPattern;
}
