<template>
  <div class="container mx-auto p-10">
    <!-- <ul class="flex items-center space-x-2">
      <li class="inline-block font-semibold font-roboto text-xl text-gray-400 hover:text-gray-500 transition-colors">Trang Chủ</li>
      <li>
        <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </li>
      <li class="inline-block font-semibold font-roboto text-xl text-blue-500 hover:text-blue-600 transition-colors">Sản phẩm</li>
    </ul> -->
    <ul class="flex items-center flex-wrap gap-y-2">
      <li v-for="(item, index) in props.data" :key="index" class="flex items-center">
        <NuxtLink 
          :to="item.url" 
          class="inline-block font-semibold font-roboto text-sm md:text-xl transition-colors"
          :class="[
            index === data.length - 1 
              ? 'text-blue-500 hover:text-blue-600' 
              : 'text-gray-400 hover:text-gray-500'
          ]"
        >
          {{ item.label }}
        </NuxtLink>
        <svg 
          v-if="index !== data.length - 1" 
          class="h-4 w-4 text-gray-400 mx-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </li>
    </ul>
</div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>