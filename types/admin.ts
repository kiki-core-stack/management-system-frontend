import type { AdminData } from '@kikiutils/kiki-core-stack-pack/types/data/admin';

export type ChangeAdminStatusField = BooleanPropertyName<AdminData> | 'twoFactorAuthenticationStatus.emailOtp' | 'twoFactorAuthenticationStatus.totp';
