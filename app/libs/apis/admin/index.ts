import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';
import { map } from 'es-toolkit/compat';

import type { AdminFormData } from '@/types/data/admin';

import { BaseCrudApi } from '../_internals/base/crud';

export class AdminApi extends BaseCrudApi<AdminData, AdminFormData> {
    constructor() {
        super('/api/admin');
    }

    override processCreateOrUpdateData(data: AdminFormData) {
        const clonedData: Partial<typeof data> = cloneDeep(data);

        if (!clonedData.email?.trim()) delete clonedData.email;

        if (clonedData.password) clonedData.password = sha3512(data.password);
        else delete clonedData.password;

        return {
            ...clonedData,
            roles: map(data.roles, 'id'),
        };
    }
}
