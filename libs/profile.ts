export async function updateProfileState() {
    const response = await useProfileApi().get();
    Object.assign(profileState.value, response?.data.data);
    return profileState;
}
