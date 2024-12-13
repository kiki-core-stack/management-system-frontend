import type { AdminLoginFormData } from '@kiki-core-stack/pack/types/data/admin';

export const AdminAuthAPI = new class {
    readonly #baseURL = '/api/admin/auth';

    async login(data: AdminLoginFormData) {
        return await postAPI<{ isVerCodeIncorrect?: boolean }>(
            `${this.#baseURL}/login`,
            {
                ...data,
                password: sha3512(data.password),
            },
        );
    }

    async logout() {
        return await postAPI(`${this.#baseURL}/logout`);
    }
}();
