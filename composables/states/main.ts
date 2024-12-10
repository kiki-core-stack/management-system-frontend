// prettier-multiline-arrays-set-threshold: 10

type SidebarMenuItem = readonly [url: string, title: string];
type SidebarMenuItemGroup = readonly [baseURL: string, title: string, items?: readonly SidebarMenuItem[]];

export interface MainState {
	sidebar: {
		menuItemGroups: readonly SidebarMenuItemGroup[];
		isShow: boolean;
	};
}

export const mainState = reactive<MainState>({
	sidebar: {
		menuItemGroups: [
			['/', '首頁'],
			[
				'/system',
				'系統',
				[
					['/system/admin', '管理員管理'],
					['/system/admin/log', '管理員日誌']
				]
			],
			['/profile', '個人', [['/profile/security', '安全性']]]
		],
		isShow: false
	}
});
