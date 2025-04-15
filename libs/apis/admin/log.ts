import type { AdminLogData } from '@kiki-core-stack/pack/types/data/admin';

import { BaseCrudApi } from '../_internals/base';

export const adminLogApi = new class extends BaseCrudApi<AdminLogData> {
    constructor() {
        super('/api/admin/log');
    }
}();
