<template>
  <div>
    <component class="py-6" v-for="(item, index) in data_view" :key="index" :is="$type2Component(item.type)" :data="item.data" />
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();
const data_view = ref([
  {
    type: "SLIDES_BANNER",
    data: {
      slides: [
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
      ]
    }
  },
  {
    type: "INFO",
    data: {
      title: "CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ GIÁO DỤC NGUYÊN ANH",
      description: "Công ty TNHH thương mại dịch vụ giáo dục Nguyên Anh là doanh nghiệp chuyên cung cấp, xây dựng các giải pháp phần mềm, phần cứng trong nhiều lĩnh vực hàng đầu tại Việt Nam. Với đội ngũ nhân viên dày dạn kinh nghiệm phát triển các sản phẩm và dịch vụ chúng tôi tự tin đem tới trải nhiệm tuyệt vời nhất cho khách hàng...",
      description2: '"Với lực lượng nhân sự trẻ trung, năng động, đam mê công nghệ, chúng tôi tự tin để thực hiện các dự án công nghệ thông tin của khách hàng với chất lượng tốt nhất và chi phí hợp lý nhất."',
      image:"https://nguyenanh-est.com/Image/nguyenanh.png",
      url:"#"
    }
  },
  {
    type: "SLIDES_LIST",
    data: {
      title: 'SẢN PHẨM DỊCH VỤ',
      slides: [
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
      image: "bg-[url('/Rectangle_2244.webp')]",
    }
  },
  {
    type: "SLIDES_LIST",
    data: {
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
      image: "",
    }
  },
  {
    type: "SLIDES_CUSTOMER",
    data: {
      title: 'Khách hàng tiêu biểu',
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
    }
  }
])
</script>