<template>
  <div>
    <div v-for="n in 100" :key="n">
      {{ n }}
    </div>
    <div class="grid grid-cols-3 lg:grid-cols-6 gap-3">
      <!-- <CustomerLogo v-for="i in 8" :key="i" /> -->
    </div>
  </div>
</template>
