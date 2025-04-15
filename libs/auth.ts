import { authApi } from '@/libs/apis/auth';

export async function logout(noAlert: boolean = false) {
    if (!noAlert) showLoadingAlert('登出中...');
    const response = await authApi.logout();
    if (!response?.data.success) return !noAlert && showErrorAlert('登出失敗！');
    setTimeout(() => assignUrlWithOptionalRedirect('/login/', true), 1000);
    if (noAlert) return;
    showSuccessAlert(
        '登出成功！',
        {
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
        },
    );
}
