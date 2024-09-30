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
				@click="() => !menuItemGroup[2] && (mainState.sidebar.isShow = false)"
				v-for="menuItemGroup in mainState.sidebar.menuItemGroups"
			>
				<template #title>
					<span>{{ menuItemGroup[1] }}</span>
				</template>
				<div v-if="menuItemGroup[2]">
					<sidebar-menu-item
						:index="item[0]"
						:text="item[1]"
						@click="mainState.sidebar.isShow = false"
						v-for="item in menuItemGroup[2]"
					/>
				</div>
			</component>
		</el-scrollbar>
	</el-menu>
</template>

<script lang="ts" setup>
import { ElMenuItem, ElSubMenu } from 'element-plus';

// Props and emits
defineProps<{ isDrawer?: boolean }>();

const route = useRoute();
</script>

<style lang="scss" scoped>
.sidebar {
	letter-spacing: 2px;
	padding: 48px 0;
	width: 200px;
}
</style>
