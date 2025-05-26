<template>
  <div class="w-screen">
    <ClientOnly>
      <swiper-container ref="containerRef" :init="false" class="w-screen">
        <swiper-slide v-for="(slide, idx) in a" :key="idx" class="w-screen aspect-[16/4]">
          <NuxtLink :to="slide.url" class="w-screen h-full flex items-center justify-center overflow-hidden">
            <NuxtImg placeholder="/placeholder.png" :src="slide.img" class="w-screen h-full object-fill" />
          </NuxtLink>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>

<script setup>
// const props = defineProps({
//   data: {
//     type: Object,
//     required: true,
//   },
// });
const containerRef = ref(null);

const swiper = useSwiper(containerRef, {
  effect: "Pagination",
  loop: true,
  autoplay: {
    delay: 5000,
  },
});

let a = ref([]);
const { RestApi } = useApi();
const { data, status, error } = await RestApi.view.banner();
if (status.value === "success") {
  a.value = data.value.map(item => ({
    img: item.url,
    alt: item.id,
    url: "/",
  }));
}
</script>
