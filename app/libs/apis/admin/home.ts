import type { AdminTypes } from '@/types/admin';

import { BaseApi } from '../_internals/base';

export class Home extends BaseApi {
    constructor() {
        super('/api/admin/home');
    }

    getDashboardData(filter: AdminTypes.GetHomeDashboardDataFilter) {
        return this.getRequest<object>('/dashboard', { filter: buildApiQueryFilter(filter) });
    }
}
