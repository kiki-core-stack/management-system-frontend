import { updateProfileState } from '@/libs/profile';

export default defineNuxtPlugin(async () => {
    const urlPath = useRoute().fullPath;
    const isLoginPage = urlPath.startsWith('/auth/login');
    if ((await updateProfileState()).value.id) {
        if (isLoginPage) assignUrlWithOptionalRedirect(extractFirstValue(useRoute().query.redirect, '/'));
    } else if (!isLoginPage) assignUrlWithOptionalRedirect('/auth/login/', true);
});
