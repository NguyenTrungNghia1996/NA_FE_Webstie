<template>
  <NuxtLink :to="props.url">
    <div ref="target" class="transform transition-all duration-700 ease-in-out">
      <div class="flex flex-col justify-center items-center">
        <img :src="props.image" alt="Khách hàng" class="w-full h-auto  border border-gray-300 rounded-xl bg-white shadow-md" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
})
import { useIntersectionObserver } from '@vueuse/core'
const target = ref(null)
const isVisible = ref(false)
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
  },
  {
    threshold: 0.1,
  }
)
</script>
