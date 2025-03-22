import type { ProfileSecurityChangePasswordFormData } from '@kiki-core-stack/pack/types/data/profile';

export const profileSecurityApi = new class {
    readonly #baseUrl = '/api/profile/security';

    changePassword(data: ProfileSecurityChangePasswordFormData) {
        return patchApi(
            `${this.#baseUrl}/password`,
            {
                ...data,
                conformPassword: sha3512(data.conformPassword),
                newPassword: sha3512(data.newPassword),
                oldPassword: sha3512(data.oldPassword),
            },
        );
    }
}();
