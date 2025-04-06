import { updateProfileState } from '@/libs/profile';

export default defineNuxtPlugin(async () => {
    const urlPath = useRoute().fullPath;
    const isLoginPage = urlPath.startsWith('/login');
    if ((await updateProfileState()).value.id) {
        if (isLoginPage) assignUrlWithOptionalRedirect(extractFirstValue(useRoute().query.redirect, '/'));
    } else if (!isLoginPage) assignUrlWithOptionalRedirect('/login/', true);
});
