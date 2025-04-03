<template>
  <div>
    <h1>Store Pinia</h1>
    <a-space direction="vertical">
      <a-input v-model:value="user" placeholder="UserName" />
      <a-input v-model:value="password" autofocus placeholder="password" />
      <a-button @click="saveData" type="primary">Save Data Store</a-button>
    </a-space>
    <h1>Store Pinia</h1>
    {{ userStore.user }}
  </div>
</template>
<script setup>
const userStore = useUserStore();
const user = ref('username')
const password = ref('password')
const saveData = () => {
  console.log('saveData', user.value, password.value);
  let data = {
    user: user.value,
    password: password.value
  }
  userStore.setUser(data);
}
</script>