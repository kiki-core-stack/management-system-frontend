import type { CachedAdminPermission } from '@kiki-core-stack/pack/types/admin';

interface AdminProfileState {
    id: string;
    permission: CachedAdminPermission;
}

export function useAdminProfileState() {
    return useState<AdminProfileState>(
        'adminProfile',
        () => ({
            id: '',
            permission: {
                isSuperAdmin: false,
                permissions: [],
            },
        }),
    );
}
