export function assignToUrlOrNavigateTo(url: string, addRedirectToNowPathQuery?: boolean) {
    if (addRedirectToNowPathQuery) {
        const [
            path = '',
            ...parts
        ] = url.split('?');

        const urlSearchParams = new URLSearchParams(parts.join('?'));
        urlSearchParams.set('redirect', useRoute().fullPath);
        url = `${path}?${urlSearchParams.toString()}`;
    }

    if (import.meta.server) return navigateTo(url, { replace: true });
    window.location.assign(url);
}

export function createObjectUrlFromInputElement(inputElement: HTMLInputElement) {
    const files = inputElement.files;
    if (!files?.[0]) return;
    const url = URL.createObjectURL(files[0]);
    inputElement.value = '';
    return url;
}
