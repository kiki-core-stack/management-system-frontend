import { BaseApi } from './_internals/base';

export class HomeApi extends BaseApi {
    constructor() {
        super('/api/home');
    }

    getDashboardData(filters: TimeRangeFilter) {
        return this.getRequest<object>('/dashboard', { filter: JSON.stringify(filters) });
    }
}
