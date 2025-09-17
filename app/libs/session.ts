export function initializeAppSession() {
    switch (useSystemType()) {
        case 'admin':
            if (!useAdminProfileState().value.id) return;
    }

    headerTabsController.load();
}
