import { AdminAPI } from '@/apis/admin';
import { AdminAuthAPI } from '@/apis/admin/auth';

export const logout = async (noAlert: boolean = false) => {
	if (!noAlert) showLoadingAlert('登出中...');
	const response = await AdminAuthAPI.logout();
	if (!response?.data.success) return !noAlert && showErrorAlert('登出失敗！');
	setTimeout(() => assignToURLOrNavigateTo('/login', true), 1000);
	if (noAlert) return;
	showSuccessAlert('登出成功！', {
		allowEscapeKey: false,
		allowOutsideClick: false,
		showConfirmButton: false
	});
};

export const updateAdminInfoState = async () => {
	const response = await AdminAPI.getInfo();
	Object.assign(adminInfoState, response?.data.data);
	Object.assign(accountState.twoFactorAuthenticationStatus, response?.data.data?.twoFactorAuthenticationStatus);
	return adminInfoState;
};
