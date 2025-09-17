export default defineNuxtPlugin((nuxtApp) => {
    let systemType: ManagementSystemType | undefined;
    const urlPath = useRoute().fullPath;
    if (urlPath.startsWith('/admin')) systemType = 'admin';
    else throw createError({ statusCode: 404 });
    nuxtApp.provide('systemType', systemType);
});
