<template>
	<el-select :teleported="false" clearable>
		<el-option
			:key="adminLogType"
			:label="adminLogTypeToTextMap[adminLogType as AdminLogType]"
			:value="adminLogType"
			v-for="adminLogType in getEnumNumberValues(AdminLogType)"
		/>
	</el-select>
</template>

<script lang="ts" setup>
import { AdminLogType, adminLogTypeToTextMap } from '@kikiutils/kiki-core-stack-pack/constants/admin';
</script>
