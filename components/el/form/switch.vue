<template>
    <el-form-item>
        <template #label>
            <slot name="label" />
        </template>
        <el-switch
            v-model="switchValue"
            :="switchAttrs"
        />
    </el-form-item>
</template>

<script lang="ts" setup>
interface Props {
    modelValue: boolean;
}

// Emits and props
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

// Variables
const attrs: Record<string, unknown> = useAttrs();
const switchValue = ref(props.modelValue);

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

// Watches
watch(() => switchValue.value, (nv) => emit('update:modelValue', nv));
watch(() => props.modelValue, (nv) => switchValue.value = nv);
</script>
