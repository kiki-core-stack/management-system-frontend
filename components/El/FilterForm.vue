<template>
    <!-- eslint-disable vue/no-mutating-props -->
    <el-form class="el-filter-form flex flex-wrap gap-1">
        <el-form-item
            v-if="enableCreatedAtRangeFilter"
            label="開始時間"
        >
            <el-date-picker
                v-model="props.model.startAt"
                type="datetime"
                :clearable="false"
                :default-time="new Date(props.model.startAt)"
                :popper-options="popperOptions"
                :teleported="false"
            />
        </el-form-item>
        <el-form-item
            v-if="enableCreatedAtRangeFilter"
            label="結束時間"
        >
            <el-date-picker
                v-model="props.model.endAt"
                type="datetime"
                :clearable="false"
                :default-time="new Date(props.model.endAt)"
                :popper-options="popperOptions"
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
    enableCreatedAtRangeFilter?: boolean;
    model: Record<string, any>;
}

// Define props, models and emits
const props = defineProps<Props>();

// Variables
const { width } = useWindowSize();

// Computed properties
const popperOptions = computed(() => {
    if (width.value >= 769) return {};
    return {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [
                        -20,
                        12,
                    ],
                },
            },
        ],
    };
});
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
    align-items: center;
    margin-bottom: 0;
}

:deep(.el-form-item__content > .el-input) {
    --el-input-width: 203px;
}

:deep(.el-form-item__content > .el-select) {
    --el-select-width: 203px;
}
</style>
