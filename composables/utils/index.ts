export { flattenToSingleValue } from '@kikiutils/node';
export {
    getEnumNumberValues,
    getEnumStringValues,
} from '@kikiutils/node/enum';
export { calculateToPercentageString } from '@kikiutils/node/math';

export const copyTextToClipboardAndShowMessage = (text: string) => !!(copyTextToClipboard(text) && ElMessage.success('已複製！'));

export function clearAndAssignObject(target: object, ...sources: any[]) {
    Object.keys(target).forEach((key) => delete target[key as keyof typeof target]);
    Object.assign(target, ...sources);
}

export function clearIntervalRef(intervalRef: Ref<Nullable<NodeJS.Timeout>>) {
    if (intervalRef.value) clearInterval(intervalRef.value);
    intervalRef.value = null;
}

export function compareEventKey(event: KeyboardEvent, key: string, options: {
    alt?: boolean;
    ctrl?: boolean;
    ignoreCase?: boolean;
    shift?: boolean;
} = {}) {
    if (event.key === key || (options.ignoreCase && event.key.toLowerCase() === key.toLowerCase())) {
        if (options.ctrl && !(event.ctrlKey || event.metaKey)) return false;
        if (options.shift && !event.shiftKey) return false;
        if (options.alt && !event.altKey) return false;
        return true;
    }

    return false;
}

export function createLoadingState() {
    let resetTimeout: Nullable<NodeJS.Timeout>;
    return {
        reset(timeout: number = 1000) {
            if (resetTimeout) clearTimeout(resetTimeout);
            resetTimeout = setTimeout(() => this.state.error = this.state.loading = this.state.success = false, timeout);
        },
        state: reactive({
            error: false,
            loading: false,
            success: false,
        }),
    };
}

export function objectToFormData(object: object) {
    const formData = new FormData();
    for (const kV of Object.entries(object)) formData.append(...kV);
    return formData;
}
