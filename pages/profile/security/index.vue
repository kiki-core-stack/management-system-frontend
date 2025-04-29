<template>
    <div class="h-full overflow-auto p-4">
        <Head>
            <Title>安全性</Title>
        </Head>
        <profile-security-change-password-form />
    </div>
</template>

<script lang="ts" setup>
// Hooks
onActivated(() => headerTabsController.ensure('安全性', window.location.pathname));
</script>
