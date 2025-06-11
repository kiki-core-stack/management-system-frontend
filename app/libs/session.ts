export function initializeAppSession() {
    if (!useProfileState().value.id) return;
    headerTabsController.load();
}
