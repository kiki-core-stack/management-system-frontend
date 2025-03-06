import { AdminApi } from '@/apis/admin';
import { AdminAuthApi } from '@/apis/admin/auth';

export async function logout(noAlert: boolean = false) {
    if (!noAlert) showLoadingAlert('登出中...');
    const response = await AdminAuthApi.logout();
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
    const response = await AdminApi.getInfo();
    Object.assign(adminInfoState, response?.data.data);
    Object.assign(accountState.twoFactorAuthenticationStatus, response?.data.data?.twoFactorAuthenticationStatus);
    return adminInfoState;
}
