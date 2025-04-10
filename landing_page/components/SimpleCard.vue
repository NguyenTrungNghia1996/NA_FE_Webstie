<template>
  <NuxtLink :to="props.url">
    <div
      class="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition duration-300 ease-in-out hover:shadow-xl"
    >
      <img
        class="w-full h-48 object-cover rounded-xl"
        :src="props.image"
        alt="Hình ảnh thời khóa biểu"
      />
      <div class="p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {{ props.title }}
        </h3>
        <p class="text-gray-600 line-clamp-4">
          {{ props.description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: String, required: true },
});
</script>
