<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to the dashboard!</p>
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();
const { RestApi } = useApi();
const t = nuxtApp.$i18n.t;
const settingStore = useSettingStore();


onMounted(async () => {
  ////////////////////////////////Breadcrumb
  const { data: data_menu, status } = await RestApi.menu_backend.menu_by_user();
  if (status.value === "success") {
    settingStore.setMenu(data_menu.value.menu);
  }
  const tempBreadcrumb = computed(() => {
    return [
      { url: "/dashboard", title: t("dashboard") },
      { url: "/dashboard", title: t("dashboard") },
    ];
  });
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>