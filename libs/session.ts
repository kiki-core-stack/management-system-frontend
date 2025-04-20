export function initializeAppSession() {
    if (!profileState.value.id) return;
    headerTabsController.load();
}
