import type { ProfileSecurityChangePasswordFormData, ProfileSecurityTOTPSecretData } from '@kikiutils/kiki-core-stack-pack/types/data/profile';
import { kebabCase } from 'lodash-es';

export const ProfileSecurityAPI = new (class {
	readonly #baseUrl = '/api/profile/security';

	async changePassword(data: ProfileSecurityChangePasswordFormData) {
		return await patchAPI(`${this.#baseUrl}/password`, {
			...data,
			conformPassword: sha3512(data.conformPassword),
			oldPassword: sha3512(data.oldPassword),
			newPassword: sha3512(data.newPassword)
		});
	}

	async getTOTPSecret() {
		return await getAPI<ProfileSecurityTOTPSecretData>(`${this.#baseUrl}/two-factor-status/totp/secret`);
	}

	async toggleTwoFactorAuthenticationStatus(method: TwoFactorAuthenticationMethod, data: TwoFactorAuthenticationCodesData) {
		return await patchAPI(`${this.#baseUrl}/two-factor-status/${kebabCase(method)}`, data);
	}
})();
