import type { AdminData } from '@kikiutils/el-plus-admin-pack/types/data/admin';

export type ChangeAdminStatusField = BooleanPropertyName<AdminData> | 'twoFactorAuthenticationStatus.emailOtp' | 'twoFactorAuthenticationStatus.totp';
