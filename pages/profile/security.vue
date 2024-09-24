<template>
	<Head>
		<Title>安全設置</Title>
	</Head>
	<div class="absolute top-0 wh-full">
		<div class="relative top-0 wh-full p-4 overflow-auto">
			<div class="flex flex-col lg:flex-row gap-1">
				<profile-security-change-password-form />
				<profile-security-two-factor-authentication-block />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
// Hooks
onActivated(async () => tabsController.ensure('安全設置', window.location.pathname));
</script>
