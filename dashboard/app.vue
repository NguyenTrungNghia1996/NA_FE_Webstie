<template>
  <div>
    <a-extract-style>
      <NuxtLayout>
        <a-config-provider :locale="locale">
          <NuxtPage />
        </a-config-provider>
      </NuxtLayout>
    </a-extract-style>
  </div>
</template>
<script setup>
import vi_VN from "ant-design-vue/es/locale/vi_VN";
const locale = computed(() => {
  return vi_VN;
});

</script>
<style>
</style>