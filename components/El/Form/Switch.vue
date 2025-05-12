<template>
    <el-form-item>
        <template #label>
            <slot name="label" />
        </template>
        <el-switch
            v-model="modelValue"
            :disabled="disabled"
        />
    </el-form-item>
</template>

<script lang="ts" setup>
interface Props {
    disabled?: boolean;
}

// Define props, models and emits
defineProps<Props>();
const modelValue = defineModel<boolean>({ required: true });
</script>
