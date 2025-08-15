import { join } from 'node:path';

import { writeAdminPermissionTypesFile } from '@kiki-core-stack/pack/libs/admin';
import { config } from 'dotenv';

const { parsed: env } = config({ path: './.env.development.local' });
if (!env) throw new Error('No env file found');
const response = await fetch(`${env.API_BASE_URL}/api/admin/permission/list`);
const responseData = await response.json();
if (!responseData.success) throw new Error('Failed to get permission list');
await writeAdminPermissionTypesFile(
    responseData.data,
    join(
        import.meta.dirname,
        'app',
        'generated',
        'static',
        'types',
        'admin',
        'permission.ts',
    ),
);
