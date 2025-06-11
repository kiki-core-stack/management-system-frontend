export type SidebarMenuItem =
  | {
      basePath: `${string}/`;
      children: SidebarMenuItem[];
      title: string;
  }
  | {
      path: `${string}/`;
      title: string;
  };
