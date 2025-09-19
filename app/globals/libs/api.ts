import type { AnyRecord } from '@kikiutils/types';

export function buildApiQueryFilter(filter: AnyRecord) {
    filter = cloneDeep(filter);
    Object.entries(filter).forEach(([field, condition]) => {
        if (condition === null) return;
        if (Array.isArray(condition)) {
            if (!condition.length) delete filter[field];
            return;
        }

        if (typeof condition === 'object') {
            Object.entries(condition).forEach(([operator, operand]) => {
                if (operator === '$in') {
                    if (!Array.isArray(operand) || operand.length === 0) delete condition[operator];
                    return;
                }

                if (operator === '$regex' && (typeof operand !== 'string' || !operand)) delete condition[operator];
            });

            if (!Object.keys(condition).length) delete filter[field];
            return;
        }

        if (typeof condition === 'string' && !condition) delete filter[field];
    });

    return JSON.stringify(filter);
}
