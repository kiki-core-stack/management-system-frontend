import type { AdminData } from '@kikiutils/el-plus-admin-pack/types/data/admin';

import type { ChangeAdminStatusField } from '@/types/admin';
import BaseCrudApi from '../base';

export const AdminApi = new (class extends BaseCrudApi<AdminData, ChangeAdminStatusField> {
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

export default AdminApi;
