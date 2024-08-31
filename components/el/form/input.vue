<template>
	<el-form-item>
		<template #label>
			<slot name="label"></slot>
		</template>
		<el-input ref="elInputRef" :="inputAttrs" v-model="inputValue">
			<template #prepend v-if="enablePrependSlot">
				<slot name="prepend"></slot>
			</template>
			<template #append v-if="enableAppendSlot || enableCopyBtn">
				<slot name="append"></slot>
				<el-button @click="copyTextToClipboardAndShowMessage(inputValue)" v-if="enableCopyBtn">
					<i class="fa-solid fa-copy"></i>
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
const emit = defineEmits(['update:modelValue']);
const props = defineProps<Props>();

// Variables
const attrs = useAttrs();
const elInputRef = ref<ElInputRef>(null);
const inputValue = ref(props.modelValue);

// Computed properties
const inputAttrs = computed(() => {
	const { class: _class, label, prop, rules, ...otherAttrs } = attrs;
	return otherAttrs;
});

// Watches
watch(
	() => inputValue.value,
	(nv) => emit('update:modelValue', nv)
);

watch(
	() => props.modelValue,
	(nv) => (inputValue.value = nv)
);

// Exposes
defineExpose({ focus: () => elInputRef.value?.focus() });
</script>
