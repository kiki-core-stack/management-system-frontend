import { updateAdminProfileState } from './admin';

export function updateProfileState() {
    switch (getSystemType()) {
        case 'admin': return updateAdminProfileState();
    }
}
