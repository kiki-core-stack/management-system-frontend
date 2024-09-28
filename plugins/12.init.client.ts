export default defineNuxtPlugin(() => {
	if (!adminInfoState.id) return;
	tabsController.load();
});
