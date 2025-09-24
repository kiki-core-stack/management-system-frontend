export function useProfileState() {
    switch (getSystemType()) {
        case 'admin': return useAdminProfileState();
    }
}
