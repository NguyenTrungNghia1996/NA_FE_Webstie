<template>
  <div
    ref="aboutRef"
    class="flex flex-col md:flex-row items-center justify-between gap-8 py-10 px-4"
    :class="{ 'md:flex-row-reverse': reverse }"
  >
    <!-- Image -->
    <div
      class="w-full md:w-1/2 transform transition-all duration-700 ease-out"
      :class="[
        visible
          ? 'opacity-100 scale-100 translate-x-0'
          : reverse
            ? 'opacity-0 scale-95 translate-x-20'
            : 'opacity-0 scale-95 -translate-x-20'
      ]"
    >
      <img :src="imageSrc" alt="About image" class="w-full h-auto rounded-xl shadow-lg" />
    </div>

    <!-- Text -->
    <div
      class="w-full md:w-1/2 text-center md:text-left transform transition-all duration-700 ease-out delay-100"
      :class="[
        visible
          ? 'opacity-100 scale-100 translate-x-0'
          : reverse
            ? 'opacity-0 scale-95 -translate-x-20'
            : 'opacity-0 scale-95 translate-x-20'
      ]"
    >
      <h2 class="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">{{ title }}</h2>
      <div class="text-gray-700 text-base sm:text-lg leading-relaxed" v-html="description">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  imageSrc: String,
  reverse: {
    type: Boolean,
    default: false
  }
})

const visible = ref(false)
const aboutRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible.value = entry.isIntersecting
    },
    { threshold: 0.3 }
  )
  if (aboutRef.value) {
    observer.observe(aboutRef.value)
  }
})
</script>
