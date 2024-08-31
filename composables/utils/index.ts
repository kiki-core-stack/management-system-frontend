export * from '@kikiutils/el-plus-admin-pack/utils/api-requests';
export { getEnumNumberValues, getEnumStringValues } from '@kikiutils/node/enum';
export { calculateToPercentageString } from '@kikiutils/node/math';

export const clearAndAssignObject = (target: object, ...sources: any[]) => {
	Object.keys(target).forEach((key) => delete target[key as keyof typeof target]);
	Object.assign(target, ...sources);
};

export const clearIntervalRef = (intervalRef: Ref<Nullable<NodeJS.Timeout>>) => (intervalRef.value && clearInterval(intervalRef.value), (intervalRef.value = null));
export const compareEventKey = (
	event: KeyboardEvent,
	key: string,
	options: {
		alt?: boolean;
		ctrl?: boolean;
		ignoreCase?: boolean;
		shift?: boolean;
	} = {}
) => {
	if (event.key === key || (options.ignoreCase && event.key.toLowerCase() === key.toLowerCase())) {
		if (options.ctrl && !(event.ctrlKey || event.metaKey)) return false;
		if (options.shift && !event.shiftKey) return false;
		if (options.alt && !event.altKey) return false;
		return true;
	}

	return false;
};

export const copyTextToClipboardAndShowMessage = (text: string) => !!(copyTextToClipboard(text) && ElMessage.success('已複製！'));
export const createLoadingState = () => {
	let resetTimeout: Nullable<NodeJS.Timeout>;
	return {
		reset(timeout: number = 1000) {
			if (resetTimeout) clearTimeout(resetTimeout);
			resetTimeout = setTimeout(() => (this.state.error = this.state.loading = this.state.success = false), timeout);
		},
		state: reactive({
			error: false,
			loading: false,
			success: false
		})
	};
};

export const createPageBaseVariables = <T extends TableRowData = TableRowData>() => ({
	autoReloadDataCountdownSeconds: ref(60),
	autoReloadDataInterval: ref<Nullable<NodeJS.Timeout>>(null),
	autoReloadDataIntervalSeconds: ref(60),
	isLoadingData: ref(true),
	paginationParams: reactive({ limit: 10, page: 1 }),
	tableData: shallowReactive<T[]>([]),
	totalTableDataCount: ref(0)
});

export const objectToFormData = (object: object) => {
	const formData = new FormData();
	for (const kV of Object.entries(object)) formData.append(...kV);
	return formData;
};

export function flattenToSingleValue<T>(value: T | T[]): T | undefined;
export function flattenToSingleValue<T, D>(value: T | T[], defaultValue: D): NonNullable<T> | D;
export function flattenToSingleValue<T, D>(value: T | T[], defaultValue?: D) {
	return (Array.isArray(value) ? value[0] : value) ?? defaultValue;
}
