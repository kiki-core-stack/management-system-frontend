import { getManagementSystemTypeFromRoutePath } from '@kiki-core-stack/pack/libs/management-system';

export default defineNuxtPlugin(() => {
    const systemType = getManagementSystemTypeFromRoutePath(useRoute().fullPath);
    if (!systemType) throw createError({ statusCode: 404 });
    return { provide: { systemType } };
});
