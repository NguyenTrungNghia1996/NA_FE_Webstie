<template>
  <button
    v-show="visible"
    @click="scrollToTop"
    class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-full bg-blue-400 text-white shadow-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
  >
    <Icon
      name="heroicons:arrow-up-solid"
      class="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-md font-bold"
    />
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)

const toggleVisibility = () => {
  const scrollY = window.scrollY
  const oneThird = document.documentElement.scrollHeight / 3
  visible.value = scrollY > oneThird
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script>
