import type { AdminLogData } from '@kikiutils/kiki-core-stack-pack/types/data/admin';

import { BaseCrudAPI } from '../base';

export const AdminLogAPI = new (class extends BaseCrudAPI<AdminLogData> {
	protected readonly baseUrl = '/api/admin/log';
})();
