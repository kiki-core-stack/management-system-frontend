import type { SidebarMenuItem } from '@/types/sidebar';

interface SidebarState {
    isShow: boolean;
    menuItems: SidebarMenuItem[];
}

export function useSidebarState() {
    return useState<SidebarState>(
        'sidebar',
        () => ({
            isShow: false,
            menuItems: [
                {
                    path: '/',
                    title: '首頁',
                },
                {
                    basePath: '/system/',
                    children: [
                        {
                            path: '/system/admin/',
                            title: '管理員管理',
                        },
                        {
                            path: '/system/admin/log/',
                            title: '管理員日誌',
                        },
                    ],
                    title: '系統',
                },
                {
                    basePath: '/profile/',
                    children: [
                        {
                            basePath: '/profile/security/',
                            children: [
                                {
                                    path: '/profile/security/',
                                    title: '一般',
                                },
                                {
                                    path: '/profile/security/session/',
                                    title: '登入裝置',
                                },
                            ],
                            title: '安全性',
                        },
                    ],
                    title: '個人',
                },
            ],
        }),
    );
}
