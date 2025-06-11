import type { FormRules } from 'element-plus';

declare global {
    type ElFormRules<T extends MaybeRef<AnyRecord | string>> = FormRules<T>;
}
