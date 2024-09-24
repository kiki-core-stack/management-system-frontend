import type { FormRules } from 'element-plus';

declare global {
	type ElFormRules<T extends MaybeRef<Dict<any> | string>> = FormRules<T>;
}
