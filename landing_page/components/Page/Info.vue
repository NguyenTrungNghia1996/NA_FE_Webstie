<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div class="p-3 flex flex-col gap-3">
        <p class="font-roboto text-[28px] font-medium leading-[33.6px] text-[#212529] no-underline">{{ props.data.title }}</p>
        <p class="font-roboto line-clamp-4">{{ props.data.description }}</p>
        <div class="relative">
          <div class="w-full font-roboto text-lg italic font-medium leading-[1.42] text-gray-600 no-underline text-justify 
              bg-gray-100 h-[139px] my-2.5 mx-0 py-4 px-6 pl-7 relative block 
              box-border rounded-r-lg">
              <p class=" line-clamp-4">{{ props.data.description }}</p>
            <div class="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-teal-400 to-blue-500"></div>
          </div>
        </div>
      </div>
      <div>
        <NuxtImg
          :src="props.data.image"
          :alt="props.data.image"
          placeholder="/placeholder.png"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>