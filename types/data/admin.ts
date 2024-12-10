import type { AdminLogType } from '@kiki-core-stack/pack/constants/admin';

export interface GetAdminLogsFilterQueryFormData extends BaseFilterQueryFormData {
	adminIds: string[];
	types: AdminLogType[];
}
