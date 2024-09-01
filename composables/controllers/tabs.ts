import { map } from 'lodash-es';

interface TabData {
	title: string;
	url: string;
}

export const tabsController = new (class TabsController {
	readonly tabs: TabData[] = reactive([]);

	#afterClose() {
		if (!map(this.tabs, 'url').includes(window.location.pathname)) navigateTo(this.tabs.at(-1)?.url || '/');
		this.save();
	}

	close(index: number) {
		this.tabs.splice(index, 1);
		this.#afterClose();
	}

	closeAll() {
		this.tabs.length = 0;
		this.#afterClose();
	}

	closeFromIndexTo(fromIndex: number, toIndex: number) {
		if (fromIndex > toIndex) [fromIndex, toIndex] = [toIndex, fromIndex];
		if (fromIndex < 0) return;
		this.tabs.splice(fromIndex, toIndex - fromIndex + 1);
		this.#afterClose();
	}

	ensure(title: string, url: string, insertIndex?: number) {
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
