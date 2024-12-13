export function init() {
    if (!adminInfoState.id) return;
    tabsController.load();
}

export default defineNuxtPlugin(() => init());
