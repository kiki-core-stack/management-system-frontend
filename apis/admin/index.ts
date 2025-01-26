import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';

import { BaseCrudAPI } from '../base';

export const AdminAPI = new class extends BaseCrudAPI<AdminData> {
    protected readonly baseURL = '/api/admin';

    async getInfo() {
        return await getAPI<{ id: string; twoFactorAuthenticationStatus: TwoFactorAuthenticationStatus }>(`${this.baseURL}/info`);
    }

    override async save(data: AdminData) {
        data = cloneDeep(data);
        if (!data.email?.trim()) delete data.email;
        if (data.password) data.password = sha3512(data.password);
        else delete data.password;
        return await super.save(data);
    }
}();
