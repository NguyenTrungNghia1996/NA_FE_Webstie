<template>
  <div>
    <a-extract-style>
      <NuxtLayout>
        <a-config-provider :locale="locale">
          <NuxtPage />
        </a-config-provider>
      </NuxtLayout>
      <div v-if="settingStore.loading" class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-99999 overflow-hidden bg-gray-500 opacity-50 flex flex-col items-center justify-center">
        <a-spin size="large" />
      </div>
    </a-extract-style>
  </div>
</template>
<script setup>
const settingStore = useSettingStore();
import vi_VN from "ant-design-vue/es/locale/vi_VN";
const locale = computed(() => {
  return vi_VN;
});
</script>
<style></style>
