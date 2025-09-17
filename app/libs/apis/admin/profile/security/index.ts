import type { AdminChangePasswordData } from '@kiki-core-stack/pack/types/data/admin';

import { BaseApi } from '../../../_internals/base';

export class ProfileSecurity extends BaseApi {
    constructor() {
        super('/api/admin/profile/security');
    }

    changePassword(data: AdminChangePasswordData) {
        return this.patchRequest(
            '/password',
            {
                newPassword: sha3512(data.newPassword),
                oldPassword: sha3512(data.oldPassword),
            },
        );
    }
}
