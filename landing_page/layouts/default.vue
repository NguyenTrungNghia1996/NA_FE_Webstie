<template>
  <div class="w-full flex flex-col ">
    <!-- Header -->
    <Header/>
    <!-- Content Area -->
    <div class="w-full flex overflow-hidden">
      <div class=" overflow-y-auto">
        <slot/>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>