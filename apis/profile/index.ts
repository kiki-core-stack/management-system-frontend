export const profileApi = new class {
    readonly #baseUrl = '/api/profile';

    get() {
        return getApi<{ id: string }>(`${this.#baseUrl}`);
    }
}();
