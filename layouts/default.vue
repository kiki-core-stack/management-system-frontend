<template>
	<div class="fixed wh-full mt-0 p-0 flex bg-color-f5f5f5 dark:bg-color-2c2c2c color-mode-transition">
		<sidebar />
		<el-drawer direction="ltr" size="200" :with-header="false" v-model="mainState.sidebar.isShow">
			<sidebar is-drawer />
		</el-drawer>
		<div class="relative grow">
			<div class="absolute wh-full flex flex-col">
				<Header />
				<header-tabs />
				<div class="relative grow">
					<div class="absolute wh-full overflow-auto">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
	padding: 0 !important;
}
</style>
