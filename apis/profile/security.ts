import type {
    ProfileSecurityChangePasswordFormData,
    ProfileSecurityTOTPSecretData,
} from '@kiki-core-stack/pack/types/data/profile';
import { kebabCase } from 'lodash-es';

export const ProfileSecurityAPI = new class {
    readonly #baseURL = '/api/profile/security';

    async changePassword(data: ProfileSecurityChangePasswordFormData) {
        return await patchAPI(`${this.#baseURL}/password`, {
            ...data,
            conformPassword: sha3512(data.conformPassword),
            newPassword: sha3512(data.newPassword),
            oldPassword: sha3512(data.oldPassword),
        });
    }

    async getTOTPSecret() {
        return await getAPI<ProfileSecurityTOTPSecretData>(`${this.#baseURL}/two-factor-status/totp/secret`);
    }

    async toggleTwoFactorAuthenticationStatus(method: TwoFactorAuthenticationMethod, data: TwoFactorAuthenticationCodesData) {
        return await patchAPI(`${this.#baseURL}/two-factor-status/${kebabCase(method)}`, data);
    }
}();
