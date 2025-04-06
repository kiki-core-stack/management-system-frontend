export function init() {
    if (!profileState.value.id) return;
    tabsController.load();
}

export default defineNuxtPlugin(() => init());
