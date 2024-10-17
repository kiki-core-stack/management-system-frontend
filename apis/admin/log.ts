import type { AdminLogData } from '@kikiutils/kiki-core-stack-pack/types/data/admin';

import BaseCrudApi from '../base';

export const AdminLogApi = new (class extends BaseCrudApi<AdminLogData> {
	protected readonly baseUrl = '/api/admin/log';
})();
