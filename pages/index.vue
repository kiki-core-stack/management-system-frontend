<template>
	<Head>
		<Title>首頁</Title>
	</Head>
	<div class="absolute top-0 wh-full" v-loading="isLoadingData">
		<div class="relative top-0 wh-full p-4 overflow-auto">
			<el-filter-form
				class="p-4 bg-white dark:bg-dark rounded-10px color-mode-transition"
				:model="filterQueryFormData"
				@submit.prevent="loadData"
				enable-created-at-range-filter
			>
				<template #before-submit-btn>
					<el-filter-date-range-btn-group :filter-query="filterQueryFormData" @select="loadData" />
				</template>
			</el-filter-form>
			<div class="mt-4 gap-1 grid cards-container">
				<el-card body-class="p-4!">
					<p class="mb-3">數量</p>
					<p class="fs-24px">1</p>
				</el-card>
				<el-card body-class="p-4!">
					<p class="mb-3">數量2</p>
					<p class="fs-24px">2</p>
				</el-card>
			</div>
			<div class="mt-1 gap-1 grid cards-container">
				<el-card body-class="p-4!">
					<p class="mb-3">數量3</p>
					<p class="fs-24px">3</p>
				</el-card>
				<el-card body-class="p-4!">
					<p class="mb-3">數量4</p>
					<p class="fs-24px">4</p>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { HomeAPI } from '@/apis/home';

// Variables
const defaultHomeDashboardData = Object.freeze({});
const dashboardData = reactive<{}>({ ...defaultHomeDashboardData });
const filterQueryFormData = reactive<BaseFilterQueryFormData>({
	endAt: getMidnightDateFromToday(1),
	startAt: getMidnightDateFromToday()
});

const isLoadingData = ref(true);

// Functions
async function loadData() {
	isLoadingData.value = true;
	const response = await HomeAPI.getDashboardData(filterQueryFormData);
	Object.assign(dashboardData, defaultHomeDashboardData, response?.data.data);
	isLoadingData.value = false;
}

// Load data
await loadData();
</script>

<style lang="scss" scoped>
.cards-container {
	grid-template-columns: repeat(6, 1fr);

	@media (max-width: 1600px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (max-width: 1200px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 900px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr);
	}
}
</style>
