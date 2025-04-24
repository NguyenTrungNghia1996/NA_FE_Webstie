<template>
  <div class="container mx-auto flex flex-col gap-6 items-center px-4">
    <div class="flex flex-col items-center">
      <h2 class="font-roboto text-2xl md:text-[36px] font-medium leading-tight uppercase text-center text-[#212529]">
        {{ props.data.title }}
      </h2>
      <div class="h-[3px] w-[100px] mt-4 bg-[#212529]"></div>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-4">
      <div v-for="(item, index) in props.data.list" :key="index" class="h-full">
        <NuxtLink 
          :to="item.url" 
          class="h-full block group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl"
        >
          <div class="h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <!-- Image container -->
            <div class="relative aspect-video overflow-hidden">
              <NuxtImg 
                :src="item.image" 
                placeholder="/placeholder.png" 
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                :alt="item.title"
                sizes="sm:100vw md:50vw lg:33vw"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
            
            <!-- Content container -->
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                {{ item.title }}
              </h3>
              <p class="text-gray-600 line-clamp-3 mb-3 flex-grow">
                {{ item.description }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: { type: Object, required: true },
});
</script>