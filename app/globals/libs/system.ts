// Constants
const systemTypeToHomePathMap: ReadonlyRecord<ManagementSystemType, string> = { admin: '/admin' };

// Functions
export function buildSystemRoute(subPath: string = '') {
    return `${systemTypeToHomePathMap[useSystemType()]}/${subPath.replace(/^\/+/, '')}`;
}

export function getCurrentSystemUserId() {
    switch (useSystemType()) {
        case 'admin': return useAdminProfileState().value.id;
    }
}
