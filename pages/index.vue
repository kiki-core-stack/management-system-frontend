<template>
    <div
        v-loading="isLoadingData"
        class="h-full overflow-hidden"
    >
        <div class="h-full overflow-auto p-4">
            <el-filter-form
                class="dark:bg-dark rounded-10px bg-white p-4"
                :model="filterQueryFormData"
                enable-created-at-range-filter
                @submit.prevent="loadData"
            >
                <template #before-submit-btn>
                    <el-filter-date-range-btn-group
                        :filter-query="filterQueryFormData"
                        @select="loadData"
                    />
                </template>
            </el-filter-form>
            <div class="cards-container mt-4 grid gap-1">
                <el-card body-class="p-4!">
                    <p class="mb-3">
                        數量
                    </p>
                    <p class="fs-24px">
                        1
                    </p>
                </el-card>
                <el-card body-class="p-4!">
                    <p class="mb-3">
                        數量2
                    </p>
                    <p class="fs-24px">
                        2
                    </p>
                </el-card>
            </div>
            <div class="cards-container mt-1 grid gap-1">
                <el-card body-class="p-4!">
                    <p class="mb-3">
                        數量3
                    </p>
                    <p class="fs-24px">
                        3
                    </p>
                </el-card>
                <el-card body-class="p-4!">
                    <p class="mb-3">
                        數量4
                    </p>
                    <p class="fs-24px">
                        4
                    </p>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { homeApi } from '@/apis/home';

useHead({ title: '首頁' });

// Variables
const defaultHomeDashboardData = Object.freeze({});
const dashboardData = reactive<typeof defaultHomeDashboardData>({ ...defaultHomeDashboardData });
const filterQueryFormData = reactive<BaseFilterQueryFormData>({
    endAt: getMidnightDateFromToday(1),
    startAt: getMidnightDateFromToday(),
});

const isLoadingData = ref(true);

// Functions
async function loadData() {
    isLoadingData.value = true;
    const response = await homeApi.getDashboardData(filterQueryFormData);
    Object.assign(dashboardData, defaultHomeDashboardData, response?.data.data);
    isLoadingData.value = false;
}

// Load data
onMounted(loadData);
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
