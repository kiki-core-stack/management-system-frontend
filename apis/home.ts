export const HomeAPI = new class HomeAPI {
    readonly #baseURL = '/api/home';

    async getDashboardData(filterQueryData: BaseFilterQueryFormData) {
        return await getAPI<object>(`${this.#baseURL}/dashboard`, { filterQuery: JSON.stringify(filterQueryData) });
    }
}();
