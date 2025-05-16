<template>
  <div>
    <component v-for="(item, index) in data_view" :key="index" :is="$type2Component(item.type)" :data="item.data" />
    <div class="container mx-auto">
      <AboutSection v-for="(item, index) in introduce" :key="index" :title="item.title" :description="item.description" :imageSrc="item.imageSrc" :reverse="item.reverse" />
    </div>
  </div>
</template>

<script setup>
const introduce = ref([])
const { RestApi } = useApi();
const { data, status, error } = await RestApi.view.about();
if (status.value == "success") {
  introduce.value = data.value.map((item, index) => ({
    title: item.tentieude,
    description: item.moTa,
    imageSrc: item.urlImg,
    reverse: index % 2 !== 0
  }));
} else {
  console.log("error:", error);
}
const data_view = ref([
  {
    type: "SLIDES_BANNER",
    data: {
      slides: [
        {
          img: 'https://image.nguyenanh-est.com/website/1746671187665_banner1NA.png',
          alt: 'Slide 1',
          url: '#',
        },
        {
          img: 'https://image.nguyenanh-est.com/website/1746671187665_banner1NA.png',
          alt: 'Slide 2',
          url: '#',
        },
        {
          img: 'https://image.nguyenanh-est.com/website/1746671187665_banner1NA.png',
          alt: 'Slide 3',
          url: '#',
        },
        {
          img: 'https://image.nguyenanh-est.com/website/1746671187665_banner1NA.png',
          alt: 'Slide 4',
          url: '#',
        },
        {
          img: 'https://image.nguyenanh-est.com/website/1746671187665_banner1NA.png',
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
        url: "/",
        label: "Trang chủ"
      },
      {
        url: "/GioiThieu",
        label: "Giới thiệu"
      },
    ]
  },
])
</script>
