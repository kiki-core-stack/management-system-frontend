export const HomeAPI = new (class HomeAPI {
	readonly #baseURL = '/api/home';

	async getDashboardData(filterQueryData: BaseFilterQueryFormData) {
		return await getAPI<{}>(`${this.#baseURL}/dashboard`, { filterQuery: JSON.stringify(filterQueryData) });
	}
})();
