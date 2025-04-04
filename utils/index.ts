export {
    getEnumNumberValues,
    getEnumStringValues,
} from '@kikiutils/node/enum';
export { extractFirstValue } from '@kikiutils/node/general';

export function clearAndAssignObject(target: object, ...sources: any[]) {
    Object.keys(target).forEach((key) => delete target[key as keyof typeof target]);
    Object.assign(target, ...sources);
}

export function clearIntervalRef(intervalRef: Ref<Nullable<NodeJS.Timeout>>) {
    if (intervalRef.value) clearInterval(intervalRef.value);
    intervalRef.value = null;
}

export function compareEventKey(
    event: KeyboardEvent,
    key: string,
    options: {
        alt?: boolean;
        ctrl?: boolean;
        ignoreCase?: boolean;
        shift?: boolean;
    } = {},
) {
    if (event.key === key || (options.ignoreCase && event.key.toLowerCase() === key.toLowerCase())) {
        if (options.ctrl && !(event.ctrlKey || event.metaKey)) return false;
        if (options.shift && !event.shiftKey) return false;
        if (options.alt && !event.altKey) return false;
        return true;
    }

    return false;
}

export function copyTextToClipboardAndShowMessage(text: string) {
    if (!copyTextToClipboard(text)) return false;
    ElMessage.success('已複製！');
    return true;
}

export function objectToFormData(object: object) {
    const formData = new FormData();
    for (const kV of Object.entries(object)) formData.append(...kV);
    return formData;
}
