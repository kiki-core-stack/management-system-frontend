// prettier-multiline-arrays-set-threshold: 10

type SidebarMenuItem = readonly [url: string, title: string];
type SidebarMenuItemGroup = readonly [baseUrl: string, title: string, items?: readonly SidebarMenuItem[]];

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
				'/admin',
				'管理員',
				[
					['/admin', '管理員管理'],
					['/admin/log', '日誌']
				]
			],
			['/profile', '個人設置', [['/profile/security', '安全設置']]]
		],
		isShow: false
	}
});
