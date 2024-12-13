<template>
    <el-form-item>
        <template #label>
            <slot name="label" />
        </template>
        <el-input
            ref="elInputRef"
            v-model="inputValue"
            :="inputAttrs"
        >
            <template
                v-if="enablePrependSlot"
                #prepend
            >
                <slot name="prepend" />
            </template>
            <template
                v-if="enableAppendSlot || enableCopyBtn"
                #append
            >
                <slot name="append" />
                <el-button
                    v-if="enableCopyBtn"
                    @click="copyTextToClipboardAndShowMessage(inputValue)"
                >
                    <i class="fa-solid fa-copy" />
                </el-button>
            </template>
        </el-input>
    </el-form-item>
</template>

<script lang="ts" setup>
interface Props {
    enableAppendSlot?: boolean;
    enableCopyBtn?: boolean;
    enablePrependSlot?: boolean;
    modelValue: string;
}

// Emits and props
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

// Variables
const attrs = useAttrs();
const elInputRef = ref<ElInputRef>(null);
const inputValue = ref(props.modelValue);

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

// Watches
watch(() => inputValue.value, (nv) => emit('update:modelValue', nv));
watch(() => props.modelValue, (nv) => inputValue.value = nv);

// Exposes
defineExpose({ focus: () => elInputRef.value?.focus() });
</script>
