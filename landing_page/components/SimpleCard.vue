<template>
  <NuxtLink :to="props.url" class="h-full">
    <div
      class="h-full max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition duration-300 ease-in-out hover:shadow-xl flex flex-col"
    >
      <div class="flex-shrink-0">
        <NuxtImg
          :src="props.image"
          placeholder="/placeholder.png"
          class="w-full h-48 object-cover"
        />
      </div>
      <div class="p-6 flex-grow flex flex-col">
        <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {{ props.title }}
        </h3>
        <p class="text-gray-600 line-clamp-4 flex-grow">
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
