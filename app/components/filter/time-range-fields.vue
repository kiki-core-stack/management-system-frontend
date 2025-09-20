<template>
    <el-form-item label="開始時間">
        <el-date-picker
            v-model="startAt"
            type="datetime"
            :clearable="false"
            :teleported="false"
        />
    </el-form-item>
    <el-form-item label="結束時間">
        <el-date-picker
            v-model="endAt"
            type="datetime"
            :clearable="false"
            :teleported="false"
        />
    </el-form-item>
</template>

<script lang="ts" setup>
// Define props, models and emits
const endAt = defineModel<Date>('end', { required: true });
const startAt = defineModel<Date>('start', { required: true });
</script>
