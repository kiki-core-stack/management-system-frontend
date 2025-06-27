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
            <div class="dark:bg-dark relative rounded-[10px] bg-white p-4">
                <slot name="before-toolbar" />
                <div class="b b-b-0 el-bg-and-border rounded-t-1 p-1">
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
                        <time-range-quick-select
                            v-if="showTimeRangeQuickSelect"
                            v-model:end="timeRangeEndAt"
                            v-model:start="timeRangeStartAt"
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
                    @sort-change="onSortChange"
                >
                    <slot name="table" />
                    <el-table-datetime-column
                        v-if="!hideTimestampColumns && !hideCreatedAtColumn"
                        label="建立時間"
                    />
                    <el-table-datetime-column
                        v-if="!hideTimestampColumns && !hideUpdatedAtColumn"
                        field="updatedAt"
                        label="更新時間"
                    />
                    <el-table-column
                        v-if="!hideActionsColumn"
                        align="center"
                        label="操作"
                    >
                        <template #default="scope">
                            <div class="flex-middle gap-btns">
                                <slot
                                    :="scope"
                                    name="action-btns-prepend"
                                />
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
                                <slot
                                    :="scope"
                                    name="action-btns-append"
                                />
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div
                    v-if="!hideFooter"
                    class="b b-t-0 el-bg-and-border rounded-b-1 p-1"
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
                    :close-on-click-modal="!dialogStatusOverlayRef?.isVisible"
                    :close-on-press-escape="!dialogStatusOverlayRef?.isVisible"
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
                    <status-overlay ref="dialogStatusOverlayRef" />
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { BaseCrudApi } from '@/libs/apis/_internals/base/crud';

type ControlActionBtnFunction = (row: any) => boolean;

interface OnSortChangeData {
    column: any;
    order: Nullable<'ascending' | 'descending'>;
    prop: string;
}

interface Props {
    addDataBtnText?: string;
    beforeDialogOpen?: (row: any) => void;
    confirmDeleteMessageRender?: (row: any) => string;
    crudApi: BaseCrudApi;
    defaultSort?: Except<OnSortChangeData, 'column'>;
    dialogTitleSuffix?: string;
    disablePagination?: boolean;
    disableRowDeleteBtnRule?: ControlActionBtnFunction;
    disableRowEditBtnRule?: ControlActionBtnFunction;
    filter?: AnyRecord;
    formRules?: ElFormRules<AnyRecord>;
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

const formData = defineModel<TableRowData>('formData', { default: { id: '' } });
const timeRangeEndAt = defineModel<Date>('timeRangeEnd', { default: () => new Date() });
const timeRangeStartAt = defineModel<Date>('timeRangeStart', { default: () => new Date() });

// Variables
const autoReloadDataCountdownDropdownBtnRef = useTemplateRef('autoReloadDataCountdownDropdownBtnRef');
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
const dialogStatusOverlayRef = useTemplateRef('dialogStatusOverlayRef');
const formRef = useTemplateRef('formRef');
const isDialogOpen = ref(false);
const isEditing = ref(false);
const isLoadingData = ref(false);
const mainContainerRef = useTemplateRef('mainContainerRef');
const paginationParams = ref({
    limit: 10,
    page: 1,
});

const sortQueryParam = ref<string | undefined>(undefined);
const tableData = ref<TableRowData[]>([]);
const totalTableDataCount = ref(0);
const windowSize = useWindowSize();

// Computed properties
const dialogWidth = computed(() => {
    if (windowSize.width.value <= windowSize.height.value) return '95vw';
    if (windowSize.width.value * 0.5 < 700) return '75vw';
    return '50vw';
});

// Functions
async function loadData() {
    if (isLoadingData.value) return;
    isLoadingData.value = true;
    autoReloadDataCountdownDropdownBtnRef.value?.stop();
    const response = await props.crudApi.getList({
        ...props.disablePagination || props.hideFooter ? {} : paginationParams.value,
        filter: props.filter,
        sort: sortQueryParam.value,
    });

    if (response?.data.data) {
        tableData.value = response.data.data.list;
        totalTableDataCount.value = response.data.data.count || 0;
    }

    isLoadingData.value = false;
    autoReloadDataCountdownDropdownBtnRef.value?.start();
}

async function onSortChange(data: OnSortChangeData) {
    if (data.order === 'ascending') sortQueryParam.value = data.prop;
    else if (data.order === 'descending')sortQueryParam.value = `-${data.prop}`;
    else sortQueryParam.value = undefined;
    await loadData();
}

function openDialog(row?: TableRowData) {
    dialogStatusOverlayRef.value?.hide();
    formRef.value?.resetFields();
    isEditing.value = row !== undefined;
    formData.value = merge(cloneDeep(defaultFormData), row);
    props.beforeDialogOpen?.(row);
    isDialogOpen.value = true;
}

async function saveData() {
    if (!dialogStatusOverlayRef.value || dialogStatusOverlayRef.value.isVisible) return;
    await formRef.value?.validate(async (valid) => {
        if (!valid) return;
        dialogStatusOverlayRef.value!.showLoading('儲存中...');
        let response;
        if (formData.value.id) response = await props.crudApi.update(formData.value.id, formData.value);
        else response = await props.crudApi.create(formData.value);
        if (!response?.data.success) return dialogStatusOverlayRef.value!.hide();
        isDialogOpen.value = false;
        ElNotification.success(formData.value.id ? '儲存成功！' : '新增成功！');
        await loadData();
    });
}

// Hooks
onActivated(() => headerTabsController.ensure(props.title));
onMounted(loadData);
usePreserveScroll(mainContainerRef);

// Exposes
defineExpose({ loadData });

// Init
if (props.defaultSort?.order === 'ascending') sortQueryParam.value = props.defaultSort.prop;
else if (props.defaultSort?.order === 'descending') sortQueryParam.value = `-${props.defaultSort.prop}`;
</script>

<style lang="scss" scoped>
.el-bg-and-border {
    border-color: var(--el-border-color-lighter);
    background-color: var(--el-bg-color);
}

:deep(.el-pagination) {
    .el-select {
        @apply w-[115px];
    }

    @media (width <= 768px) {
        @apply justify-center;

        .btn-prev,
        /* stylelint-disable-next-line selector-class-pattern */
        .el-pagination__sizes {
            @apply ml-0;
        }

        .el-pager :not(.is-active),
        /* stylelint-disable-next-line selector-class-pattern */
        .el-pagination__jump {
            @apply hidden;
        }
    }
}
</style>
