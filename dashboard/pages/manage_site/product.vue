<template>
  <div class="bg-white min-h-full">
    product
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();
const t = nuxtApp.$i18n.t;
onMounted(() => {
  ////////////////////////////////Breadcrumb
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => {
    return [
      { url: "/manage_site", title: "Quản lý site" },
      { url: "/manage_site/product", title: "Quản lý sản phẩm" },
    ];
  });
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>