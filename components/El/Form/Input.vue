<template>
    <el-form-item>
        <template #label>
            <slot name="label" />
        </template>
        <el-input
            ref="elInputRef"
            v-model="modelValue"
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
                    @click="copyTextToClipboardAndShowMessage(modelValue)"
                >
                    <i class="fa-copy fa-solid" />
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
}

// Define props, models and emits
defineProps<Props>();
const modelValue = defineModel<string>({ required: true });

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
