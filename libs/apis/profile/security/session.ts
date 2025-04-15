import type { AdminSessionData } from '@kiki-core-stack/pack/types/data/admin';

import { BaseCrudApi } from '../../_internals/base';

export const profileSecuritySessionApi = new class extends BaseCrudApi<AdminSessionData> {
    constructor() {
        super('/api/profile/security/session');
    }
}();
