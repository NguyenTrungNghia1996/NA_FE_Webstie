<template>
  <footer class="bg-[url('/bgfooter.png')] bg-center bg-cover bg-no-repeat">
    <div class="container mx-auto px-4 sm:px-[50px] py-6 sm:py-10 text-white">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
        <!-- Online Products -->
        <div>
          <h3 class="font-roboto font-bold text-base sm:text-lg mb-2 sm:mb-4">SẢN PHẨM TRỰC TUYẾN</h3>
          <ul class="space-y-1 sm:space-y-2">
            <li v-for="(product, index) in online_products" :key="index" class="font-roboto flex items-start text-sm sm:text-base">
              <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-white mt-0.5 mr-1 flex-shrink-0" size="14" />
              <span>{{ product }}</span>
            </li>
          </ul>
        </div>

        <!-- Quick Access -->
        <div>
          <h3 class="font-roboto font-bold text-base sm:text-lg mb-2 sm:mb-4">Dịch vụ của chúng tôi</h3>
          <ul class="space-y-1 sm:space-y-2">
            <li v-for="(service, index) in quick_access" :key="index" class="font-roboto flex items-start text-sm sm:text-base">
              <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-white mt-0.5 mr-1 flex-shrink-0" size="14" />
              <span>{{ service }}</span>
            </li>
          </ul>
        </div>

        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="font-roboto font-bold text-base sm:text-lg mb-2 sm:mb-4">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ GIÁO DỤC NGUYÊN ANH</h3>
          <ul class="space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li class="font-roboto flex flex-col sm:flex-row sm:items-start gap-1">
              <div class="flex items-start">
                <Icon name="mdi:map-marker" class="text-base mt-0.5 mr-1 flex-shrink-0" />
                <span class="font-bold">Trụ sở chính: </span>
              </div>
              <span>Số 51, Ngách 562/59, Thụy Khuê, Tây Hồ, Hà Nội</span>
            </li>
            <li class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div class="flex items-center">
                <Icon name="mdi:phone" class="text-base mr-1 flex-shrink-0" />
                <span>Điện thoại: 0973.052.270</span>
              </div>
              <div class="flex items-center">
                <Icon name="mdi:email" class="text-base mr-1 flex-shrink-0" />
                <span>Email: info.nguyenanhest@gmail.com</span>
              </div>
            </li>
            <li class="flex items-center">
              <Icon name="mdi:web" class="text-base mr-1 flex-shrink-0" />
              <span>Website: https://nguyenanh-est.com</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const online_products = [
  "Phần mềm Xếp thời khóa biểu",
  "Hệ thống Xuất bản tạp chí điện tử",
];

const quick_access = [
  "Cung cấp thiết bị công nghệ thông tin",
  "Thiết kế và phát triển hệ thống phần mềm",
  "Bảo trì và vận hành hệ thống công nghệ thông tin",
];
</script>