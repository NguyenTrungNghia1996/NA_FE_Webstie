<template>
  <div>
    <component class="py-6" v-for="(item, index) in data_view" :key="index" :is="$type2Component(item.type)" :data="item.data" />
  </div>
</template>
<script setup>
const route = useRoute()
console.log(route.params) // { id: '123' }
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
    type: "BREADCRUMB",
    data: [
      {
        url: "#",
        label: "Trang chủ"
      },
      {
        url: "#",
        label: "Sản Phẩm"
      },
    ]
  },
  {
    type: "DETAIL",
    data: {
      detail:"<p><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#6b6a75\">Ch&uacute;ng t&ocirc;i c&oacute; được đội ngũ nh&acirc;n sự t&agrave;i năng v&agrave; nhiều kinh nghiệm trong lĩnh vực CNTT. Cung cấp c&aacute;c nền tảng ứng dụng web, ứng dụng mobile, dịch vụ gia c&ocirc;ng phần mềm phần mềm, ứng dụng Al, loT.. v&agrave; mục ti&ecirc;u sẽ vươn ra thị trường to&agrave;n cầu.</span></span></span></p>\n\n<p style=\"text-align:start\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#6b6a75\">C&ocirc;ng ty Nguy&ecirc;n Anh của ch&uacute;ng t&ocirc;i l&agrave; một trong những c&ocirc;ng ty ph&aacute;t triển phần mềm h&agrave;ng đầu tại Việt Nam. Với khẩu hiệu &ldquo;Lợi &iacute;ch của kh&aacute;ch h&agrave;ng l&agrave; th&agrave;nh c&ocirc;ng của ch&uacute;ng t&ocirc;i&rdquo;, ch&uacute;ng t&ocirc;i lu&ocirc;n cung cấp cho kh&aacute;ch h&agrave;ng những sản phẩm tốt nhất. Ch&uacute;ng t&ocirc;i c&oacute; thể cung cấp cho bạn tất cả c&aacute;c dịch vụ li&ecirc;n quan đến CNTT như tư vấn, ph&acirc;n t&iacute;ch, thiết kế, triển khai, vận h&agrave;nh v&agrave; bảo tr&igrave;.</span></span></span></p>\n\n<p style=\"text-align:start\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#6b6a75\">Với phương ch&acirc;m &ldquo;Ch&uacute;ng t&ocirc;i lu&ocirc;n lắng nghe, tư vấn, chia sẻ kinh nghiệm để đưa ra những giải ph&aacute;p tốt nhất với chi ph&iacute; ph&ugrave; hợp nhất tới kh&aacute;ch h&agrave;ng.&rdquo;</span></span></span></p>\n\n<p><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#6b6a75\">Nguy&ecirc;n Anh sở hữu một đội ngũ nhiều nh&acirc;n t&agrave;i trong lĩnh vực CNTT.</span></span></span></p>\n\n<p style=\"text-align:start\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#6b6a75\">Đội ngũ nh&acirc;n vi&ecirc;n của Nguy&ecirc;n Anh đều l&agrave; những người c&oacute; kinh nghiệm v&agrave; được đ&agrave;o tạo chuy&ecirc;n s&acirc;u, đ&atilde; từng l&agrave;m việc trong ng&agrave;nh ở c&aacute;c vị tr&iacute; cấp cao. Họ c&oacute; kiến thức v&agrave; kỹ năng (Thực tế v&agrave; L&yacute; thuyết) để hỗ trợ kh&aacute;ch h&agrave;ng của họ x&acirc;y dựng c&aacute;c giải ph&aacute;p phần mềm tốt nhất.</span></span></span></p>\n\n<p style=\"text-align:start\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#6b6a75\">Đội ngũ ch&uacute;ng t&ocirc;i c&oacute; hơn 12 năm kinh nghiệm x&acirc;y dựng phần mềm cho kh&aacute;ch h&agrave;ng c&aacute; nh&acirc;n v&agrave; kh&aacute;ch h&agrave;ng doanh nghiệp trong nước v&agrave; quốc tế như: Mỹ, Ch&acirc;u &Acirc;u v&agrave; Nhật Bản. Đối với ch&uacute;ng t&ocirc;i, sự h&agrave;i l&ograve;ng của kh&aacute;ch h&agrave;ng l&agrave; ưu ti&ecirc;n h&agrave;ng đầu v&agrave; ch&uacute;ng t&ocirc;i sẽ nỗ lực hết m&igrave;nh v&igrave; sự th&agrave;nh c&ocirc;ng của kh&aacute;ch h&agrave;ng.</span></span></span></p>\n\n<p style=\"text-align:start\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#6b6a75\">Ch&uacute;ng t&ocirc;i cung cấp c&aacute;c nền tảng ứng dụng web, ứng dụng di động, dịch vụ gia c&ocirc;ng phần mềm, ứng dụng AI, IoT&hellip; v&agrave; tư vấn triển khai c&aacute;c giải ph&aacute;p phần cứng (m&aacute;y chủ, thiết bị lưu trữ, mạng&hellip;) cho c&aacute;c trung t&acirc;m dữ liệu vừa v&agrave; nhỏ.</span></span></span></p>\n\n<p style=\"text-align:start\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#6b6a75\">Mục ti&ecirc;u ch&iacute;nh của hoạt động kinh doanh của ch&uacute;ng t&ocirc;i l&agrave; th&ocirc;ng qua Tư vấn, x&acirc;y dựng giải ph&aacute;p, triển khai, thử nghiệm độ tin cậy v&agrave; hiệu suất của c&aacute;c giải ph&aacute;p phần mềm cũng như c&aacute;c thiết bị phần cứng nhằm mang lại lợi &iacute;ch thiết thực cho kh&aacute;ch h&agrave;ng.</span></span></span></p>\n\n<p style=\"text-align:start\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#6b6a75\">Ch&uacute;ng t&ocirc;i tự h&agrave;o về việc ch&uacute;ng t&ocirc;i x&acirc;y dựng mối quan hệ chuy&ecirc;n nghiệp với kh&aacute;ch h&agrave;ng v&agrave; hỗ trợ l&acirc;u d&agrave;i. Ch&uacute;ng t&ocirc;i lu&ocirc;n mong muốn, rất vinh dự v&agrave; sẵn s&agrave;ng được c&ugrave;ng Qu&yacute; kh&aacute;ch h&agrave;ng x&acirc;y dựng mối quan hệ hợp t&aacute;c l&acirc;u d&agrave;i v&agrave; bền vững.</span></span></span></p>\n\n<p style=\"text-align:start\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"color:#6b6a75\">&ldquo;Lợi &iacute;ch của kh&aacute;ch h&agrave;ng l&agrave; th&agrave;nh c&ocirc;ng của ch&uacute;ng t&ocirc;i&rdquo;</span></strong></span></span></p>\n"
    }
  }
])
</script>