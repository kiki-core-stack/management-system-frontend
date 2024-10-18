export const HomeAPI = new (class HomeAPI {
	readonly #baseUrl = '/api/home';

	async getDashboardData(filterQueryData: BaseFilterQueryFormData) {
		return await getAPI<{}>(`${this.#baseUrl}/dashboard`, { filterQuery: JSON.stringify(filterQueryData) });
	}
})();
