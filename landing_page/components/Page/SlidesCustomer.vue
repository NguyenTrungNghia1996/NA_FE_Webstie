<template>
  <div class="container mx-auto flex flex-col gap-6 py-6 px-6">
    <div class="flex flex-col items-center">
      <h2 class="font-roboto text-[36px] font-medium leading-[42px] uppercase text-center text-[#212529]">
        {{ props.data.title }}
      </h2>
      <div class="h-[3px] w-[200px] mt-4 bg-[#212529]"></div>
    </div>
    <div class="w-full">
      <ClientOnly>
        <swiper-container ref="containerRef" :init="false">
          <swiper-slide v-for="n in props.data.slides" :key="n">
            <!-- <NuxtLink :to="n.url">
              <div class="transform transition-all duration-700 ease-in-out">
                <div class="flex flex-col justify-center items-center ">
                  <NuxtImg
                    :src="n.image"
                    :alt="n.image"
                    placeholder="/placeholder.png"
                    class="w-[200px] h-[100px] object-cover border border-gray-300 rounded-xl bg-white shadow-md"
                  />
                  <p>{{ n.name }}</p>
                </div>
              </div>
            </NuxtLink> -->
            <NuxtLink :to="n.url">
              <div class="transform transition-all duration-700 ease-in-out">
                <div class="flex flex-col justify-center items-center">
                  <NuxtImg :src="n.image" :alt="n.image" placeholder="/placeholder.png" class="w-[200px] h-[100px] object-cover object-center border border-gray-300 rounded-xl bg-white shadow-md" />
                </div>
              </div>
            </NuxtLink>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
  effect: "Pagination",
  loop: true,
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
  },
  // pagination: paginationRef.value,
});
// onMounted(() => {
//   console.log(swiper.instance)
// })
</script>
