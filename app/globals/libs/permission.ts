import type { ManagementSystemType } from '@kiki-core-stack/pack/types';
import type { Arrayable } from 'type-fest';

import type { AdminTypes } from '@/types/admin';
import type { PermissionPattern } from '@/types/permission';

export function hasPermission(...requiredPermissions: Arrayable<PermissionPattern>[]): boolean;
export function hasPermission<_T extends ManagementSystemType = 'admin'>(
    ...requiredPermissions: Arrayable<AdminTypes.AdminPermissionPattern>[]
): boolean;
export function hasPermission(...requiredPermissions: Arrayable<PermissionPattern>[]) {
    const permissions = requiredPermissions.flat();
    if (permissions.includes('ignore')) return true;
    const profileState = useProfileState();
    return (
        profileState.value.permission.isSuperAdmin
        || micromatch(profileState.value.permission.permissions, permissions).length > 0
    );
}
