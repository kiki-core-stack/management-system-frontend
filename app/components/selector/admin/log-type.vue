<template>
    <el-select
        :teleported="false"
        clearable
    >
        <el-option
            v-for="adminLogType in getEnumNumberValues(AdminLogType)"
            :key="adminLogType"
            :label="adminLogTypeToTextMap[adminLogType as AdminLogType]"
            :value="adminLogType"
        />
    </el-select>
</template>

<script lang="ts" setup>
import {
    AdminLogType,
    adminLogTypeToTextMap,
} from '@kiki-core-stack/pack/constants/admin';
</script>
