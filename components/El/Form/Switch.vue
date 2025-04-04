<template>
    <el-form-item>
        <template #label>
            <slot name="label" />
        </template>
        <el-switch
            v-model="modelValue"
            :="switchAttrs"
        />
    </el-form-item>
</template>

<script lang="ts" setup>
// Define props, models and emits
const modelValue = defineModel<boolean>({ required: true });

// Variables
const attrs: Record<string, unknown> = useAttrs();

// Computed properties
// eslint-disable-next-line unused-imports/no-unused-vars
const switchAttrs = computed(() => {
    const {
        class: _class,
        label,
        prop,
        ...otherAttrs
    } = attrs;
    return otherAttrs;
});
</script>
