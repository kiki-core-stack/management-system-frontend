import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';
import { map } from 'es-toolkit/compat';

import type { AdminTypes } from '@/types/admin';

import { BaseCrudApi } from '../../_internals/base/crud';

export class Admin extends BaseCrudApi<AdminData, AdminTypes.AdminFormData> {
    constructor() {
        super('/api/admin/admin');
    }

    override processCreateOrUpdateData(data: AdminTypes.AdminFormData) {
        return {
            ...data,
            email: data.email?.trim() || undefined,
            password: data.password?.trim() || undefined,
            roles: map(data.roles, 'id'),
        };
    }
}
