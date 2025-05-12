<template>
  <div ref="containerRef" class="perspective">
    <div
      class="transform-style-preserve-3d transition-all duration-700 ease-out"
      :class="[
        visible ? 'opacity-100 scale-100 rotate-0' : 
        reverse ? 
          `opacity-0 scale-95 ${direction === 'x' ? 'rotate-y-90' : 'rotate-x-90'}` : 
          `opacity-0 scale-95 ${direction === 'x' ? '-rotate-y-90' : '-rotate-x-90'}`
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reverse: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'x', // 'x' hoặc 'y'
    validator: (value) => ['x', 'y'].includes(value),
  },
  perspective: {
    type: Number,
    default: 1000, // giá trị perspective
  },
});

const visible = ref(false);
const containerRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible.value = entry.isIntersecting;
    },
    { threshold: 0.3 }
  );
  
  if (containerRef.value) {
    observer.observe(containerRef.value);
  }
});
</script>

<style scoped>
.perspective {
  perspective: v-bind('props.perspective + "px"');
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.rotate-x-90 {
  transform: rotateX(90deg);
}

.-rotate-x-90 {
  transform: rotateX(-90deg);
}

.rotate-y-90 {
  transform: rotateY(90deg);
}

.-rotate-y-90 {
  transform: rotateY(-90deg);
}
</style>