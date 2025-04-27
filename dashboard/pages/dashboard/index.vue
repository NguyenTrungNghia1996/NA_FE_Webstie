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

const { data: data_menu, status } = await RestApi.menu_backend.list_full_detail({
      body: JSON.stringify({
        pageIndex: "1",
        pageSize: "100",
      }),
    });
    if (status.value === "success") {
      settingStore.setMenu(data_menu.value.menu);
    }
onMounted(() => {
  ////////////////////////////////Breadcrumb
 
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