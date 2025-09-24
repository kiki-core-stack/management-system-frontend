export interface HeaderTabData {
    title: string;
    url: string;
}

export const headerTabsController = new class HeaderTabsController {
    readonly tabs = reactive<HeaderTabData[]>([]);

    // Private methods
    #afterClose() {
        if (
            window.location.pathname !== buildSystemRoute()
            && !this.tabs.map((tab) => tab.url).includes(window.location.pathname)
        ) navigateTo(this.tabs[this.tabs.length - 1]?.url || buildSystemRoute());

        this.save();
    }

    // Public methods
    close(index: number) {
        this.tabs.splice(index, 1);
        this.#afterClose();
    }

    closeAll() {
        this.tabs.length = 0;
        this.#afterClose();
    }

    closeByUrl(url: string = window.location.pathname) {
        if (!url.endsWith('/')) url += '/';
        const index = this.tabs.findIndex((tabData) => tabData.url === url);
        if (index === -1) return;
        this.close(index);
    }

    closeByUrlAfter(delayMs: number, url: string = window.location.pathname) {
        setTimeout(() => this.closeByUrl(url), delayMs);
    }

    closeFromIndexTo(fromIndex: number, toIndex: number) {
        if (fromIndex > toIndex) {
            const tempIndex = fromIndex;
            fromIndex = toIndex;
            toIndex = tempIndex;
        }

        if (fromIndex < 0) return;
        this.tabs.splice(fromIndex, toIndex - fromIndex + 1);
        this.#afterClose();
    }

    ensure(title: string, url: string = window.location.pathname, insertIndex?: number) {
        if (!url.endsWith('/')) url += '/';
        for (const tabData of this.tabs) {
            if (tabData.url === url) {
                navigateTo(url);
                tabData.title = title;
                this.save();
                return;
            }
        }

        this.tabs.splice(
            insertIndex || this.tabs.length,
            0,
            {
                title,
                url,
            },
        );

        this.save();
    }

    load() {
        try {
            const tabs = enhancedLocalStore.headerTabs.getItem(getCurrentSystemUserId());
            tabs?.forEach((tabData) => {
                if (tabData.title && tabData.url) this.tabs.push(tabData);
            });
        } catch {
            this.tabs.length = 0;
            this.save();
        }
    }

    save() {
        enhancedLocalStore.headerTabs.setItem(this.tabs, getCurrentSystemUserId());
    }
}();
