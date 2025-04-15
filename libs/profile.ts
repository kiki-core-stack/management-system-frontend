import { profileApi } from '@/libs/apis/profile';

export async function updateProfileState() {
    const response = await profileApi.get();
    Object.assign(profileState.value, response?.data.data);
    return profileState;
}
