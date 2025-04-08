<template>
  <div :class="props.bgImgae != '' ? props.bgImgae : 'bg-white'" class="bg-cover bg-no-repeat bg-center">
    <div class="container mx-auto p-10 flex flex-col gap-6">
      <div class="flex flex-col items-center">
        <h2 class="font-roboto text-[36px] font-medium leading-[42px] uppercase text-center" :class="props.bgImgae != '' ? 'text-white' : 'text-[#212529]'">
          {{ props.title }}
        </h2>
        <div class="h-[3px] w-[200px]  mt-4" :class="props.bgImgae != '' ? 'bg-white' : 'bg-[#212529]'"></div>
      </div>
      <div class=" w-full">
        <ClientOnly>
          <swiper-container ref="containerRef" :init="false">
            <swiper-slide v-for="n in props.slides" :key="n.title" class="flex justify-center items-center">
              <Card :title="n.title" :description="n.description" :url="n.url" :image="n.image" />
            </swiper-slide>
          </swiper-container>
          <div class="news-pagination mt-8 flex justify-center gap-2" :class="props.id"></div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
    // default: "SẢN PHẨM DỊCH VỤ",
  },
  slides: {
    type: Array,
    required: true
    // default: () => [
    //   {
    //     title: "Ứng dụng eNetViet",
    //     description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
    //     url: "#",
    //     image: "/Sp/sanpham1.jpg",
    //   },
    //   {
    //     title: "Ứng dụng eNetViet",
    //     description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
    //     url: "#",
    //     image: "/Sp/sanpham1.jpg",
    //   },
    //   {
    //     title: "Ứng dụng eNetViet",
    //     description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
    //     url: "#",
    //     image: "/Sp/sanpham1.jpg",
    //   },
    //   {
    //     title: "Ứng dụng eNetViet",
    //     description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
    //     url: "#",
    //     image: "/Sp/sanpham1.jpg",
    //   }
    // ]
  },
  bgImgae: {
    type: String,
    required: true
    // default: "bg-[url('/Rectangle_2244.webp')]",
  },
  id: {
    type: String,
    required: true
  }
});
const containerRef = ref(null);
const paginationRef = ref(
  {
    el: "."+props.id ,
    clickable: true,
    bulletClass: 'w- h-4 rounded-full bg-blue-200 cursor-pointer transition-all',
    bulletActiveClass: 'bg-gradient-to-r from-[#437ae7] to-[#3dc5b6] w-3',
    renderBullet: (index, className) => {
      return `<span class="${className}"></span>`
    }
  }
);
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
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
  // pagination: paginationRef.value,
});

onMounted(() => {
  console.log(swiper.instance)
})
</script>

<!-- <style>
/* Custom pagination styles */
.news-pagination {
  position: static !important;
  transform: none !important;
}

.swiper-pagination-bullet {
  @apply w-3 h-3 rounded-full bg-gray-300 cursor-pointer transition-all;
}

.swiper-pagination-bullet-active {
  @apply bg-blue-600 w-6;
}
</style> -->