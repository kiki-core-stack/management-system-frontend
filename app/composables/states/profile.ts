import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';

export function useProfileState() {
    return useState<Pick<AdminData, 'id'>>(
        'profile',
        () => ({ id: '' }),
    );
}
