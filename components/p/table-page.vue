<template>
	<Head>
		<Title>{{ title }}</Title>
	</Head>
	<div class="relative m-4 p-4 bg-white dark:bg-dark rounded-10px color-mode-transition" v-loading="isLoadingData">
		<slot name="before-table"></slot>
		<DataTable
			class="border-1 dark:border-[#27272a] fs-15px"
			column-resize-mode="expand"
			size="small"
			:value="tableData"
			resizable-columns
			show-gridlines
			striped-rows
		>
			<template #empty>
				<div class="p-4 flex-middle">暫無資料</div>
			</template>
			<template #header>
				<slot name="table-header-start"></slot>
				<div class="flex flex-wrap gap-btns">
					<slot name="before-table-header-btns"></slot>
					<el-button @click="openDialog()" v-if="!hideAddDataBtn">{{ addDataBtnText }}</el-button>
					<el-dropdown trigger="click" :disabled="isLoadingData" @click="loadData" split-button>
						刷新{{ autoReloadDataIntervalSeconds === 0 ? '' : `(${autoReloadDataCountdownSeconds})` }}
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="setAutoReloadDataIntervalSeconds(0)">關閉</el-dropdown-item>
								<el-dropdown-item
									:key="sec"
									@click="setAutoReloadDataIntervalSeconds(sec)"
									v-for="sec in [5, 10, 20, 30, 40, 50, 60]"
								>
									{{ sec }}s
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
					<el-filter-date-range-btn-group
						:filter-query="filterQuery"
						@select="loadData"
						v-if="enableFilterDateRangeBtnGroup"
					/>
					<slot name="after-table-header-btns"></slot>
				</div>
				<slot name="table-header-end"></slot>
			</template>
			<slot name="table"></slot>
			<PColumn
				class="text-center!"
				header="建立時間"
				header-class="minww-155px"
				v-if="!hideTimestampColumns && !hideCreatedAtColumn"
			>
				<template #body="{ data }">{{ formatDateOrTimestamp(data.createdAt) }}</template>
			</PColumn>
			<PColumn
				class="text-center!"
				header="更新時間"
				header-class="minww-155px"
				v-if="!hideTimestampColumns && !hideUpdatedAtColumn"
			>
				<template #body="{ data }">{{ formatDateOrTimestamp(data.updatedAt) }}</template>
			</PColumn>
			<PColumn header="操作" header-class="center" v-if="!hideActionsColumn">
				<template #body="scope">
					<div class="flex-middle gap-btns">
						<slot name="before-action-btns" :="scope"></slot>
						<el-action-btn
							:disabled="disableRowEditBtnRule?.(scope.data)"
							@click="openDialog(scope.data)"
							v-if="!hideEditBtn && !hideRowEditBtnRule?.(scope.data)"
						>
							編輯
						</el-action-btn>
						<el-action-btn
							type="danger"
							:disabled="disableRowDeleteBtnRule?.(scope.data)"
							@click="showAskDeleteRowMessageBox(scope.data)"
							v-if="!hideDeleteBtn && !hideRowDeleteBtnRule?.(scope.data)"
						>
							刪除
						</el-action-btn>
						<slot name="after-action-btns" :="scope"></slot>
					</div>
				</template>
			</PColumn>
			<ColumnGroup type="footer" v-if="enableColumnTotalsFooter && tableData.length">
				<Row>
					<PColumn :colspan="columnTotalsFooterColspan || 1" footer="合計：" />
					<slot name="column-totals-footer" :data="columnTotals"></slot>
				</Row>
			</ColumnGroup>
			<template #footer>
				<el-pagination
					layout="total, prev, pager, next, sizes"
					:disabled="isLoadingData"
					:page-sizes="[10, 20, 50, 100, 500, 1000]"
					:pager-count="5"
					:total="totalTableDataCount"
					@change="loadData"
					v-model:current-page="paginationParams.page"
					v-model:page-size="paginationParams.limit"
				/>
			</template>
		</DataTable>
		<el-dialog
			width="96vmin"
			:close-on-click-modal="!saveDataState.loading"
			:close-on-press-escape="!saveDataState.loading"
			:title="`${isEditing ? '編輯' : '新增'}${dialogTitleSuffix}`"
			@open="$emit('dialogOpen')"
			v-model="isDialogOpen"
			append-to-body
			align-center
			center
			draggable
		>
			<el-form ref="formRef" :model="formData" :rules="formRules" @submit.prevent="saveData" status-icon>
				<slot name="form"></slot>
				<div class="text-center">
					<el-button native-type="submit" type="primary">儲存</el-button>
				</div>
			</el-form>
			<state-absolute :loading-text="formData.id ? '儲存中...' : '新增中...'" :state="saveDataState" />
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { isObjectLike } from 'lodash-es';
import ColumnGroup from 'primevue/columngroup';
import DataTable from 'primevue/datatable';
import Row from 'primevue/row';

import type BaseCrudApi from '@/apis/base';

interface Props<ControlRowBtnFunction extends (rowData: any) => boolean = (rowData: any) => boolean> {
	addDataBtnText?: string;
	askDeleteRowMessageRender?: (rowData: any) => string;
	columnTotalsFooterColspan?: number;
	crudApiClass: BaseCrudApi;
	dialogTitleSuffix?: string;
	disableRowEditBtnRule?: ControlRowBtnFunction;
	disableRowDeleteBtnRule?: ControlRowBtnFunction;
	enableColumnTotalsFooter?: boolean;
	enableFilterDateRangeBtnGroup?: boolean;
	filterQuery?: Dict<any>;
	formData?: TableRowData;
	formRules?: ElFormRules<TableRowData>;
	hideActionsColumn?: boolean;
	hideAddDataBtn?: boolean;
	hideCreatedAtColumn?: boolean;
	hideDeleteBtn?: boolean;
	hideEditBtn?: boolean;
	hidePaginator?: boolean;
	hideTimestampColumns?: boolean;
	hideRowEditBtnRule?: ControlRowBtnFunction;
	hideRowDeleteBtnRule?: ControlRowBtnFunction;
	hideUpdatedAtColumn?: boolean;
	title: string;
}

// Emits and props
defineEmits(['dialogOpen']);
const props = withDefaults(defineProps<Props>(), {
	askDeleteRowMessageRender: (rowData: any) => `確定要刪除 ${rowData.name} 嗎？`,
	formData: () => ({ id: '' }),
	formRules: () => ({})
});

// Variables
const {
	autoReloadDataCountdownSeconds,
	autoReloadDataInterval,
	autoReloadDataIntervalSeconds,
	isLoadingData,
	paginationParams,
	tableData,
	totalTableDataCount
} = createPageBaseVariables();
const { state: saveDataState } = createLoadingState();
const columnTotals = reactive<Dict<number | string>>({});
const defaultFormData = cloneDeep(props.formData);
const formRef = ref<ElFormRef>(null);
const isEditing = ref(false);
const isDialogOpen = ref(false);

// Functions
async function loadData() {
	isLoadingData.value = true;
	clearIntervalRef(autoReloadDataInterval);
	autoReloadDataCountdownSeconds.value = autoReloadDataIntervalSeconds.value;
	const response = await props.crudApiClass.getList({ ...paginationParams, filterQuery: props.filterQuery });
	if (response.data.data) {
		clearAndAssignObject(columnTotals, response.data.data.totals);
		tableData.length = 0;
		tableData.push(...(response.data.data.data || []));
		totalTableDataCount.value = response.data.data.count || 0;
	}

	isLoadingData.value = false;
	setupAutoReloadData();
}

function openDialog(rowData?: TableRowData) {
	formRef.value?.resetFields();
	isDialogOpen.value = true;
	isEditing.value = rowData !== undefined;
	setTimeout(() => setFormDataValues(rowData || defaultFormData, props.formData));
}

async function saveData() {
	if (saveDataState.loading) return;
	await formRef.value?.validate(async (valid) => {
		if (!valid) return;
		saveDataState.loading = true;
		const response = await props.crudApiClass.save(props.formData);
		saveDataState.loading = false;
		if (!response.data.success) return;
		formRef.value!.resetFields();
		isDialogOpen.value = false;
		ElNotification.success(props.formData.id ? '儲存成功！' : '新增成功！');
		await loadData();
	});
}

function setAutoReloadDataIntervalSeconds(seconds: number) {
	autoReloadDataCountdownSeconds.value = autoReloadDataIntervalSeconds.value = seconds;
	if (seconds <= 0) clearIntervalRef(autoReloadDataInterval);
	else setupAutoReloadData();
}

function setFormDataValues(source: any, target: any) {
	if (Array.isArray(source) && Array.isArray(target)) {
		target.length = 0;
		target.push(...cloneDeep(source));
	} else if (isObjectLike(source) && isObjectLike(target)) {
		for (const key in target) {
			if (source[key] === undefined) continue;
			if (isObjectLike(source[key]) && isObjectLike(target[key])) setFormDataValues(source[key], target[key]);
			else target[key] = source[key];
		}
	}
}

function setupAutoReloadData() {
	if (autoReloadDataInterval.value || !autoReloadDataIntervalSeconds.value || typeof window === 'undefined') return;
	autoReloadDataInterval.value = setInterval(async () => {
		autoReloadDataCountdownSeconds.value--;
		if (autoReloadDataCountdownSeconds.value <= 0) await loadData();
	}, 1000);
}

function showAskDeleteRowMessageBox(data: TableRowData) {
	ElMessageBox.confirm(props.askDeleteRowMessageRender(data), {
		autofocus: false,
		async beforeClose(action, instance, done) {
			if (instance.confirmButtonLoading) return;
			else if (action !== 'confirm') return done();
			instance.showCancelButton = !(instance.confirmButtonLoading = true);
			instance.confirmButtonText = '刪除中...';
			const response = await props.crudApiClass.delete(data.id);
			if (response.data.success) {
				done();
				ElNotification.success('刪除成功！');
				await loadData();
			} else {
				instance.showCancelButton = !(instance.confirmButtonLoading = false);
				instance.confirmButtonText = '確定';
			}
		},
		confirmButtonClass: 'el-button--danger ml-1!',
		draggable: true,
		type: 'warning'
	});
}

// Hooks
onActivated(() => tabsController.ensure(props.title, window.location.pathname));
onMounted(setupAutoReloadData);

// Exposes
defineExpose({ loadData });

// Load data
await loadData();
</script>

<style lang="scss" scoped>
:deep(.el-pagination) {
	.el-select {
		width: 109px;
	}

	@media (max-width: 768px) {
		justify-content: center;

		.btn-prev,
		.el-pagination__sizes {
			margin-left: 0;
		}

		.el-pager :not(.is-active),
		.el-pagination__jump {
			display: none;
		}
	}
}
</style>
