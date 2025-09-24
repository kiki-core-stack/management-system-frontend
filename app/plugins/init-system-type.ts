import type { ManagementSystemType } from '@kiki-core-stack/pack/types';

export default defineNuxtPlugin(() => {
    let systemType: ManagementSystemType | undefined;
    const urlPath = useRoute().fullPath;
    if (urlPath.startsWith('/admin')) systemType = 'admin';
    else throw createError({ statusCode: 404 });
    return { provide: { systemType } };
});
