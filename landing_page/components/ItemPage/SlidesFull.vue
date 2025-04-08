<template>
  <ClientOnly>
    <swiper-container ref="containerRef" :init="false">
      <swiper-slide v-for="(slide, idx) in props.slides" :key="idx">
        <NuxtLink :to="slide.url" class="w-full h-full flex items-center justify-center">
          <img :src="slide.img" class="w-full h-full object-cover" :alt="slide.alt" />
        </NuxtLink>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
<script setup>
const props = defineProps({
  slides: {
    type: Array,
    required: true
    // default: () => [
    //   {
    //     img: '/Slide/bannertet.png',
    //     alt: 'Slide 1',
    //     url: '/Slide/bannertet.png',
    //   },
    //   {
    //     img: '/Slide/Congthongtin.png',
    //     alt: 'Slide 2',
    //     url: '/Slide/Congthongtin.png',
    //   },
    //   {
    //     img: '/Slide/Hocvathitructuyen.png',
    //     alt: 'Slide 3',
    //     url: '/Slide/Hocvathitructuyen.png',
    //   },
    //   {
    //     img: '/Slide/Thediemdanhthongminh.png',
    //     alt: 'Slide 4',
    //     url: '/Slide/Thediemdanhthongminh.png',
    //   },
    //   {
    //     img: '/Slide/Thongtingiaoduc.png',
    //     alt: 'Slide 5',
    //     url: '/Slide/Thongtingiaoduc.png',
    //   },
    // ],
  },
})
const containerRef = ref(null)

const swiper = useSwiper(containerRef, {
  effect: 'Pagination',
  loop: true,
  autoplay: {
    delay: 5000,
  },
})

onMounted(() => {
  console.log(swiper.instance)
})
</script>