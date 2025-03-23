import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';

import { BaseCrudApi } from '../base';

export const adminApi = new class extends BaseCrudApi<AdminData> {
    constructor() {
        super('/api/admin');
    }

    #processRequestData(data: AdminData) {
        data = cloneDeep(data);
        if (!data.email?.trim()) delete data.email;
        if (data.password) data.password = sha3512(data.password);
        else delete data.password;
        return data;
    }

    override create(data: AdminData) {
        return super.create(this.#processRequestData(data));
    }

    override update(id: string, data: AdminData) {
        return super.update(id, this.#processRequestData(data));
    }
}();
