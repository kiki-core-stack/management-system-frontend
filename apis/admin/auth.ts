import type { AdminLoginFormData } from '@kikiutils/kiki-core-stack-pack/types/data/admin';

export const AdminAuthAPI = new (class {
	readonly #baseUrl = '/api/admin/auth';

	async login(data: AdminLoginFormData) {
		return await postAPI<{ isVerCodeIncorrect?: boolean }>(`${this.#baseUrl}/login`, { ...data, password: sha3512(data.password) });
	}

	async logout() {
		return await postAPI(`${this.#baseUrl}/logout`);
	}
})();
