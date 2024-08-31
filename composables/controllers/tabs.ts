interface TabData {
	title: string;
	url: string;
}

export const tabsController = new (class TabsController {
	readonly tabs: TabData[] = reactive([]);

	closeTab(index: number) {
		const urlIsToCloseTab = this.tabs[index]?.url === window.location.pathname;
		this.tabs.splice(index, 1);
		if (urlIsToCloseTab) navigateTo(this.tabs.at(-1)?.url || '/');
		this.save();
	}

	ensureTab(title: string, url: string, insertIndex?: number) {
		for (const tabData of this.tabs) if (tabData.url === url) return (tabData.title = title) && navigateTo(url);
		this.tabs.splice(insertIndex || this.tabs.length, 0, { title, url });
		this.save();
	}

	load() {
		try {
			const tabs: TabData[] = JSON.parse(window.localStorage.getItem('tabs') || '[]');
			tabs.forEach((tabData) => {
				if (!tabData.title || !tabData.url) throw new Error();
				this.tabs.push(tabData);
			});
		} catch {
			this.tabs.length = 0;
		}
	}

	save() {
		window.localStorage.setItem('tabs', JSON.stringify(this.tabs));
	}
})();
