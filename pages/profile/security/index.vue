<template>
    <div class="h-full overflow-auto p-4">
        <profile-security-change-password-form />
    </div>
</template>

<script lang="ts" setup>
useHead({ title: '安全性' });

// Hooks
onActivated(async () => tabsController.ensure('安全性', window.location.pathname));
</script>
