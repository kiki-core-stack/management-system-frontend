export const homeApi = new class {
    readonly #baseUrl = '/api/home';

    getDashboardData(filterQueryData: BaseFilterQueryFormData) {
        return getApi<object>(`${this.#baseUrl}/dashboard`, { filterQuery: JSON.stringify(filterQueryData) });
    }
}();
