<template>
    <data-table-page
        title="目前登入的裝置"
        :crud-api="profileSecuritySessionApi"
        :disable-row-delete-btn-rule="(row) => row.isCurrent"
        hide-add-data-btn
        hide-created-at-column
        hide-edit-btn
        hide-footer
    >
        <template #table>
            <el-table-column
                label="裝置"
                :formatter="(row) => parseDataToDeviceColumnText(row)"
            />
            <el-table-column
                label="最後活動IP"
                prop="lastActiveIp"
            />
            <el-table-column
                label="最後活動時間"
                :formatter="(row) => formatDate(row.lastActiveAt)"
            />
            <el-table-column
                label="登入IP"
                prop="loginIp"
            />
            <el-table-column
                align="center"
                label="登入時間"
                width="156"
                :formatter="(row) => formatDate(row.createdAt)"
            />
        </template>
    </data-table-page>
</template>

<script lang="ts" setup>
import type { AdminSessionData } from '@kiki-core-stack/pack/types/data/admin';
import { UAParser } from 'ua-parser-js';

import { profileSecuritySessionApi } from '@/apis/profile/security/session';

// Functions
function parseDataToDeviceColumnText(row: AdminSessionData) {
    let columnText = '';
    if (row.isCurrent) columnText += '[當前] ';
    if (!row.userAgent) return columnText += '未知裝置';
    const parseResult = UAParser(row.userAgent);
    const browserName = parseResult.browser.name || '未知瀏覽器';
    const browserVersion = parseResult.browser.version || '未知瀏覽器版本';
    const osName = parseResult.os.name || '未知系統';
    const osVersion = parseResult.os.version || '未知系統版本';
    return columnText += `${browserName} ${browserVersion} on ${osName} ${osVersion}`.trim();
}
</script>
