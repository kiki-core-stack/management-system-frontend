import type { AdminPermissionPattern } from './admin';

export type SidebarMenuItem =
  ({
      basePath: `${string}/`;
      children: SidebarMenuItem[];
      title: string;
  }
  | {
      path: `${string}/`;
      title: string;
  })
  & { requiredPermissions: Arrayable<AdminPermissionPattern> };
