import type { AdminLoginFormData } from '@kiki-core-stack/pack/types/data/admin';

export const authApi = new class {
    readonly #baseUrl = '/api/auth';

    login(data: AdminLoginFormData) {
        return postApi<{ isVerCodeIncorrect?: boolean }>(
            `${this.#baseUrl}/login`,
            {
                ...data,
                password: sha3512(data.password),
            },
        );
    }

    logout() {
        return postApi(`${this.#baseUrl}/logout`);
    }
}();
