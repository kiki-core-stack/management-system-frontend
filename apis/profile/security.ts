import type {
    ProfileSecurityChangePasswordFormData,
    ProfileSecurityTotpSecretData,
} from '@kiki-core-stack/pack/types/data/profile';
import { kebabCase } from 'lodash-es';

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

    getTotpSecret() {
        return getApi<ProfileSecurityTotpSecretData>(`${this.#baseUrl}/two-factor-status/totp/secret`);
    }

    toggleTwoFactorAuthenticationStatus(method: TwoFactorAuthenticationMethod, data: TwoFactorAuthenticationCodesData) {
        return patchApi(`${this.#baseUrl}/two-factor-status/${kebabCase(method)}`, data);
    }
}();
