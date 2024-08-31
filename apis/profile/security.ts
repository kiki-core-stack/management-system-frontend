import type { ProfileSecurityChangePasswordFormData, ProfileSecurityTotpSecretData } from '@kikiutils/el-plus-admin-pack/types/data/profile';
import { kebabCase } from 'lodash-es';

export const ProfileSecurityApi = new (class {
	readonly #baseUrl = '/api/profile/security';

	async changePassword(data: ProfileSecurityChangePasswordFormData) {
		return await patchApi(`${this.#baseUrl}/password`, {
			...data,
			conformPassword: sha3512(data.conformPassword),
			oldPassword: sha3512(data.oldPassword),
			newPassword: sha3512(data.newPassword)
		});
	}

	async getTotpSecret() {
		return await getApi<ProfileSecurityTotpSecretData>(`${this.#baseUrl}/two-factor-status/totp/secret`);
	}

	async toggleTwoFactorAuthenticationStatus(method: TwoFactorAuthenticationMethod, data: TwoFactorAuthenticationCodesData) {
		return await patchApi(`${this.#baseUrl}/two-factor-status/${kebabCase(method)}`, data);
	}
})();

export default ProfileSecurityApi;
