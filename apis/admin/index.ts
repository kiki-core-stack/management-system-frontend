import type { AdminData } from '@kikiutils/kiki-core-stack-pack/types/data/admin';

import BaseCrudApi from '../base';

export const AdminApi = new (class extends BaseCrudApi<AdminData> {
	protected readonly baseUrl = '/api/admin';

	async getInfo() {
		return await getApi<{ id: string; twoFactorAuthenticationStatus: TwoFactorAuthenticationStatus }>(`${this.baseUrl}/info`);
	}

	override async save(data: AdminData) {
		data = cloneDeep(data);
		if (!data.email?.trim()) delete data.email;
		data.password ? (data.password = sha3512(data.password)) : delete data.password;
		return await super.save(data);
	}
})();
