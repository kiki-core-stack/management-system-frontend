export function initializeAppSession() {
    switch (getSystemType()) {
        case 'admin':
            if (!useAdminProfileState().value.id) return;
    }

    headerTabsController.load();
}
