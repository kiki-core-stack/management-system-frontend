import type { AdminPermissionPattern } from '@/types/admin';

export function hasPermission(requiredPermissions: Arrayable<AdminPermissionPattern>) {
    if (
        requiredPermissions === 'ignore'
        || (Array.isArray(requiredPermissions) && requiredPermissions.includes('ignore'))
    ) return true;

    const profileState = useProfileState();
    return (
        profileState.value.permission.isSuperAdmin
        || micromatch(profileState.value.permission.permissions, requiredPermissions).length > 0
    );
}
