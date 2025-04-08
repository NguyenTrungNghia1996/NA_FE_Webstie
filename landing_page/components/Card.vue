<template>
  <NuxtLink :to="props.url" class="flex flex-col justify-between w-full rounded-xl bg-white overflow-hidden border border-gray-300 
  transition-all duration-300 hover:shadow-xl hover:border-gray-200">
    <div>
      <img class="w-full h-70 object-cover" :src="props.image" alt="Product 1" />
      <div class="flex-grow p-6 ">
        <h1 class="mb-3 text-xl font-bold text-gray-800 line-clamp-2">{{ props.title }}</h1>
        <p class="text-gray-600 line-clamp-3">{{ props.description }}</p>
      </div>
    </div>
    <div class="p-8 text-center ">
      <NuxtLink :to="props.url" class="inline-block rounded-full border px-5 py-2 font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800">Xem chi tiết</NuxtLink>
    </div>
  </NuxtLink>
</template>
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: String, required: true },
})
</script>