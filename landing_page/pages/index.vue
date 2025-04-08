<template>
  <div>
    <ItemPageSlidesFull :slides="slides" ref="containerRef" />
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
        </div>
        <div>Video</div>
      </div>
    </div>
    <ItemPageSildesBg :bgImgae="slides2.bgImgae" :title="slides2.title" :slides="slides2.sildes" :id="slides2.id" />
    <ItemPageSildesBg :bgImgae="slides3.bgImgae" :title="slides3.title" :slides="slides3.slides" :id="slides3.id" />
    <ItemPageSlides :title="silde4.title" :slides="silde4.slides"/>
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();

const slides = ref([
  {
    img: '/Slide/bannertet.png',
    alt: 'Slide 1',
    url: '/Slide/bannertet.png',
  },
  {
    img: '/Slide/Congthongtin.png',
    alt: 'Slide 2',
    url: '/Slide/Congthongtin.png',
  },
  {
    img: '/Slide/Hocvathitructuyen.png',
    alt: 'Slide 3',
    url: '/Slide/Hocvathitructuyen.png',
  },
  {
    img: '/Slide/Thediemdanhthongminh.png',
    alt: 'Slide 4',
    url: '/Slide/Thediemdanhthongminh.png',
  },
  {
    img: '/Slide/Thongtingiaoduc.png',
    alt: 'Slide 5',
    url: '/Slide/Thongtingiaoduc.png',
  },
]);
const slides2 = ref({
  id: nuxtApp.$RANDOMID(),
  title: 'SẢN PHẨM DỊCH VỤ',
  sildes: [
    {
      title: "Ứng dụng eNetViet",
      description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
      url: "#",
      image: "/Sp/sanpham1.jpg",
    },
    {
      title: "Ứng dụng eNetViet",
      description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
      url: "#",
      image: "/Sp/sanpham1.jpg",
    },
    {
      title: "Ứng dụng eNetViet",
      description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
      url: "#",
      image: "/Sp/sanpham1.jpg",
    },
    {
      title: "Ứng dụng eNetViet",
      description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
      url: "#",
      image: "/Sp/sanpham1.jpg",
    },
  ],
  bgImgae: "bg-[url('/Rectangle_2244.webp')]",
})
const slides3 = ref({
  id: nuxtApp.$RANDOMID(),
  title: 'Tin giáo dục',
  slides: [
    {
      title: "Sở GDĐT Hòa Bình ký hợp tác với Tập đoàn Quảng lch về chuyển đổi số",
      description: "Sáng ngày 16/04/2024, Sở Giáo dục và Đào tạo Hòa Bình đã tổ chức buổi lễ ký kết thỏa thuận hợp tác với Tập đoàn...",
      url: "#",
      image: "/Sp/sanpham1.jpg"
    },
    {
      title: "Lễ ký kết thỏa thuận hợp tác giữa Sở GD&ĐT Đồng Nai và Quảng lch",
      description: "Sáng 28-3, Sở Giáo dục và đào tạo Đồng Nai phối hợp cùng Tập đoàn Quảng lch tổ chức lễ ký kết thỏa thuận hợp...",
      url: "#",
      image: "/Sp/sanpham1.jpg"
    },
    {
      title: "Sở GD&ĐT Bình Dương và Quảng lch ký kết thỏa thuận hợp tác",
      description: "Ngày 12/3/2024, tại TP. Tân Uyên, đã diễn ra Lễ ký kết thỏa thuận hợp tác tăng cường ứng dụng công nghệ thông tin và...",
      url: "#",
      image: "/Sp/sanpham1.jpg"
    },
    {
      title: "Sở GD&ĐT Bình Dương và Quảng lch ký kết thỏa thuận hợp tác",
      description: "Ngày 12/3/2024, tại TP. Tân Uyên, đã diễn ra Lễ ký kết thỏa thuận hợp tác tăng cường ứng dụng công nghệ thông tin và...",
      url: "#",
      image: "/Sp/sanpham1.jpg"
    },
    {
      title: "Sở GD&ĐT Bình Dương và Quảng lch ký kết thỏa thuận hợp tác",
      description: "Ngày 12/3/2024, tại TP. Tân Uyên, đã diễn ra Lễ ký kết thỏa thuận hợp tác tăng cường ứng dụng công nghệ thông tin và...",
      url: "#",
      image: "/Sp/sanpham1.jpg"
    }
  ],
  bgImgae: "",
})

const silde4 = ref({
  title:'Khách hàng tiêu biểu',
  slides: [
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
  ],
})
</script>