<template>
	<el-form class="flex flex-wrap gap-1 el-filter-form">
		<el-form-item label="開始時間" v-if="enableCreatedAtRangeFilter">
			<el-date-picker
				type="datetime"
				:clearable="false"
				:default-time="new Date(props.model.startAt)"
				:popper-options="popperOptions"
				:teleported="false"
				v-model="props.model.startAt"
			/>
		</el-form-item>
		<el-form-item label="結束時間" v-if="enableCreatedAtRangeFilter">
			<el-date-picker
				type="datetime"
				:clearable="false"
				:default-time="new Date(props.model.endAt)"
				:popper-options="popperOptions"
				:teleported="false"
				v-model="props.model.endAt"
			/>
		</el-form-item>
		<slot></slot>
		<div class="flex flex-wrap gap-btns">
			<slot name="before-submit-btn"></slot>
			<el-button native-type="submit" type="primary">搜尋</el-button>
			<slot name="after-submit-btn"></slot>
		</div>
	</el-form>
</template>

<script lang="ts" setup>
interface Props {
	enableCreatedAtRangeFilter?: boolean;
	model: Record<string, any>;
}

// Emits and props
const props = defineProps<Props>();

// Variables
const { width } = useWindowSize();

// Computed properties
const popperOptions = computed(() =>
	width.value < 769 ? { modifiers: [{ name: 'offset', options: { offset: [-20, 12] } }] } : {}
);
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
