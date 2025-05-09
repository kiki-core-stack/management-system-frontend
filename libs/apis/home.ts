import type { GetHomeDashboardDataFilters } from '@/types/home';

import { BaseApi } from './_internals/base';

export class HomeApi extends BaseApi {
    constructor() {
        super('/api/home');
    }

    getDashboardData(filters: GetHomeDashboardDataFilters) {
        return this.getRequest<object>('/dashboard', { filters: buildApiQueryFilters(filters) });
    }
}
