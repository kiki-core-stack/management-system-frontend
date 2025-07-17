import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';

import type { AdminFormData } from '@/types/data/admin';

import { BaseCrudApi } from '../_internals/base/crud';

export class AdminApi extends BaseCrudApi<AdminData, AdminFormData> {
    constructor() {
        super('/api/admin');
    }

    override processCreateOrUpdateData(data: AdminFormData) {
        const clonedData: Partial<AdminFormData> = cloneDeep(data);

        if (!clonedData.email?.trim()) delete clonedData.email;

        if (clonedData.password) clonedData.password = sha3512(data.password);
        else delete clonedData.password;

        return clonedData;
    }
}
