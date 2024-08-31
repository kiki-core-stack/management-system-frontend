<template>
	<div
		class="absolute top-0 left-0 wh-full flex-middle bg-white dark:bg-dark z-10000 opacity-85"
		v-if="state?.loading || success || error"
	>
		<div class="text-center">
			<icon-xmark class="text-#dc3545 text-2.5rem" v-if="state?.error || error" />
			<icon-check class="text-#198754 text-2.5rem" v-else-if="state?.success || success" />
			<loading-spinner size="2rem" v-else />
			<p class="mt-4 fs-20px" v-if="!hideText">{{ stateText }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface Props {
	error?: boolean;
	errorText?: string;
	hideText?: boolean;
	loadingText?: string;
	state?: ReturnType<typeof createLoadingState>['state'];
	success?: boolean;
	successText?: string;
}

// Emits and props
const props = withDefaults(defineProps<Props>(), {
	errorText: '載入失敗！',
	loadingText: '載入中...',
	successText: '載入成功！'
});

// Computed properties
const stateText = computed(() => {
	if (props.error || props.state?.error) return props.errorText;
	if (props.state?.success || props.success) return props.successText;
	return props.loadingText;
});
</script>
