import { BaseApi } from '../../_internals/base';

export class Profile extends BaseApi {
    constructor() {
        super('/api/admin/profile');
    }

    get() {
        return this.getRequest<{ id: string }>();
    }
}
