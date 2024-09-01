import type { AdminData } from '@kikiutils/kiki-core-stack-pack/types/data/admin';

export interface AccountState extends Pick<AdminData, 'twoFactorAuthenticationStatus'> {
	autoUpdateTwoFactorAuthenticationStatus: boolean;
}

export const accountState = reactive<AccountState>({
	autoUpdateTwoFactorAuthenticationStatus: true,
	twoFactorAuthenticationStatus: { emailOtp: false, totp: false }
});
