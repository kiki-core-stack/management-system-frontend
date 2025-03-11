<template>
    <div
        v-if="state?.loading || success || error"
        class="dark:bg-dark flex-middle wh-full z-10000 absolute left-0 top-0 bg-white opacity-85"
    >
        <div class="text-center">
            <icon-xmark
                v-if="state?.error || error"
                class="text-#dc3545 text-2.5rem"
            />
            <icon-check
                v-else-if="state?.success || success"
                class="text-#198754 text-2.5rem"
            />
            <loading-spinner
                v-else
                size="2rem"
            />
            <p
                v-if="!hideText"
                class="fs-20px mt-4"
            >
                {{ stateText }}
            </p>
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

// Define props, models and emits
const props = withDefaults(
    defineProps<Props>(),
    {
        errorText: '載入失敗！',
        loadingText: '載入中...',
        successText: '載入成功！',
    },
);

// Computed properties
const stateText = computed(() => {
    if (props.error || props.state?.error) return props.errorText;
    if (props.state?.success || props.success) return props.successText;
    return props.loadingText;
});
</script>
