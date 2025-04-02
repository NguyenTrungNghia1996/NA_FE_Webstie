<template>
  <NuxtLayout>
    <a-config-provider :locale="locale">
      <NuxtPage />
    </a-config-provider>
  </NuxtLayout>
  <div v-if="loadingStore.loading" class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-99999 overflow-hidden bg-headerColor opacity-50 flex flex-col items-center justify-center">
    <a-spin size="large"/>
  </div>
</template>
<script setup>
import vi_VN from "ant-design-vue/es/locale/vi_VN";
const locale = computed(() => {
  return vi_VN;
});
const loadingStore = useLoadingStore()
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

body {
  font-family: "Roboto", sans-serif;
}
</style>
