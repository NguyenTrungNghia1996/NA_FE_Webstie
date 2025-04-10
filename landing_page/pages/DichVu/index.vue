<template>
  <div>
    <component class="py-6" v-for="(item, index) in data_view" :key="index" :is="$type2Component(item.type)" :data="item.data" />
    <PageProduct :data="data"/>
    {{ data }}
    <!-- <div class="container mx-auto m-5">
      <SimpleCard/>
    </div> -->
  </div>
</template>
<script setup>
const data = ref({
  title: "Dịch vụ",
  list: [
    {
      title: 'Thiết kế và phát triển hệ thống phần mềm',
      description: "Dịch vụ thiết kế phần mềm theo yêu cầu có thể đáp ứng hoàn hảo nhu cầu của doanh nghiệp sở hữu các quy trình kinh doanh đặc thù, phức tạp, quy mô lớn...",
      image: "https://nguyenanh-est.com/Image/servicesNA.png",
      url:"#"
    },
    {
      title: 'Thiết kế và phát triển hệ thống phần mềm',
      description: "Dịch vụ thiết kế phần mềm theo yêu cầu có thể đáp ứng hoàn hảo nhu cầu của doanh nghiệp sở hữu các quy trình kinh doanh đặc thù, phức tạp, quy mô lớn...",
      image: "https://nguyenanh-est.com/Image/servicesNA.png",
      url: "#"
    },
    {
      title: 'Thiết kế và phát triển hệ thống phần mềm',
      description: "Dịch vụ thiết kế phần mềm theo yêu cầu có thể đáp ứng hoàn hảo nhu cầu của doanh nghiệp sở hữu các quy trình kinh doanh đặc thù, phức tạp, quy mô lớn...",
      image: "https://nguyenanh-est.com/Image/servicesNA.png",
      url:"#"
    },
    {
      title: 'Thiết kế và phát triển hệ thống phần mềm',
      description: "Dịch vụ thiết kế phần mềm theo yêu cầu có thể đáp ứng hoàn hảo nhu cầu của doanh nghiệp sở hữu các quy trình kinh doanh đặc thù, phức tạp, quy mô lớn...",
      image: "https://nguyenanh-est.com/Image/servicesNA.png",
      url:"#"
    },
  ],
  total: 100,
  page:2
})
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
        url: "/dichvu",
        label: "Dịch vụ"
      },
    ]
  },
])
</script>