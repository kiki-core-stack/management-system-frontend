<template>
    <Head>
        <Title>安全性</Title>
    </Head>
    <div class="wh-full absolute top-0">
        <div class="wh-full relative top-0 overflow-auto p-4">
            <div class="flex flex-col gap-1 lg:flex-row">
                <profile-security-change-password-form />
                <profile-security-two-factor-authentication-block />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Hooks
onActivated(async () => tabsController.ensure('安全性', window.location.pathname));
</script>
