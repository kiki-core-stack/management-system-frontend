type SidebarMenuItem = readonly [url: string, title: string];
type SidebarMenuItemGroup = readonly [baseUrl: string, title: string, items?: readonly SidebarMenuItem[]];

export interface MainState {
    isPageLoading: boolean;
    sidebar: {
        isShow: boolean;
        menuItemGroups: readonly SidebarMenuItemGroup[];
    };
}

export const mainState = reactive<MainState>({
    isPageLoading: false,
    sidebar: {
        isShow: false,
        menuItemGroups: [
            [
                '/',
                '首頁',
            ],
            [
                '/system',
                '系統',
                [
                    [
                        '/system/admin',
                        '管理員管理',
                    ],
                    [
                        '/system/admin/log',
                        '管理員日誌',
                    ],
                ],
            ],
        ],
    },
});
