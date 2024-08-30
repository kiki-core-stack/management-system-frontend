import swal from 'sweetalert2';
import type { SweetAlertCustomClass, SweetAlertOptions } from 'sweetalert2';

const customSweetAlertClass: SweetAlertCustomClass = {
	actions: 'mt-1',
	icon: 'mt-0 mx-auto',
	title: 'p-0'
};

const customSweetAlert = swal.mixin({
	buttonsStyling: false,
	confirmButtonText: '確認',
	customClass: customSweetAlertClass,
	padding: '1rem'
});

export const closeAlert = customSweetAlert.close;
export const showErrorAlert = (title: string = '發生錯誤！請稍候再試。', options?: SweetAlertOptions) => {
	customSweetAlert.fire({
		...options,
		customClass: { ...customSweetAlertClass, confirmButton: 'el-button el-button--danger' },
		icon: 'error',
		title
	});
};

export const showLoadingAlert = (title: string = '載入中...', options?: SweetAlertOptions) => {
	customSweetAlert.fire({
		...options,
		allowEscapeKey: false,
		allowOutsideClick: false,
		customClass: { ...customSweetAlertClass, actions: 'mt-4' },
		didOpen: () => customSweetAlert.showLoading(),
		title
	});
};

export const showSuccessAlert = (title: string, options?: SweetAlertOptions) => {
	customSweetAlert.fire({
		...options,
		customClass: { ...customSweetAlertClass, confirmButton: 'el-button el-button--success' },
		icon: 'success',
		title
	});
};
