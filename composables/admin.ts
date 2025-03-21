import { adminApi } from '@/apis/admin';
import { adminAuthApi } from '@/apis/admin/auth';

export async function logout(noAlert: boolean = false) {
    if (!noAlert) showLoadingAlert('登出中...');
    const response = await adminAuthApi.logout();
    if (!response?.data.success) return !noAlert && showErrorAlert('登出失敗！');
    setTimeout(() => assignToUrlOrNavigateTo('/login', true), 1000);
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

export async function updateAdminInfoState() {
    const response = await adminApi.getInfo();
    Object.assign(adminInfoState, response?.data.data);
    Object.assign(accountState.twoFactorAuthenticationStatus, response?.data.data?.twoFactorAuthenticationStatus);
    return adminInfoState;
}
