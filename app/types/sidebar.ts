import type { ManagementSystemType } from '@kiki-core-stack/pack/types';
import type { Arrayable } from 'type-fest';

import type { ManagementSystemTypeToPermissionPatternMap } from './permission';

export type SidebarMenuItem<T extends ManagementSystemType | undefined = undefined> =
  ({
      basePath: `${string}/`;
      children: SidebarMenuItem<T>[];
      title: string;
  }
  | {
      path: `${string}/`;
      title: string;
  })
  & {
      requiredPermissions: Arrayable<
          T extends undefined ? never : ManagementSystemTypeToPermissionPatternMap[NonNullable<T>]
      >;
  };
