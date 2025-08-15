import type {
    AdminPermission,
    AdminPermissionGroup,
} from '@/generated/static/types/admin/permission';

export function hasPermission(permission: Arrayable<`${AdminPermissionGroup}.*` | AdminPermission>) {
    const profileState = useProfileState();
    return (
        profileState.value.permission.isSuperAdmin
        || micromatch.some(profileState.value.permission.permissions, permission)
    );
}
