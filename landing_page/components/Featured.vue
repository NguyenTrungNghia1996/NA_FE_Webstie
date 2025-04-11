
<template>
  <div
    class="flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <div class="flex justify-center bg-blue-500 py-4">
      <p class="font-semibold font-roboto text-2xl text-white">
        {{ props.type == "PRODUCT" ? "Sản phẩm nổi bật" : "Dịch vụ nổi bật" }}
      </p>
    </div>
    <NuxtLink
      :to="item.url"
      v-for="(item, index) in data_view"
      :key="index"
      class="grid grid-cols-3 border-b-2 py-3 hover:bg-gray-50 transition-colors duration-200"
    >
      <div class="flex items-center justify-center p-2">
        <NuxtImg
          :src="item.image"
          :alt="item.image"
          placeholder="/placeholder.png"
          class="w-full h-auto object-cover rounded"
        />
      </div>
      <div class="col-span-2 px-3 flex flex-col justify-center">
        <p
          class="font-roboto text-md font-semibold hover:text-blue-500 line-clamp-4 cursor-pointer"
        >
          {{ item.description }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  type: { type: String, required: true },
});
let data_view = ref([
  {
    title: "",
    description: "",
    image: "",
    url: "",
  },
]);
const transformData = (inputData, baseUrl = "") => {
  // Tạo bản sao của mảng đầu vào để không ảnh hưởng đến mảng gốc
  const sortedData = [...inputData].sort((a, b) => (a.stt || 0) - (b.stt || 0));

  return sortedData.map((item) => {
    return {
      title: item.tieuDe || "",
      description: item.moTaNgan || "",
      image: item.urlImg || "",
      url: baseUrl + (item.id ? `/${item.id}` : ""),
    };
  });
};
const { RestApi } = useApi();

if (props.type == "PRODUCT") {
  const { data, status, error } =
    await RestApi.product.get_outstanding_proudct();
  if (status.value == "success") {
    data_view.value = transformData(data.value, "/sanpham");
  }
} else {
  const { data, status, error } =
    await RestApi.product.get_outstanding_service();
  if (status.value == "success") {
    data_view.value = transformData(data.value, "/dichvu");
  }
}
</script>
