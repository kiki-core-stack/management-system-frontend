import type { AdminLogType } from '@kikiutils/kiki-core-stack-pack/constants/admin';

export interface GetAdminLogsFilterQueryFormData extends BaseFilterQueryFormData {
	adminIds: string[];
	types: AdminLogType[];
}
