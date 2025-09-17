export async function updateAdminProfileState() {
    const response = await AdminApis.Profile.use().get();
    const profileState = useAdminProfileState();
    Object.assign(profileState.value, response?.data?.data);
    return profileState;
}
