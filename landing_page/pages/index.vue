<script setup lang="ts">
const containerRef = ref(null)
const slides = ref([
  '/Slide/bannertet.png',
  '/Slide/Congthongtin.png',
  '/Slide/Hocvathitructuyen.png',
  '/Slide/Thediemdanhthongminh.png',
  '/Slide/Thongtingiaoduc.png',
])
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

<template>
  <div>
    <ClientOnly>
      <swiper-container ref="containerRef" :init="false">
        <swiper-slide v-for="(slide, idx) in slides" :key="idx">
          <img :src="slide" class="w-full h-full object-cover" alt="Slide Image" />
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div class="p-3 flex flex-col gap-3">
          <p class="font-roboto text-[28px] font-medium leading-[33.6px] text-[#212529] no-underline">Tập đoàn công nghệ Quảng Ích</p>
          <p class="font-roboto">Tập đoàn Công nghệ Quảng Ích (QIGroup) là doanh nghiệp phần mềm chuyên cung cấp, xây dựng các giải pháp phần mềm trong lĩnh vực giáo dục hàng đầu tại Việt Nam. Sau hơn 20 năm hình thành và phát triển các sản phẩm và dịch vụ của chúng tôi đã triển khai tới hàng triệu khách hàng trên toàn quốc...Chi tiết</p>
          <div class="relative">
            <div class="w-full font-roboto text-lg italic font-medium leading-[1.42] text-gray-600 no-underline text-justify 
              bg-gray-100 h-[139px] my-2.5 mx-0 py-4 px-6 pl-7 relative block 
              box-border rounded-r-lg">
              "Chúng tôi ưu tiên nghiên cứu phát triển các ứng dụng trong lĩnh vực giáo dục và đào tạo để giúp xây dựng trường học ở Việt Nam và trên thế giới ngày càng trở nên thân thiện hơn, lớp học ngày càng trở nên văn minh, thích thú và vui vẻ hơn."

              <div class="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-teal-400 to-blue-500"></div>
            </div>
          </div>
          <!-- <div>
            <p>"Chúng tôi ưu tiên nghiên cứu phát triển các ứng dụng trong lĩnh vực giáo dục và đào tạo để giúp xây dựng trường học ở Việt Nam và trên thế giới ngày càng trở nên thân thiện hơn, lớp học ngày càng trở nên văn minh, thích thú và vui vẻ hơn."</p>
          </div> -->
        </div>
        <div>123</div>
      </div>
    </div>
    <div class="bg-[url('/Rectangle_2687.webp')]">
      <div class="container mx-auto p-10 flex flex-col gap-6">
        <div class="flex flex-col items-center">
          <h2 class="font-roboto text-[36px] font-medium leading-[42px] text-white uppercase text-center">
            SẢN PHẨM DỊCH VỤ
          </h2>
          <!-- Thanh ngang màu trắng -->
          <div class="h-[3px] w-[200px] bg-white mt-4"></div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class=" max-w-lg rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 ">
            <img class="w-full h-48 object-cover" src="/Sp/sanpham1.jpg" alt="Product 1" />
            <div class="p-4">
              <h3 class="font-roboto text-[20px] font-medium leading-[24px] text-[#212529]">Hệ thống thông tin quản lý giáo dục</h3>
              <p class="font-roboto text-base leading-[20px] text-[#212529]">Giải pháp phần mềm quản lý giáo dục toàn diện cho các cơ sở giáo dục.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="css">
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
</style>
