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

const { data, status, error } = await RestApi.service.list({ params: { PageIndex: 1, PageSize: 10 } })
console.log(data);
onMounted(() => {
  ////////////////////////////////Breadcrumb
  const settingStore = useSettingStore();
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