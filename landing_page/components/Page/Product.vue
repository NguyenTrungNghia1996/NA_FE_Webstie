<template>
  <div class="container mx-auto flex flex-col gap-6 items-center">
    <div class="flex flex-col items-center">
      <h2
        class="font-roboto text-[36px] font-medium leading-[42px] uppercase text-center text-[#212529]"
      >
        {{ props.data.title }}
      </h2>
      <div class="h-[3px] w-[100px] mt-4 bg-[#212529]"></div>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-13 mb-4">
      <div v-for="(item, index) in props.data.list" :key="index">
        <SimpleCard
          :title="item.title"
          :description="item.description"
          :image="item.image"
          :url="item.url"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: { type: Object, required: true },
});
</script>
