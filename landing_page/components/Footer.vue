<template>
  <footer class="bg-[url('/bgfooter.png')] bg-center bg-cover bg-no-repeat">
    <div class="container mx-auto px-[50px] py-10 text-white">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Sản phẩm trực tuyến -->
        <div>
          <h3 class="font-roboto font-bold text-lg mb-4">SẢN PHẨM TRỰC TUYẾN</h3>
          <ul class="space-y-2">
            <li class="font-roboto" v-for="i in online_products" :key="i">
              <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-white" />
              {{ i }}
            </li>
          </ul>
          <!-- <div>
            <h3 class="font-bold text-lg mb-4">TỔNG ĐÀI HỖ TRỢ</h3>
            <p class="font-semibold text-xl">1900 4740</p>
            <p>(Từ 8h00 đến 17h30, thứ 2 đến thứ 7)</p>
          </div> -->
        </div>

        <!-- Truy cập nhanh -->
        <div>
          <h3 class="font-bold text-lg mb-4 font-roboto">TRUY CẬP NHANH</h3>
          <ul class="space-y-2">
            <li class="font-roboto" v-for="i in quick_access" :key="i">
              <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-white" />
              {{ i }}
            </li>
          </ul>
        </div>

        <!-- Tập đoàn công nghệ Quảng Ich -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="font-roboto font-bold text-lg mb-4">TẬP ĐOÀN CÔNG NGHỆ QUẢNG ICH</h3>
          <ul class="space-y-2 ">
            <li class="font-roboto">- Trụ sở chính: Z5-47 TTTM LePARC, KM 1,5 Pháp Vân, Công viên Yên Sở, P.Yên Sở, Q.Hoàng Mai, TP.Hà Nội</li>
            <li>- Chi nhánh TP. HCM: Số 33 Đường D2, Khu dân cư Hưng Phú 2, P.Phước Long B, Tp Thủ Đức, TP.Hồ Chí Minh</li>
            <li>- VPĐD Hải Phòng: Số 133 Lô 160 Lê Hồng Phong, P. Đằng Lâm, Q.Hải An, TP.Hải Phòng</li>
            <li>- VPĐD Đà Nẵng: Tầng 1,2 số 129 Phạm Phú Tiết, P.Khuê Trung, Q.Cẩm Lệ, TP.Đà Nẵng</li>
            <li>- VPĐD Cần Thơ: Số 15 Đường Nguyễn Thị Tĩnh, Khu vực 5, P.Bùi Hữu Nghĩa, Q.Bình Thủy, TP. Cần Thơ</li>
            <li>- Điện thoại: 02473085858</li>
            <li>- Email: info@qig.vn</li>
            <li>- Website: https://qig.vn</li>
          </ul>
        </div>
      </div>

      <!-- Copyright/bottom bar can be added here if needed -->
    </div>
  </footer>
</template>

<script setup>
const online_products = [
  "Hệ thống thông tin quản lý giáo dục",
  "Ứng dụng eNetViet",
  "Cổng thông tin điện tử V-Portal",
  "Thư viện điện tử VIELIB",
  "Hệ thống Học và Thi trực tuyến V-Study",
  "Thẻ thông minh E-Card"
];
const quick_access = [
  "Hỗ trợ PM hệ thống",
  "Hỗ trợ ứng dụng eNetViet",
  "Hỗ trợ PM Thư viện",
  "Truyền thông về chúng tôi",
  "Download phần mềm tiện ích"
];
</script>
