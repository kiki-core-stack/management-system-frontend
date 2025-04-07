<template>
    <div
        v-loading="isLoadingData"
        class="h-full"
    >
        <Head>
            <Title>{{ title }}</Title>
        </Head>
        <div
            ref="mainContainerRef"
            class="h-full overflow-auto p-4"
        >
            <div class="dark:bg-dark rounded-10px relative bg-white p-4">
                <slot name="before-toolbar" />
                <div class="el-bg-and-border rounded-t-1 border border-b-0 p-1">
                    <slot name="toolbar-prepend" />
                    <div class="gap-btns flex flex-wrap">
                        <el-button
                            v-if="!hideAddDataBtn"
                            @click="openDialog()"
                        >
                            {{ addDataBtnText }}
                        </el-button>
                        <countdown-dropdown-btn
                            ref="autoReloadDataCountdownDropdownBtnRef"
                            text="刷新"
                            @trigger="loadData"
                        />
                        <!-- @vue-expect-error -->
                        <time-range-quick-select
                            v-if="showTimeRangeQuickSelect"
                            v-model="filters"
                            @select="loadData"
                        />
                    </div>
                    <slot name="toolbar-append" />
                </div>
                <el-table
                    table-layout="auto"
                    :data="tableData"
                    :row-key="rowKey"
                    border
                    flexible
                    highlight-current-row
                    stripe
                >
                    <slot name="table" />
                    <el-table-column
                        v-if="!hideTimestampColumns && !hideCreatedAtColumn"
                        align="center"
                        label="建立時間"
                        width="156"
                        :formatter="(row) => formatDate(row.createdAt)"
                    />
                    <el-table-column
                        v-if="!hideTimestampColumns && !hideUpdatedAtColumn"
                        align="center"
                        label="更新時間"
                        width="156"
                        :formatter="(row) => formatDate(row.updatedAt)"
                    />
                    <el-table-column
                        v-if="!hideActionsColumn"
                        align="center"
                        label="操作"
                    >
                        <template #default="scope">
                            <div class="flex-middle gap-btns">
                                <el-action-btn
                                    v-if="!hideEditBtn && !hideRowEditBtnRule?.(scope.row)"
                                    :disabled="disableRowEditBtnRule?.(scope.row)"
                                    @click="openDialog(scope.row)"
                                >
                                    編輯
                                </el-action-btn>
                                <el-action-btn
                                    v-if="!hideDeleteBtn && !hideRowDeleteBtnRule?.(scope.row)"
                                    type="danger"
                                    :disabled="disableRowDeleteBtnRule?.(scope.row)"
                                    @click="confirmDelete(scope.row)"
                                >
                                    刪除
                                </el-action-btn>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div
                    v-if="!hideFooter"
                    class="el-bg-and-border rounded-b-1 border border-t-0 p-1"
                >
                    <el-pagination
                        v-if="!disablePagination"
                        v-model:current-page="paginationParams.page"
                        v-model:page-size="paginationParams.limit"
                        layout="total, prev, pager, next, sizes"
                        :page-sizes="[
                            10,
                            20,
                            50,
                            100,
                            500,
                            1000,
                        ]"
                        :pager-count="5"
                        :total="totalTableDataCount"
                        @change="loadData"
                    />
                </div>
                <el-dialog
                    v-model="isDialogOpen"
                    :close-on-click-modal="!saveDataStatusOverlayRef?.isVisible"
                    :close-on-press-escape="!saveDataStatusOverlayRef?.isVisible"
                    :title="`${isEditing ? '編輯' : '新增'}${dialogTitleSuffix}`"
                    :width="dialogWidth"
                    align-center
                    append-to-body
                    center
                    draggable
                >
                    <el-form
                        ref="formRef"
                        label-width="auto"
                        :model="formData"
                        :rules="formRules"
                        status-icon
                        @submit.prevent="saveData"
                    >
                        <slot name="form" />
                        <div class="text-center">
                            <el-button
                                native-type="submit"
                                type="primary"
                            >
                                儲存
                            </el-button>
                        </div>
                    </el-form>
                    <status-overlay ref="saveDataStatusOverlayRef" />
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { isObjectLike } from 'lodash-es';

import type { BaseCrudApi } from '@/apis/base';

type ControlActionBtnFunction = (row: any) => boolean;

interface Props {
    addDataBtnText?: string;
    beforeDialogOpen?: (row: any) => void;
    confirmDeleteMessageRender?: (row: any) => string;
    crudApi: BaseCrudApi;
    dialogTitleSuffix?: string;
    disablePagination?: boolean;
    disableRowDeleteBtnRule?: ControlActionBtnFunction;
    disableRowEditBtnRule?: ControlActionBtnFunction;
    formRules?: ElFormRules<Dict<any>>;
    hideActionsColumn?: boolean;
    hideAddDataBtn?: boolean;
    hideCreatedAtColumn?: boolean;
    hideDeleteBtn?: boolean;
    hideEditBtn?: boolean;
    hideFooter?: boolean;
    hideRowDeleteBtnRule?: ControlActionBtnFunction;
    hideRowEditBtnRule?: ControlActionBtnFunction;
    hideTimestampColumns?: boolean;
    hideUpdatedAtColumn?: boolean;
    rowKey?: string;
    showTimeRangeQuickSelect?: boolean;
    title: string;
}

// Define props, models and emits
const props = withDefaults(
    defineProps<Props>(),
    {
        formRules: () => ({}),
        rowKey: 'id',
    },
);

const filters = defineModel<Partial<TimeRangeFilter>>('filters');
const formData = defineModel<TableRowData>('formData', { default: { id: '' } });

// Variables
const autoReloadDataCountdownDropdownBtnRef = ref<ComponentRef<'CountdownDropdownBtn'>>(null);
const confirmDelete = createElMessageBoxConfirmHandler<TableRowData>(
    // @ts-expect-error Ignore this error.
    props.confirmDeleteMessageRender || ((data) => `確定要刪除 ${data.name} 嗎？`),
    '刪除中...',
    async (data) => !!(await props.crudApi.delete(data.id))?.data.success,
    async () => {
        ElNotification.success('刪除成功！');
        await loadData();
    },
    { type: 'warning' },
);

const defaultFormData = cloneDeep(formData.value);
const formRef = ref<ElFormRef>(null);
const isDialogOpen = ref(false);
const isEditing = ref(false);
const isLoadingData = ref(false);
const mainContainerRef = ref<Nullable<HTMLDivElement>>(null);
const paginationParams = ref({
    limit: 10,
    page: 1,
});

const saveDataStatusOverlayRef = ref<ComponentRef<'StatusOverlay'>>(null);
const tableData = ref<TableRowData[]>([]);
const totalTableDataCount = ref(0);
const windowSize = useWindowSize();

// Computed properties
const dialogWidth = computed(() => {
    if (windowSize.width.value > windowSize.height.value) {
        if (windowSize.width.value * 0.5 < 700) return '75vw';
        return '50vw';
    } else return '95vw';
});

// Functions
async function loadData() {
    if (isLoadingData.value) return;
    isLoadingData.value = true;
    autoReloadDataCountdownDropdownBtnRef.value?.stop();
    const response = await props.crudApi.getList({
        ...props.disablePagination || props.hideFooter ? {} : paginationParams.value,
        filter: filters.value,
    });

    if (response?.data.data) {
        tableData.value.length = 0;
        tableData.value.push(...response.data.data.list);
        totalTableDataCount.value = response.data.data.count || 0;
    }

    isLoadingData.value = false;
    autoReloadDataCountdownDropdownBtnRef.value?.start();
}

function openDialog(row?: TableRowData) {
    formRef.value?.resetFields();
    isEditing.value = row !== undefined;
    setFormDataValues(row || defaultFormData, formData.value);
    props.beforeDialogOpen?.(row);
    isDialogOpen.value = true;
}

async function saveData() {
    if (!saveDataStatusOverlayRef.value || saveDataStatusOverlayRef.value.isVisible) return;
    await formRef.value?.validate(async (valid) => {
        if (!valid) return;
        saveDataStatusOverlayRef.value!.showLoading();
        let response;
        if (formData.value.id) response = await props.crudApi.update(formData.value.id, formData.value);
        else response = await props.crudApi.create(formData.value);
        saveDataStatusOverlayRef.value!.hide();
        if (!response?.data.success) return;
        isDialogOpen.value = false;
        ElNotification.success(formData.value.id ? '儲存成功！' : '新增成功！');
        await loadData();
    });
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

// Hooks
onActivated(() => tabsController.ensure(props.title, window.location.pathname));
onMounted(loadData);
useScrollMemory(mainContainerRef);

// Exposes
defineExpose({ loadData });
</script>

<style lang="scss" scoped>
.el-bg-and-border {
    background-color: var(--el-bg-color);
    border-color: var(--el-border-color-lighter);
}

:deep(.el-pagination) {
    .el-select {
        width: 115px;
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
