import type { BaseCrudApi } from '@/apis/base';

export * from '@kiki-core-stack/pack/libs/api-requests';

export function askToggleBooleanFieldMessageBox<RD extends TableRowData, F extends string, M extends Dict<string>>(
    apiClass: BaseCrudApi,
    entityLabel: string,
    toTextMap: M,
    entityName: string,
    elTablePageRef: Ref<ComponentRef<'ElTablePage'>>,
    row: RD,
    field: F,
) {
    const actionText = !lodashGet(row, field) ? '開啟' : '關閉';
    const fieldText = toTextMap[field as keyof M];
    const message = `是否${actionText}${entityLabel} ${entityName} 的${fieldText}狀態?`;
    ElMessageBox.confirm(
        message,
        {
            async beforeClose(action, instance, done) {
                if (instance.confirmButtonLoading) return;
                else if (action !== 'confirm') return done();
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = `${actionText}中...`;
                instance.showCancelButton = false;
                // @ts-expect-error Ignore this error.
                const response = await apiClass.updateBooleanField(row.id, field, !lodashGet(row, field));
                if (response?.data.success) {
                    done();
                    ElNotification.success(`已${actionText}${entityLabel} ${entityName} 的${fieldText}狀態！`);
                    await elTablePageRef.value?.loadData();
                } else {
                    instance.confirmButtonLoading = false;
                    instance.confirmButtonText = '確定';
                    instance.showCancelButton = true;
                }
            },
            confirmButtonClass: 'ml-1!',
            draggable: true,
        },
    );
}

export function createPageBaseVariables<T extends TableRowData = TableRowData>() {
    return {
        autoReloadDataCountdownSeconds: ref(60),
        autoReloadDataInterval: ref<Nullable<NodeJS.Timeout>>(null),
        autoReloadDataIntervalSeconds: ref(60),
        isLoadingData: ref(true),
        paginationParams: reactive({
            limit: 10,
            page: 1,
        }),
        tableData: shallowReactive<T[]>([]),
        totalTableDataCount: ref(0),
    };
}
