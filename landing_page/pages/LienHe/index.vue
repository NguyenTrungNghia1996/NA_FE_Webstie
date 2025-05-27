<template>
  <div>
    <PageSlidesBanner :data="data_banner" />
    <PageBreadcrumb :data="data_breadcrumb" />
    <div class="container mx-auto flex flex-col gap-6 py-6 px-6">
      <div class="flex flex-col items-center">
        <h2 class="font-roboto text-2xl font-medium leading-[42px] uppercase text-center text-[#212529]">
          Liên Hệ
        </h2>
        <div class="h-[3px] w-[100px] mt-4 bg-[#212529]"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <div class="p-5 flex flex-col items-center gap-2 transition-all duration-300 hover:bg-blue-50 hover:shadow-md rounded-lg hover:-translate-y-1 border border-gray-200 hover:border-blue-300">
          <Icon name="ic:outline-location-on" class="text-4xl text-blue-500 hover:text-blue-600" />
          <p class="font-semibold font-roboto text-gray-800">Địa chỉ liên hệ</p>
          <p class="font-roboto text-gray-600 text-center">
            {{ settingStore.info.address }}
          </p>
        </div>
        <div class="p-5 flex flex-col items-center gap-2 transition-all duration-300 hover:bg-blue-50 hover:shadow-md rounded-lg hover:-translate-y-1 border border-gray-200 hover:border-blue-300">
          <Icon name="ic:baseline-phone" class="text-4xl text-blue-500 hover:text-blue-600" />
          <p class="font-semibold font-roboto text-gray-800">Điện thoại</p>
          <p class="font-roboto text-gray-600">{{ settingStore.info.phone }}</p>
        </div>
        <div class="p-5 flex flex-col items-center gap-2 transition-all duration-300 hover:bg-blue-50 hover:shadow-md rounded-lg hover:-translate-y-1 border border-gray-200 hover:border-blue-300">
          <Icon name="ic:baseline-mail-outline" class="text-4xl text-blue-500 hover:text-blue-600" />
          <p class="font-semibold font-roboto text-gray-800">E-mail</p>
          <p class="font-roboto text-gray-600 text-center break-all">
            {{ settingStore.info.email }}
          </p>
        </div>
      </div>
    </div>

    <ClientOnly>
      <div class="container mx-auto w-auto h-500 p-5">
        <iframe
          width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
          loading="lazy"
          allowfullscreen
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=59+Ng.+562+%C4%90.+Th%E1%BB%A5y+Khu%C3%AA%2C+B%C6%B0%E1%BB%9Fi%2C+T%C3%A2y+H%E1%BB%93%2C+H%C3%A0+N%E1%BB%99i&output=embed"
        ></iframe>
          <!-- <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=S%E1%BB%91%2051,%20Ng%C3%A1ch%20562/59,%20Th%E1%BB%A5y%20Khu%C3%AA,%20T%C3%A2y%20H%E1%BB%93,%20H%C3%A0%20N%E1%BB%99i+(Nguy%C3%AAn%20Anh%20)&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">

          </iframe> -->
      </div>
    </ClientOnly>
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

const data_breadcrumb = ref([
  {
    url: "/",
    label: "Trang chủ",
  },
  {
    url: "/lienhe",
    label: "Liên hệ",
  },
]);

import { useSettingStore } from "#imports"
const settingStore = useSettingStore();
</script>
