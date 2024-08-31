import type { AdminLogType } from '@kikiutils/el-plus-admin-pack/constants/admin';

export interface GetAdminLogsFilterQueryFormData extends BaseFilterQueryFormData {
	adminIds: string[];
	types: AdminLogType[];
}
