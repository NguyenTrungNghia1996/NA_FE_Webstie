<template>
  <TinyMCE
    v-model="content"
  />
</template>

<script setup>

const content = ref('<p>Hello TinyMCE!</p>')
</script>