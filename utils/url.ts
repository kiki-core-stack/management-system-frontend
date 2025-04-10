function appendRedirectQueryFromCurrentPath(url: string) {
    // eslint-disable-next-line style/array-bracket-newline, style/array-element-newline
    const [path = '', ...parts] = url.split('?');
    const urlSearchParams = new URLSearchParams(parts.join('?'));
    urlSearchParams.set('redirect', useRoute().fullPath);
    return `${path}?${urlSearchParams.toString()}`;
}

export function assignUrlWithOptionalRedirect(url: string, withRedirectBack?: boolean) {
    if (withRedirectBack) url = appendRedirectQueryFromCurrentPath(url);
    window.location.assign(url);
}

export function createObjectUrlFromInputElement(inputElement: HTMLInputElement) {
    const files = inputElement.files;
    if (!files?.[0]) return;
    const url = URL.createObjectURL(files[0]);
    inputElement.value = '';
    return url;
}

export function navigateUrlWithOptionalRedirect(
    url: string,
    withRedirectBack?: boolean,
    options: Parameters<typeof navigateTo>[1] = { replace: true },
) {
    if (withRedirectBack) url = appendRedirectQueryFromCurrentPath(url);
    return navigateTo(url, options);
}
