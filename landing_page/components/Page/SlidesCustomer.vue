<template>
  <div class="container mx-auto flex flex-col gap-6 py-6 px-6">
    <div class="flex flex-col items-center">
      <h2 class="font-roboto text-[36px] font-medium leading-[42px] uppercase text-center text-[#212529]">
        {{ props.title }}
      </h2>
      <div class="h-[3px] w-[200px] mt-4 bg-[#212529]"></div>
    </div>
    <div class="w-full">
      <ClientOnly>
        <swiper-container ref="containerRef" :init="false">
          <swiper-slide v-for="n in props.slides" :key="n">
            <Logo :image="n.image" class="w-full h-full object-cover" :url="n.url" />
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>  
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  slides: {
    type: Array,
    required: true
  },
})
const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
  effect: 'Pagination',
  loop: true,
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  },
  // pagination: paginationRef.value,
});

// onMounted(() => {
//   console.log(swiper.instance)
// })
</script>