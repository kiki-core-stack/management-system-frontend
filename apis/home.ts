export const HomeApi = new class HomeApi {
    readonly #baseUrl = '/api/home';

    async getDashboardData(filterQueryData: BaseFilterQueryFormData) {
        return await getApi<object>(`${this.#baseUrl}/dashboard`, { filterQuery: JSON.stringify(filterQueryData) });
    }
}();
