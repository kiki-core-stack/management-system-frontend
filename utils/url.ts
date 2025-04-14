function appendRedirectQueryFromCurrentPath(url: string) {
    // eslint-disable-next-line style/array-bracket-newline, style/array-element-newline
    const [path = '', rawQuery = ''] = url.split('?');
    const urlSearchParams = new URLSearchParams(rawQuery);
    urlSearchParams.set('redirect', useRoute().fullPath);
    return `${path}?${urlSearchParams.toString()}`;
}

export function assignUrlWithOptionalRedirect(url: string, withRedirectBack?: boolean) {
    if (withRedirectBack) url = appendRedirectQueryFromCurrentPath(url);
    window.location.assign(url);
}

export function getFirstFileObjectUrlAndClearInput(fileInput: HTMLInputElement) {
    const file = fileInput.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    fileInput.value = '';
    return objectUrl;
}

export function navigateUrlWithOptionalRedirect(
    url: string,
    withRedirectBack?: boolean,
    options: Parameters<typeof navigateTo>[1] = { replace: true },
) {
    if (withRedirectBack) url = appendRedirectQueryFromCurrentPath(url);
    return navigateTo(url, options);
}
