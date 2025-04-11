<template>
  <div>
    <component
      class="py-6"
      v-for="(item, index) in data_view"
      :key="index"
      :is="$type2Component(item.type)"
      :data="item.data"
    />
    <ClientOnly>
      <div class="container mx-auto w-auto h-100 p-10">
          <iframe
            style="
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: 0;
            "
            loading="lazy"
            allowfullscreen
            src="https://maps.google.com/maps?q=59+Ng.+562+%C4%90.+Th%E1%BB%A5y+Khu%C3%AA%2C+B%C6%B0%E1%BB%9Fi%2C+T%C3%A2y+H%E1%BB%93%2C+H%C3%A0+N%E1%BB%99i&output=embed"
          ></iframe>
        </div>
    </ClientOnly>
  </div>
</template>
<script setup>
const data_view = ref([
  {
    type: "SLIDES_BANNER",
    data: {
      slides: [
        {
          img: "/Slide/bannertet.png",
          alt: "Slide 1",
          url: "#",
        },
        {
          img: "/Slide/Congthongtin.png",
          alt: "Slide 2",
          url: "#",
        },
        {
          img: "/Slide/Hocvathitructuyen.png",
          alt: "Slide 3",
          url: "#",
        },
        {
          img: "/Slide/Thediemdanhthongminh.png",
          alt: "Slide 4",
          url: "#",
        },
        {
          img: "/Slide/Thongtingiaoduc.png",
          alt: "Slide 5",
          url: "#",
        },
      ],
    },
  },
  {
    type: "BREADCRUMB",
    data: [
      {
        url: "#",
        label: "Trang chủ",
      },
      {
        url: "/lienhe",
        label: "Liên hệ",
      },
    ],
  },
]);
</script>
