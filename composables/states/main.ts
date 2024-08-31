export interface MainState {
	isSidebarShow: boolean;
}

export const mainState = reactive<MainState>({ isSidebarShow: false });
