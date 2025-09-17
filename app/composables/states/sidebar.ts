export function useSidebarState() {
    switch (useSystemType()) {
        case 'admin': return useAdminSidebarState();
    }
}
