<template>
  <div class="px-5 py-2 space-y-2 shadow-md">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item,index) in settingStore.breadcrumb" :key="index">
        <span v-if="index + 1 < settingStore.breadcrumb.length ">
          <NuxtLink :to="item.url">{{ item.title }}</NuxtLink>
        </span>
        <span v-else>{{ item.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div>
      <span class="text-xl font-semibold">{{ title }}</span>
    </div>
  </div>
</template>
<script setup>
import { useSettingStore } from "~~/stores/settingStore"
const settingStore = useSettingStore()
const title = computed(() => {
let total = settingStore.breadcrumb.length
if (total > 0) {
  return settingStore.breadcrumb[total - 1].title
} else {
  return ""
}
});
</script>