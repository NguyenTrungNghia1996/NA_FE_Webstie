<template>
  <div class="w-full h-screen flex flex-col bg-gray-200">
    <!-- Header -->
    <Header/>
    <!-- Content Area -->
    <div class="w-full flex-1 flex overflow-hidden">
      <div class="flex-1 overflow-y-auto">
        <slot/>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>