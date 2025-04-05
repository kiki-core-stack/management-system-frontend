<template>
    <el-form
        class="flex flex-wrap gap-1"
        :model="filters"
    >
        <el-form-item
            v-if="enableTimeRange"
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
            v-if="enableTimeRange"
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
        <div class="gap-btns flex flex-wrap">
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
    enableTimeRange?: boolean;
}

// Define props, models and emits
defineProps<Props>();
const filters = defineModel<Partial<QueryTimeRange>>({ required: true });
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
    align-items: center;
    margin-bottom: 0;
}
</style>
