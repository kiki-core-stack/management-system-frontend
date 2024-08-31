export const HomeApi = new (class HomeApi {
	readonly #baseUrl = '/api/home';

	async getDashboardData(filterQueryData: BaseFilterQueryFormData) {
		return await getApi<{}>(`${this.#baseUrl}/dashboard`, { filterQuery: JSON.stringify(filterQueryData) });
	}
})();

export default HomeApi;
