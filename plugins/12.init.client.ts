export function init() {
    if (!profileState.id) return;
    tabsController.load();
}

export default defineNuxtPlugin(() => init());
