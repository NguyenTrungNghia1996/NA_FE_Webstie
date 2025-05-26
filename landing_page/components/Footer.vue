<template>
  <footer class="bg-[url('/bgfooter.png')] bg-center bg-cover bg-no-repeat w-screen">
    <div class="container mx-auto px-4 sm:px-[50px] py-6 sm:py-10 text-white">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-8">
        <!-- Online Products -->
        <div>
          <h3 class="font-roboto font-bold text-base sm:text-lg mb-2 sm:mb-4">SẢN PHẨM TRỰC TUYẾN</h3>
          <ul class="space-y-1 sm:space-y-2">
            <li v-for="(product, index) in online_products" :key="index" class="font-roboto flex items-start text-sm sm:text-base">
              <nuxt-link :to="product.url">
                <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-white mt-0.5 mr-1 flex-shrink-0" size="14" />
                <span>{{ product.title }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Quick Access -->
        <div>
          <h3 class="font-roboto font-bold text-base sm:text-lg mb-2 sm:mb-4">Dịch vụ của chúng tôi</h3>
          <ul class="space-y-1 sm:space-y-2">
            <li v-for="(service, index) in quick_access" :key="index" class="font-roboto flex items-start text-sm sm:text-base">
              <nuxt-link :to="service.url">
                <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-white mt-0.5 mr-1 flex-shrink-0" size="14" />
                <span>{{ service.lable }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="font-roboto font-bold text-base sm:text-lg mb-2 sm:mb-4">{{ settingStore.info.name }}</h3>
          <ul class="space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li class="font-roboto flex flex-col sm:flex-row sm:items-start gap-1">
              <div class="flex items-center">
                <Icon name="mdi:map-marker" class="text-base mt-0.5 mr-1 flex-shrink-0" />
                <span class="font-bold">Trụ sở chính: </span>
              </div>
              <span>{{ settingStore.info.address }}</span>
            </li>
            <li class="flex-col grid grid-cols-1 md:grid-cols-2 sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div class="flex items-center">
                <Icon name="mdi:phone" class="text-base mr-1 flex-shrink-0" />
                <span>Điện thoại: {{ settingStore.info.phone }}</span>
              </div>
              <div class="flex items-center">
                <Icon name="mdi:email" class="text-base mr-1 flex-shrink-0" />
                <span>Email: {{ settingStore.info.email }}</span>
              </div>
            </li>
            <li class="flex items-center">
              <Icon name="mdi:web" class="text-base mr-1 flex-shrink-0" />
              <span>Website: {{ settingStore.info.website }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const online_products = ref([]);
const quick_access = ref([]);
const viewStore = useViewStore();
const settingStore = useSettingStore();
online_products.value = viewStore.product;
quick_access.value = settingStore.service;
</script>
