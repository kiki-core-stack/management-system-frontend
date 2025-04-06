<template>
    <el-form
        class="flex flex-wrap gap-1"
        :model="filters"
    >
        <el-form-item
            v-if="showTimeRange"
            label="開始時間"
        >
            <el-date-picker
                v-model="filters.startAt"
                type="datetime"
                :clearable="false"
                :teleported="false"
            />
        </el-form-item>
        <el-form-item
            v-if="showTimeRange"
            label="結束時間"
        >
            <el-date-picker
                v-model="filters.endAt"
                type="datetime"
                :clearable="false"
                :teleported="false"
            />
        </el-form-item>
        <slot />
        <div class="gap-btns flex flex-wrap items-center">
            <slot name="before-submit-btn" />
            <el-button
                native-type="submit"
                type="primary"
            >
                搜尋
            </el-button>
            <slot name="after-submit-btn" />
        </div>
    </el-form>
</template>

<script lang="ts" setup>
interface Props {
    showTimeRange?: boolean;
}

// Define props, models and emits
defineProps<Props>();
const filters = defineModel<Partial<TimeRangeFilter>>({ required: true });
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
    align-items: center;
    margin-bottom: 0;
}

:deep(.el-form-item__content > .el-input) {
    --el-input-width: 220px;
}

:deep(.el-form-item__content > .el-select) {
    --el-select-width: 220px;
}
</style>
