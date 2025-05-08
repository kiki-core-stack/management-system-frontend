<template>
    <el-form-item>
        <template #label>
            <slot name="label" />
        </template>
        <el-input
            ref="elInputRef"
            v-model="modelValue"
            :="inputAttrs"
        />
    </el-form-item>
</template>

<script lang="ts" setup>
// Define props, models and emits
const modelValue = defineModel<string>();

// Variables
const attrs: Record<string, unknown> = useAttrs();
const elInputRef = ref<ElInputRef>(null);

// Computed properties
// eslint-disable-next-line unused-imports/no-unused-vars
const inputAttrs = computed(() => {
    const {
        class: _class,
        label,
        prop,
        rules,
        ...otherAttrs
    } = attrs;
    return otherAttrs;
});

// Exposes
defineExpose({ focus: () => elInputRef.value?.focus() });
</script>
