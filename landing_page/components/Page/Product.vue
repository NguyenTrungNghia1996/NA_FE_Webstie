<template>
  <div class="container mx-auto m-10 flex flex-col gap-6 items-center">
    <div class="flex flex-col items-center">
      <h2
        class="font-roboto text-[36px] font-medium leading-[42px] uppercase text-center text-[#212529]"
      >
        {{ data_local.title }}
      </h2>
      <div class="h-[3px] w-[100px] mt-4 bg-[#212529]"></div>
    </div>
    <div class="w-full grid grid-cols-4 gap-5">
      <div v-for="(item, index) in data_local.list" :key="index">
        <SimpleCard
          :title="item.title"
          :description="item.description"
          :image="item.image"
          :url="item.url"
        />
      </div>
    </div>

    <UPagination
      v-model:page="data_local.page"
      size="sm"
      active-color="secondary"
      :total="data_local.total"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  data: { type: Object, required: true },
});
let data_local = computed({
  get() {
    return props.data;
  },
  set(value) {
    emit("update:data", value);
  },
});
</script>
