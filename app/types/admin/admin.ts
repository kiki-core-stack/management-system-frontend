import type { AdminLogType } from '@kiki-core-stack/pack/constants/admin';

import type {
    AdminPermission,
    AdminPermissionGroup,
} from '@/generated/static/types/admin/permission';

export type AdminPermissionPattern =
  | 'ignore'
  | `!${AdminPermissionGroup}.*`
  | `!${AdminPermission}`
  | `${AdminPermissionGroup}.*`
  | AdminPermission
  | (string & {});

export interface GetAdminLogListFilter {
    adminObjectId: { $in: string[] };
    createdAt: { $gte: Date; $lt: Date };
    type: { $in: AdminLogType[] };
}
