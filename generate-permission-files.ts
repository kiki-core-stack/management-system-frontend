import { join } from 'node:path';

// eslint-disable-next-line style/max-len
import { writeManagementSystemPermissionTypesFile } from '@kiki-core-stack/pack/libs/management-system/permission-types-file';
import type { ManagementSystemType } from '@kiki-core-stack/pack/types';
import { config } from 'dotenv';

const { parsed: env } = config({ path: './.env.development.local' });
if (!env) throw new Error('No env file found');

const baseGeneratedStaticTypesDirPath = join(import.meta.dirname, 'app/generated/static/types');
const managementSystemTypes: ManagementSystemType[] = ['admin'];
await Promise.all(
    managementSystemTypes.map(async (managementSystemType) => {
        const response = await fetch(`${env.API_BASE_URL}/api/${managementSystemType}/admin/permission/list`);
        const responseData = await response.json();
        if (!responseData.success) throw new Error(`Failed to get ${managementSystemType} admin permission list`);
        await writeManagementSystemPermissionTypesFile(
            managementSystemType,
            responseData.data,
            join(baseGeneratedStaticTypesDirPath, managementSystemType, 'permission.ts'),
        );
    }),
);
