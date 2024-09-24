<template>
	<el-form-item>
		<template #label>
			<slot name="label"></slot>
		</template>
		<el-switch :="switchAttrs" v-model="switchValue" />
	</el-form-item>
</template>

<script lang="ts" setup>
interface Props {
	modelValue: boolean;
}

// Emits and props
const emit = defineEmits(['update:modelValue']);
const props = defineProps<Props>();

// Variables
const attrs = useAttrs();
const switchValue = ref(props.modelValue);

// Computed properties
const switchAttrs = computed(() => {
	const { class: _class, label, prop, ...otherAttrs } = attrs;
	return otherAttrs;
});

// Watches
watch(
	() => switchValue.value,
	(nv) => emit('update:modelValue', nv)
);

watch(
	() => props.modelValue,
	(nv) => (switchValue.value = nv)
);
</script>
