export function useSidebarState() {
    switch (getSystemType()) {
        case 'admin': return useAdminSidebarState();
    }
}
