export const homeApi = new class {
    readonly #baseUrl = '/api/home';

    getDashboardData(filters: TimeRangeFilter) {
        return getApi<object>(`${this.#baseUrl}/dashboard`, { filter: JSON.stringify(filters) });
    }
}();
