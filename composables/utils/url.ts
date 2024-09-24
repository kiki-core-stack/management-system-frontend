export const assignToUrlOrNavigateTo = (url: string, addRedirectToNowPathQuery?: boolean) => {
	if (addRedirectToNowPathQuery) {
		const urlParts = url.split('?');
		const urlSearchParams = new URLSearchParams(urlParts[1] || '');
		urlSearchParams.set('redirect', useRoute().fullPath);
		url = `${urlParts[0] || ''}?${urlSearchParams.toString()}`;
	}

	if (typeof window === 'undefined') navigateTo(url, { replace: true });
	else window.location.assign(url);
};

export const createObjectURLFromInputElement = (inputElement: HTMLInputElement) => {
	const files = inputElement.files;
	if (!files?.[0]) return;
	const url = URL.createObjectURL(files[0]);
	inputElement.value = '';
	return url;
};
