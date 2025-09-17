import { BaseApi } from '../../_internals/base';

export class AdminPermission extends BaseApi {
    constructor() {
        super('/api/admin/admin/permission');
    }

    getTree() {
        return this.getRequest<ElTreeNode[]>('/tree');
    }
}
