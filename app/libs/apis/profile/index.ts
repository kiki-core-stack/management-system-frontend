import { BaseApi } from '../_internals/base';

export class ProfileApi extends BaseApi {
    constructor() {
        super('/api/profile');
    }

    get() {
        return this.getRequest<{ id: string }>();
    }
}
