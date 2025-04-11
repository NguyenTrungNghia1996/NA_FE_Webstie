<template>
  <div class="w-full flex flex-col">
    <!-- Header -->
    <Header/>
    <!-- Content Area -->
    <div class="w-full flex overflow-hidden pt-[70px] md:pt-[80px]">
      <div class=" overflow-y-auto">
        <slot/>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>