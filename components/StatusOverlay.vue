<template>
    <div>
        <div
            v-if="status"
            class="dark:bg-dark flex-middle wh-full z-10000 absolute left-0 top-0 bg-white opacity-85"
        >
            <div class="text-center">
                <icon-xmark
                    v-if="status === 'error'"
                    class="text-#dc3545 text-2.5rem"
                />
                <icon-check
                    v-else-if="status === 'success'"
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
                    {{ statusText }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
type Status = Nullable<'error' | 'loading' | 'success'>;

interface Props {
    errorText?: string;
    hideText?: boolean;
    loadingText?: string;
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

// Variables
const hideTimer = ref<Nullable<NodeJS.Timeout>>(null);
const status = ref<Status>(null);
const statusText = ref('');

// Functions
function show(stateType: Status, text: string, duration: false | number) {
    status.value = stateType;
    statusText.value = text;
    if (duration === false) return;
    clearTimeoutRef(hideTimer);
    hideTimer.value = setTimeout(() => status.value = null, duration);
}

// Exposes
defineExpose({
    hide() {
        status.value = null;
    },
    get isVisible() {
        return status.value !== null;
    },
    showError: (text?: string, duration: false | number = 1000) => show('error', text || props.errorText, duration),
    showLoading: (text?: string) => show('loading', text || props.loadingText, false),
    showSuccess(text?: string, duration: false | number = 1000) {
        show('success', text || props.successText, duration);
    },
});
</script>
