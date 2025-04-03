<template>
  <div>
    <h1>Test Page</h1>
    <p>This is a test page.</p>
    {{ data }}
  </div>
</template>
<script setup>
const { RestApi } = useApi();
const data = await RestApi.test.get()
</script>