import type { AdminChangePasswordData } from '@kiki-core-stack/pack/types/data/admin';

export const profileSecurityApi = new class {
    readonly #baseUrl = '/api/profile/security';

    changePassword(data: AdminChangePasswordData) {
        return patchApi(
            `${this.#baseUrl}/password`,
            {
                newPassword: sha3512(data.newPassword),
                oldPassword: sha3512(data.oldPassword),
            },
        );
    }
}();
