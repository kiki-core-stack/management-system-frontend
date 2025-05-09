export function buildApiQueryFilters(filters: AnyRecord) {
    filters = cloneDeep(filters);
    Object.entries(filters).forEach(([field, condition]) => {
        if (condition === null) return;
        if (Array.isArray(condition)) {
            if (!condition.length) delete filters[field];
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

            if (!Object.keys(condition).length) delete filters[field];
            return;
        }

        if (typeof condition === 'string' && !condition) delete filters[field];
    });

    return JSON.stringify(filters);
}
