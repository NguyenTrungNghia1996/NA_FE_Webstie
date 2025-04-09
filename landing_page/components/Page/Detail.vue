<template>
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-7">
    <div class="col-span-2 p-4">
      <div v-html="props.data.detail"></div>
    </div>
    <div class="">
      <Featured/>
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