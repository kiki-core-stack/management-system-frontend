import type { ElMessageBoxOptions } from 'element-plus';

export function createElMessageBoxConfirmHandler<T = any>(
    messageRender: ((data: T) => string) | string,
    loadingText: string,
    handleConfirm: (data: T) => Promise<boolean>,
    onSuccess?: (data: T) => Promisable<void>,
    options?: Except<ElMessageBoxOptions, 'beforeClose'>,
) {
    return (data: T) => {
        ElMessageBox.confirm(
            typeof messageRender === 'function' ? messageRender(data) : messageRender,
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
                ...options,
            },
        );
    };
}
