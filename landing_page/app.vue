<template>
  <NuxtLayout>
    <NuxtPage />
    <ScrollToTop />
  </NuxtLayout>
</template>
<script setup>
const settingStore = useSettingStore();
console.log(settingStore.info.title)
useHead({
  title: computed(() => settingStore.info.titl || 'Nguyên Anh EST')
})
</script>
