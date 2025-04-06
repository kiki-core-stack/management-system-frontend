export function initializeAppSession() {
    if (!profileState.value.id) return;
    tabsController.load();
}
