<template>
  <div class="bg-white">
    <h1>Welcome to My Nuxt 3 App</h1>
    <p>This is a simple example of a Nuxt 3 application.</p>
    {{ data }}
    <nuxt />
  </div>
</template>
<script setup>
const { RestApi } = useApi();
const data = await RestApi.test.get()
const nuxtApp = useNuxtApp();
const t = nuxtApp.$i18n.t;
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