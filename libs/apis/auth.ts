import type { AdminLoginFormData } from '@kiki-core-stack/pack/types/data/admin';

import { BaseApi } from './_internals/base';

export class AuthApi extends BaseApi {
    constructor() {
        super('/api/auth');
    }

    login(data: AdminLoginFormData) {
        return this.postRequest<undefined, 'invalidVerificationCode'>(
            '/login',
            {
                ...data,
                password: sha3512(data.password),
            },
        );
    }

    logout() {
        return this.postRequest('/logout');
    }
}
