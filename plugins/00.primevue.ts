import Column from 'primevue/column';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('PColumn', Column);
});
