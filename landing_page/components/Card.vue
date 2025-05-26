<template>
  <NuxtLink
    :to="props.url"
    class="flex flex-col rounded-xl bg-white overflow-hidden border border-gray-300 transition-all duration-300 hover:shadow-xl hover:border-gray-200"
  >
    <div class="flex flex-col h-full min-h-[450px]">
      <div class="flex-shrink-0">
        <NuxtImg
          :src="props.image"
          :alt="props.image"
          placeholder="/placeholder.png"
          class="w-full h-48 object-fill"
        />
      </div>

      <!-- Nội dung + nút -->
      <div class="flex flex-col flex-grow justify-between p-6">
        <div>
          <h1 class="mb-3 text-xl font-bold text-gray-800 line-clamp-2">
            {{ props.title }}
          </h1>
          <p v-if="props.description" class="text-gray-600 line-clamp-3">
            {{ props.description }}
          </p>
        </div>

        <div class="pt-6 text-center">
          <span
            class="inline-block rounded-full border px-5 py-2 font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
          >
            Xem chi tiết
          </span>
        </div>
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
