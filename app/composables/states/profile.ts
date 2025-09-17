export function useProfileState() {
    switch (useSystemType()) {
        case 'admin': return useAdminProfileState();
    }
}
