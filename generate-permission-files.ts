import { join } from 'node:path';

// eslint-disable-next-line style/max-len
import { writeManagementSystemPermissionTypesFile } from '@kiki-core-stack/pack/libs/management-system/permission-types-file';
import type { ManagementSystemType } from '@kiki-core-stack/pack/types';
import { checkAndGetEnvValue } from '@kikiutils/shared/env';

const apiBaseUrl = checkAndGetEnvValue('API_BASE_URL');
const baseGeneratedStaticTypesDirPath = join(import.meta.dirname, 'app/generated/static/types');
const managementSystemTypes: ManagementSystemType[] = ['admin'];
await Promise.all(
    managementSystemTypes.map(async (managementSystemType) => {
        const response = await fetch(`${apiBaseUrl}/api/${managementSystemType}/admin/permission/list`);
        const responseData = await response.json();
        if (!responseData.success) throw new Error(`Failed to get ${managementSystemType} admin permission list`);
        await writeManagementSystemPermissionTypesFile(
            managementSystemType,
            responseData.data,
            join(baseGeneratedStaticTypesDirPath, managementSystemType, 'permission.ts'),
        );
    }),
);
