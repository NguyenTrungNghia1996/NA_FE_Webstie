<template>
  <div>
    <!-- <component class="py-6" v-for="(item, index) in data_view" :key="index" :is="$type2Component(item.type)" :data="item.data" /> -->
    <PageSlidesBanner :data="data_banner" />
    <PageInfo :data="data_info" />
    <PageSildesList :data="data_product" />
    <PageSildesList :data="data_service" />
    <PageSlidesCustomer :data="data_customer" />
  </div>
</template>
<script setup>
const data_banner = ref({
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
});

const data_info = ref({
  title: "CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ GIÁO DỤC NGUYÊN ANH",
  description: "Công ty TNHH thương mại dịch vụ giáo dục Nguyên Anh là doanh nghiệp chuyên cung cấp, xây dựng các giải pháp phần mềm, phần cứng trong nhiều lĩnh vực hàng đầu tại Việt Nam. Với đội ngũ nhân viên dày dạn kinh nghiệm phát triển các sản phẩm và dịch vụ chúng tôi tự tin đem tới trải nhiệm tuyệt vời nhất cho khách hàng...",
  description2: '"Với lực lượng nhân sự trẻ trung, năng động, đam mê công nghệ, chúng tôi tự tin để thực hiện các dự án công nghệ thông tin của khách hàng với chất lượng tốt nhất và chi phí hợp lý nhất."',
  image: "https://image.nguyenanh-est.com/website/1748314853946_nguyenanh.png",
  url: "#",
});
const viewStore = useViewStore();
const data_product = ref({
  title: "SẢN PHẨM",
  slides: viewStore.product,
  image: "bg-[url('/Rectangle_2244.webp')]",
});

const data_service = ref({
  title: "DỊCH VỤ",
  slides: [
    {
      title: "Ứng dụng eNetViet",
      description: "eNetViet được thiết kế và xây dựng nhằm tạo nên một cộng đồng giáo dục gắn kết giữa nhà quản lý (cán bộ Sở/ Phòng Giáo dục, Nhà trường) với Giáo viên và Phụ huynh nhằm mang lại...",
      url: "#",
      image: "/Sp/sanpham1.jpg",
    },
  ],
  image: "",
});

const data_customer = ref({
  title: "Khách hàng tiêu biểu",
  slides: [
    {
      image: "https://nguyenanh-est.com/Image/LogoKhachHang/logost.png",
      url: "#",
    },
  ],
});

const { RestApi } = useApi();
// const { data: source_product, status: status_product, error: error_product } = await RestApi.product.get_proudct();
const { data: source_service, status: status_service, error: error_service } = await RestApi.product.get_service();

const transformData = (inputData, baseUrl = "/") => {
  return inputData.map(item => ({
    title: item.tieuDe,
    description: item.moTaNgan,
    url: `${baseUrl}/${item.id}`, // Tạo URL với id
    image: `${item.urlImg}`, // Đường dẫn ảnh
  }));
};

// if (status_product.value == "success") {
//   // data_product.value.slides = transformData(source_product.value, "/sanpham");
//   // data_product
// } else {
//   console.log("error:", error_product);
// }

if (status_service.value == "success") {
  data_service.value.slides = transformData(source_service.value, "/dichvu");
} else {
  console.log("error:", error_service);
}

const { data: typical_customers, status: status_typical_customers, error: error_typical_customers } = await RestApi.view.typical_customers();
if (status_typical_customers.value == "success") {
  data_customer.value.slides = typical_customers.value.map(item => {
    return {
      id: item.id || "",
      name: item.tenKhachHang|| "",
      image: item.urlLogo || "",
      url: item.website || "",
    };
  });
} else {
  console.log("error:", error_typical_customers);
}
</script>
