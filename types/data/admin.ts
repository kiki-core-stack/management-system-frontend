import type { AdminData } from '@kiki-core-stack/pack/types/data/admin';

export interface AdminFormData extends AdminData {
    confirmPassword: string;
}
