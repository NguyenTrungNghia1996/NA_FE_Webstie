<template>
  <div>
    <PageSlidesBanner :slides="slides"/>
    <PageInfo/>
    <PageSildesList :bgImgae="slides2.bgImgae" :title="slides2.title" :slides="slides2.sildes" />
    <PageSildesList :bgImgae="slides3.bgImgae" :title="slides3.title" :slides="slides3.slides" />
    <PageSlidesCustomer :title="sildes4.title" :slides="sildes4.slides"/>
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();

const slides = ref([
  {
    img: '/Slide/bannertet.png',
    alt: 'Slide 1',
    url: '#',
  },
  {
    img: '/Slide/Congthongtin.png',
    alt: 'Slide 2',
    url: '#',
  },
  {
    img: '/Slide/Hocvathitructuyen.png',
    alt: 'Slide 3',
    url: '#',
  },
  {
    img: '/Slide/Thediemdanhthongminh.png',
    alt: 'Slide 4',
    url: '#',
  },
  {
    img: '/Slide/Thongtingiaoduc.png',
    alt: 'Slide 5',
    url: '#',
  },
]);
const slides2 = ref({
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
const sildes4 = ref({
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