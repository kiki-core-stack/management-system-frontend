import { map } from 'lodash-es';

export interface HeaderTabData {
    title: string;
    url: string;
}

export const headerTabsController = new class HeaderTabsController {
    readonly tabs = reactive<HeaderTabData[]>([]);

    #afterClose() {
        if (window.location.pathname !== '/' && !map(this.tabs, 'url').includes(window.location.pathname)) {
            navigateTo(this.tabs[this.tabs.length - 1]?.url || '/');
        }

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
        if (fromIndex > toIndex) {
            const tempIndex = fromIndex;
            fromIndex = toIndex;
            toIndex = tempIndex;
        }

        if (fromIndex < 0) return;
        this.tabs.splice(fromIndex, toIndex - fromIndex + 1);
        this.#afterClose();
    }

    ensure(title: string, url: string, insertIndex?: number) {
        if (!url.endsWith('/')) url += '/';
        for (const tabData of this.tabs) {
            if (tabData.url === url) {
                navigateTo(url);
                tabData.title = title;
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
            const tabs = enhancedLocalStore.headerTabs.getItem(profileState.value.id!);
            if (!tabs) return;
            tabs.forEach((tabData) => {
                if (tabData.title && tabData.url) this.tabs.push(tabData);
            });
        } catch {
            this.tabs.length = 0;
            this.save();
        }
    }

    save() {
        enhancedLocalStore.headerTabs.setItem(this.tabs, profileState.value.id!);
    }
}();
