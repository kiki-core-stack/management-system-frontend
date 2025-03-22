<template>
    <Head>
        <Title>{{ title }}</Title>
    </Head>
    <div class="color-mode-transition dark:bg-dark  rounded-10px relative bg-white p-4">
        <slot name="before-table" />
        <div class="p-1">
            <slot name="table-header-start" />
            <div class="gap-btns flex flex-wrap">
                <slot name="before-table-header-btns" />
                <el-button
                    v-if="!hideAddDataBtn"
                    @click="openDialog()"
                >
                    {{ addDataBtnText }}
                </el-button>
                <el-dropdown
                    trigger="click"
                    :disabled="mainState.isPageLoading"
                    split-button
                    @click="loadData"
                >
                    刷新{{ autoReloadDataIntervalSeconds === 0 ? '' : `(${autoReloadDataCountdownSeconds})` }}
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="setAutoReloadDataIntervalSeconds(0)">
                                關閉
                            </el-dropdown-item>
                            <el-dropdown-item
                                v-for="sec in [
                                    5,
                                    10,
                                    20,
                                    30,
                                    40,
                                    50,
                                    60,
                                ]"
                                :key="sec"
                                @click="setAutoReloadDataIntervalSeconds(sec)"
                            >
                                {{ sec }}s
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-filter-date-range-btn-group
                    v-if="enableFilterDateRangeBtnGroup"
                    :filter-query="filterQuery"
                    @select="loadData"
                />
                <slot name="after-table-header-btns" />
            </div>
            <slot name="table-header-end" />
        </div>
        <el-table
            row-key="id"
            table-layout="auto"
            :data="tableData"
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
                :width="156"
            >
                <template #default="{ row }">
                    {{ formatDateOrTimestamp(row.createdAt) }}
                </template>
            </el-table-column>
            <el-table-column
                v-if="!hideTimestampColumns && !hideUpdatedAtColumn"
                align="center"
                label="更新時間"
                :width="156"
            >
                <template #default="{ row }">
                    {{ formatDateOrTimestamp(row.updatedAt) }}
                </template>
            </el-table-column>
            <el-table-column
                v-if="!hideActionsColumn"
                align="center"
                label="操作"
            >
                <template #default="scope">
                    <div class="flex-middle gap-btns">
                        <slot
                            :="scope"
                            name="before-edit-btn"
                        />
                        <el-action-btn
                            v-if="!hideEditBtn && !hideRowEditBtnRule?.(scope.row)"
                            :disabled="disableRowEditBtnRule?.(scope.row)"
                            @click="openDialog(scope.row)"
                        >
                            編輯
                        </el-action-btn>
                        <slot
                            :="scope"
                            name="after-edit-btn"
                        />
                        <el-action-btn
                            v-if="!hideDeleteBtn && !hideRowDeleteBtnRule?.(scope.row)"
                            type="danger"
                            :disabled="disableRowDeleteBtnRule?.(scope.row)"
                            @click="showAskDeleteRowMessageBox(scope.row)"
                        >
                            刪除
                        </el-action-btn>
                        <slot
                            :="scope"
                            name="after-delete-btn"
                        />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="p-1">
            <el-pagination
                v-model:current-page="paginationParams.page"
                v-model:page-size="paginationParams.limit"
                layout="total, prev, pager, next, sizes"
                :disabled="mainState.isPageLoading"
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
            width="96vmin"
            :close-on-click-modal="!saveDataState.loading"
            :close-on-press-escape="!saveDataState.loading"
            :title="`${isEditing ? '編輯' : '新增'}${dialogTitleSuffix}`"
            align-center
            append-to-body
            center
            draggable
            @open="$emit('dialogOpen')"
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
            <state-absolute
                :loading-text="formData.id ? '儲存中...' : '新增中...'"
                :state="saveDataState"
            />
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { isObjectLike } from 'lodash-es';

import type { BaseCrudApi } from '@/apis/base';

interface Emits {
    (e: 'dialogOpen'): void;
}

interface Props<ControlRowBtnFunction extends (rowData: any) => boolean = (rowData: any) => boolean> {
    addDataBtnText?: string;
    askDeleteRowMessageRender?: (rowData: any) => string;
    beforeDialogOpen?: (data?: any) => void;
    columnTotalsFooterColspan?: number;
    crudApiClass: BaseCrudApi;
    dialogTitleSuffix?: string;
    disableRowDeleteBtnRule?: ControlRowBtnFunction;
    disableRowEditBtnRule?: ControlRowBtnFunction;
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
    hideRowDeleteBtnRule?: ControlRowBtnFunction;
    hideRowEditBtnRule?: ControlRowBtnFunction;
    hideTimestampColumns?: boolean;
    hideUpdatedAtColumn?: boolean;
    title: string;
}

// Define props, models and emits
const props = withDefaults(
    defineProps<Props>(),
    {
        askDeleteRowMessageRender: (rowData: any) => `確定要刪除 ${rowData.name} 嗎？`,
        formData: () => ({ id: '' }),
        formRules: () => ({}),
    },
);

defineEmits<Emits>();

// Variables
const {
    autoReloadDataCountdownSeconds,
    autoReloadDataInterval,
    autoReloadDataIntervalSeconds,
    paginationParams,
    tableData,
    totalTableDataCount,
} = createPageBaseVariables();
const { state: saveDataState } = createLoadingState();
const columnTotals = reactive<Dict<number | string>>({});
const defaultFormData = cloneDeep(props.formData);
const formRef = ref<ElFormRef>(null);
const isEditing = ref(false);
const isDialogOpen = ref(false);

// Functions
async function loadData() {
    mainState.isPageLoading = true;
    clearIntervalRef(autoReloadDataInterval);
    autoReloadDataCountdownSeconds.value = autoReloadDataIntervalSeconds.value;
    const response = await props.crudApiClass.getList({
        ...paginationParams,
        filterQuery: props.filterQuery,
    });

    if (response?.data.data) {
        clearAndAssignObject(columnTotals, response.data.data.totals);
        tableData.length = 0;
        tableData.push(...response.data.data.list || []);
        totalTableDataCount.value = response.data.data.count || 0;
    }

    mainState.isPageLoading = false;
    setupAutoReloadData();
}

function openDialog(rowData?: TableRowData) {
    formRef.value?.resetFields();
    props.beforeDialogOpen?.(rowData);
    isDialogOpen.value = true;
    isEditing.value = rowData !== undefined;
    setTimeout(() => setFormDataValues(rowData || defaultFormData, props.formData));
}

async function saveData() {
    if (saveDataState.loading) return;
    await formRef.value?.validate(async (valid) => {
        if (!valid) return;
        saveDataState.loading = true;
        let response;
        if (props.formData.id) response = await props.crudApiClass.update(props.formData.id, props.formData);
        else response = await props.crudApiClass.create(props.formData);
        saveDataState.loading = false;
        if (!response?.data.success) return;
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
    if (autoReloadDataInterval.value || !autoReloadDataIntervalSeconds.value || import.meta.server) return;
    autoReloadDataInterval.value = setInterval(async () => {
        autoReloadDataCountdownSeconds.value--;
        if (autoReloadDataCountdownSeconds.value <= 0) await loadData();
    }, 1000);
}

function showAskDeleteRowMessageBox(data: TableRowData) {
    ElMessageBox.confirm(
        props.askDeleteRowMessageRender(data),
        {
            autofocus: false,
            async beforeClose(action, instance, done) {
                if (instance.confirmButtonLoading) return;
                else if (action !== 'confirm') return done();
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '刪除中...';
                instance.showCancelButton = false;
                const response = await props.crudApiClass.delete(data.id);
                if (response?.data.success) {
                    done();
                    ElNotification.success('刪除成功！');
                    await loadData();
                } else {
                    instance.confirmButtonLoading = false;
                    instance.confirmButtonText = '確定';
                    instance.showCancelButton = true;
                }
            },
            confirmButtonClass: 'el-button--danger ml-1!',
            draggable: true,
            type: 'warning',
        },
    );
}

// Hooks
onActivated(() => tabsController.ensure(props.title, window.location.pathname));
onMounted(loadData);

// Exposes
defineExpose({ loadData });
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
