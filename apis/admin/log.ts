import type { AdminLogData } from '@kiki-core-stack/pack/types/data/admin';

import { BaseCrudAPI } from '../base';

export const AdminLogAPI = new class extends BaseCrudAPI<AdminLogData> {
    protected readonly baseURL = '/api/admin/log';
}();
