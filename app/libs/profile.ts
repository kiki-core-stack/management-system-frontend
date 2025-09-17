import { updateAdminProfileState } from './admin';

export function updateProfileState() {
    switch (useSystemType()) {
        case 'admin': return updateAdminProfileState();
    }
}
