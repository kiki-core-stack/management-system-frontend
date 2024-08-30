<template>
	<div class="fixed top-0 left-0 wh-full bg-color-f5f5f5 dark:bg-color-2c2c2c overflow-auto">
		<div class="min-h-100svh p-4 flex flex-col items-center">
			<div
				id="middle-block"
				class="relative my-auto p-4 flex flex-col items-center bg-white dark:bg-dark overflow-auto rounded-10px text-center"
			>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#middle-block {
	box-shadow: 1px 2px 12px 0px rgba(black, 0.25);
}
</style>
