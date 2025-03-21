import { profileApi } from '@/apis/profile';

export async function updateProfileState() {
    const response = await profileApi.get();
    Object.assign(profileState, response?.data.data);
    Object.assign(profileState.twoFactorAuthenticationStatus, response?.data.data?.twoFactorAuthenticationStatus);
    return profileState;
}
