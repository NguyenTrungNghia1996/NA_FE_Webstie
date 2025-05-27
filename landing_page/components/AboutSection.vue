<template>
  <div :class="color ? (reverse ? 'bg-gray-100' : '') : ''">
    <div ref="aboutRef" class="flex flex-col lg:flex-row gap-8 py-10 px-4 container mx-auto" :class="{ 'lg:flex-row-reverse': reverse } ">
      <div class="w-full lg:w-1/2 transform transition-all duration-700 ease-out" :class="[visible ? 'opacity-100 scale-100 translate-x-0' : reverse ? 'opacity-0 scale-95 translate-x-20' : 'opacity-0 scale-95 -translate-x-20']">
        <NuxtImg :src="imageSrc" :alt="imageSrc" placeholder="/placeholder.png" class="w-full h-auto rounded-xl shadow-lg" />
      </div>
      <div class="w-full lg:w-1/2 text-left transform transition-all duration-700 ease-out delay-100" :class="[visible ? 'opacity-100 scale-100 translate-x-0' : reverse ? 'opacity-0 scale-95 -translate-x-20' : 'opacity-0 scale-95 translate-x-20']">
        <h2 class="text-xl md:text-2xl font-bold text-blue-800 mb-3">{{ title }}</h2>
        <div class="text-gray-700 text-base sm:text-lg leading-relaxed prose" v-html="description"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  imageSrc: String,
  reverse: {
    type: Boolean,
    default: false,
  },
  color: {
    type: Boolean,
    default: false,
  },
});

const visible = ref(false);
const aboutRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true;
        // Unobserve the element once it's visible to prevent re-triggering
        if (aboutRef.value) {
          observer.unobserve(aboutRef.value);
        }
      }
    },
    { threshold: 0.3 },
  );
  if (aboutRef.value) {
    observer.observe(aboutRef.value);
  }
});
</script>
