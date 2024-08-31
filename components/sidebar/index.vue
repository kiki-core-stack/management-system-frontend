<template>
	<el-menu
		class="md:block h-full sidebar"
		:class="{ hidden: !isDrawer }"
		background-color="#252828"
		text-color="#ffffff"
		:default-active="route.path"
		router
	>
		<el-scrollbar>
			<component
				:index="menuItemGroup[0]"
				:is="menuItemGroup[2] ? ElSubMenu : ElMenuItem"
				@click="() => !menuItemGroup[2] && (mainState.isSidebarShow = false)"
				v-for="menuItemGroup in menuItemGroups"
			>
				<template #title>
					<span>{{ menuItemGroup[1] }}</span>
				</template>
				<div v-if="menuItemGroup[2]">
					<sidebar-menu-item
						:index="item[0]"
						:text="item[1]"
						@click="mainState.isSidebarShow = false"
						v-for="item in menuItemGroup[2]"
					/>
				</div>
			</component>
		</el-scrollbar>
	</el-menu>
</template>

<script lang="ts" setup>
// prettier-multiline-arrays-set-threshold: 10

import { ElMenuItem, ElSubMenu } from 'element-plus';

type MenuItem = readonly [url: string, title: string];
type MenuItemGroup = readonly [baseUrl: string, title: string, items?: readonly MenuItem[]];

// Props and emits
defineProps<{ isDrawer?: boolean }>();

// Variables
const menuItemGroups: readonly MenuItemGroup[] = [
	['/', '首頁'],
	[
		'/admin',
		'管理員',
		[
			['/admin', '管理員管理'],
			['/admin/log', '日誌']
		]
	],
	['/profile', '個人設置', [['/profile/security', '安全設置']]]
] as const;

const route = useRoute();
</script>

<style lang="scss" scoped>
.sidebar {
	letter-spacing: 2px;
	padding: 48px 0;
	width: 200px;
}
</style>
