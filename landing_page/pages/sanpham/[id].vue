<template>
  <div>
    <PageSlidesBanner :data="data_banner" />
    <PageBreadcrumb :data="data_breadcrumb" />
    <PageDetail :data="data_detail" />
  </div>
</template>
<script setup>
const route = useRoute();
// console.log(route.params); // { id: '123' }
const data_banner = ref({
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
});
const data_breadcrumb = ref([
  {
    url: "/",
    label: "Trang chủ",
  },
  {
    url: "/sanpham",
    label: "Sản Phẩm",
  },
]);
const data_detail = ref({
  title: "",
  description: "",
  short_description: "",
  create_date: "",
  image: "",
});
//   {
//   type: "DETAIL",
// },
const transformData = (input) => {
  // data_breadcrumb.value.push({
  //   url: "#",
  //   label: input.tieuDe,
  // });
  return {
    title: input.tieuDe || "",
    description: input.noiDung || "",
    short_description: input.moTaNgan || "",
    create_date: input.ngayTao || "",
    image: input.urlImg || "",
    type: "PRODUCT",
  };
};
const { RestApi } = useApi();
const { data, status, error } = await RestApi.product.get_detail_proudct({
  params: route.params,
});
if (status.value == "success") {
  data_detail.value = transformData(data.value);
} else {
  console.log("error:", error);
}
onMounted(async () => {
  const { RestApi } = useApi();
  const { data, status, error } = await RestApi.product.get_detail_proudct({
    params: route.params,
  });
  if (status.value == "success") {
    data_detail.value = transformData(data.value);
  } else {
    console.log("error:", error);
  }
});
</script>
