import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';

import { BaseCrudApi } from '../base';

export const adminApi = new class extends BaseCrudApi<AdminData> {
    constructor() {
        super('/api/admin');
    }

    override processCreateOrUpdateData(data: AdminData) {
        data = cloneDeep(data);
        if (!data.email?.trim()) delete data.email;
        if (data.password) data.password = sha3512(data.password);
        else delete data.password;
        return data;
    }
}();
