import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';

export interface ProfileState extends Pick<AdminData, 'twoFactorAuthenticationStatus'> {
    autoUpdateTwoFactorAuthenticationStatus: boolean;
    id?: string;
}

export const profileState = reactive<ProfileState>({
    autoUpdateTwoFactorAuthenticationStatus: true,
    twoFactorAuthenticationStatus: {
        emailOtp: false,
        totp: false,
    },
});
