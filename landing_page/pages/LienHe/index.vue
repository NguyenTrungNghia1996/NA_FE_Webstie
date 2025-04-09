<template>
  <div>
    <component class="py-6" v-for="(item, index) in data_view" :key="index" :is="$type2Component(item.type)" :data="item.data" />
  </div>
</template>
<script setup>
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
        url: "/lienhe",
        label: "Liên hệ"
      },
    ]
  },
])
</script>