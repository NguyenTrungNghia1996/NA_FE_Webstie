<template>
  <div :class="props.data.image != '' ? props.data.image : 'bg-white'" class="bg-cover bg-no-repeat bg-center">
    <div class="container mx-auto p-10 flex flex-col gap-6">
      <div class="flex flex-col items-center">
        <h2 class="font-roboto text-[36px] font-medium leading-[42px] uppercase text-center" :class="props.data.image != '' ? 'text-white' : 'text-[#212529]'">
          {{ props.data.title }}
        </h2>
        <div class="h-[3px] w-[200px]  mt-4" :class="props.data.image != '' ? 'bg-white' : 'bg-[#212529]'"></div>
      </div>
      <div class="w-full">
        <ClientOnly>
          <swiper-container ref="containerRef" :init="false">
            <swiper-slide v-for="(item, index) in props.data.slides" :key="index" class="flex justify-center items-center">
              <Card :title="item.title" :description="item.description" :url="item.url" :image="item.image" />
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  // title: {
  //   type: String,
  //   required: true
  //   // default: "SẢN PHẨM DỊCH VỤ",
  // },
  // slides: {
  //   type: Array,
  //   required: true
  //   // default: () => [
  //   //   {
  //   //     title: "Ứng dụng eNetViet",
  //   //     description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
  //   //     url: "#",
  //   //     image: "/Sp/sanpham1.jpg",
  //   //   },
  //   //   {
  //   //     title: "Ứng dụng eNetViet",
  //   //     description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
  //   //     url: "#",
  //   //     image: "/Sp/sanpham1.jpg",
  //   //   },
  //   //   {
  //   //     title: "Ứng dụng eNetViet",
  //   //     description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
  //   //     url: "#",
  //   //     image: "/Sp/sanpham1.jpg",
  //   //   },
  //   //   {
  //   //     title: "Ứng dụng eNetViet",
  //   //     description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
  //   //     url: "#",
  //   //     image: "/Sp/sanpham1.jpg",
  //   //   }
  //   // ]
  // },
  // bgImgae: {
  //   type: String,
  //   required: true
  //   // default: "bg-[url('/Rectangle_2244.webp')]",
  // },
  data: {
    type: Object,
    required: true
  }
});

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
});

// onMounted(() => {
//   console.log(swiper.instance)
// })
</script>