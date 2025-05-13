<!-- <template>
  <div ref="containerRef">
    <div 
      class="transform transition-all duration-500 ease-out" 
      :class="[
        visible ? 'opacity-100 scale-100 translate-x-0 translate-y-0' : 
        reverse ? 
          `opacity-0 scale-95 ${direction === 'x' ? 'translate-x-full' : 'translate-y-full'}` : 
          `opacity-0 scale-95 ${direction === 'x' ? '-translate-x-full' : '-translate-y-full'}`
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
</script> -->

<template>
  <div ref="containerRef">
    <div 
      class="transform transition-all duration-500 ease-out w-full h-full" 
      :class="[
        hasBeenVisible ? 'opacity-100 scale-100 translate-x-0 translate-y-0' : 
        reverse ? 
          `opacity-0 scale-95 ${direction === 'x' ? 'translate-x-full' : 'translate-y-full'}` : 
          `opacity-0 scale-95 ${direction === 'x' ? '-translate-x-full' : '-translate-y-full'}`
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
  once: {
    type: Boolean,
    default: true, // Mặc định chỉ chạy hiệu ứng một lần
  },
});

const hasBeenVisible = ref(false);
const containerRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        hasBeenVisible.value = true;
        if (props.once) {
          observer.unobserve(containerRef.value);
        }
      } else if (!props.once) {
        hasBeenVisible.value = false;
      }
    },
    { threshold: 0.3 }
  );
  
  if (containerRef.value) {
    observer.observe(containerRef.value);
  }

  onBeforeUnmount(() => {
    if (containerRef.value) {
      observer.unobserve(containerRef.value);
    }
  });
});
</script>


