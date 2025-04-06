export * from '@kiki-core-stack/pack/libs/api-requests';

export function createElMessageBoxConfirmHandler<T = any>(
    messageRender: (data: T) => string,
    loadingText: string,
    handleConfirm: (data: T) => Promise<boolean>,
    onSuccess?: (data: T) => Promisable<void>,
) {
    return async (data: T) => {
        ElMessageBox.confirm(
            messageRender(data),
            {
                async beforeClose(action, instance, done) {
                    if (instance.confirmButtonLoading) return;
                    else if (action !== 'confirm') return done();
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = loadingText;
                    instance.showCancelButton = false;
                    if (await handleConfirm(data)) {
                        done();
                        await onSuccess?.(data);
                    } else {
                        instance.confirmButtonLoading = false;
                        instance.confirmButtonText = '確定';
                        instance.showCancelButton = true;
                    }
                },
                confirmButtonClass: 'el-message-box-confirm-btn',
                draggable: true,
            },
        );
    };
}
