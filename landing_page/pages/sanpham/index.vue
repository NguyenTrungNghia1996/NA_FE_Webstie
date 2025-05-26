<template>
  <div>
    <component v-for="(item, index) in data_view" :key="index" :is="$type2Component(item.type)" :data="item.data" />
  </div>
</template>
<script setup>
const viewStore = useViewStore();
const data_view = ref([
  {
    type: "SLIDES_BANNER",
    data: {
      slides: [
        {
          img: "https://image.nguyenanh-est.com/website/1746671187665_banner1NA.png",
          alt: "Slide 1",
          url: "#",
        },
        {
          img: "https://image.nguyenanh-est.com/website/1746671187665_banner1NA.png",
          alt: "Slide 2",
          url: "#",
        },
        {
          img: "https://image.nguyenanh-est.com/website/1746671187665_banner1NA.png",
          alt: "Slide 3",
          url: "#",
        },
        {
          img: "https://image.nguyenanh-est.com/website/1746671187665_banner1NA.png",
          alt: "Slide 4",
          url: "#",
        },
        {
          img: "https://image.nguyenanh-est.com/website/1746671187665_banner1NA.png",
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
        url: "/",
        label: "Trang chủ",
      },
      {
        url: "#",
        label: "Sản Phẩm",
      },
    ],
  },
  {
    type: "PRODUCT",
    data: {
      title: "Sản Phẩm",
      list: viewStore.product,
    },
  },
]);
// const processServicesData = (originalArray, servicesData, baseUrl = "#", sectionTitle = "Dịch vụ") => {
//   const transformedServices = servicesData
//     .sort((a, b) => a.stt - b.stt)
//     .map(item => ({
//       title: item.tieuDe,
//       description: item.moTaNgan,
//       image: item.urlImg,
//       url: `${baseUrl}${item.id}`,
//     }));
//   let productItem = originalArray.find(item => item.type === "PRODUCT");
//   if (productItem) {
//     productItem.data = {
//       title: sectionTitle,
//       list: transformedServices,
//     };
//   } else {
//     originalArray.push({
//       type: "PRODUCT",
//       data: {
//         title: sectionTitle,
//         list: transformedServices,
//       },
//     });
//   }
// };
// const { RestApi } = useApi();
// const { data, status, error } = await RestApi.product.get_proudct();
// if (status.value == "success") {
//   // processServicesData(data_view.value, data.value, "/sanpham/", "Sản Phẩm");
// } else {
//   console.log("error:", error);
// }
</script>
