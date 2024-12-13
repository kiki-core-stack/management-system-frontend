export default defineNuxtPlugin(async () => {
    const urlPath = useRoute().fullPath;
    const isLoginPage = urlPath.startsWith('/login');
    if ((await updateAdminInfoState()).id) {
        if (isLoginPage) assignToURLOrNavigateTo(flattenToSingleValue(useRoute().query.redirect, '/'));
    } else if (!isLoginPage) assignToURLOrNavigateTo('/login', true);
});
