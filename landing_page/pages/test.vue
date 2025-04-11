<template>
  <div>
    {{ view }}
  </div>
</template>
<script setup>
const view = ref({
  name: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  facebook: "",
  logo: "",
  website: "",
  message:""
})
const { RestApi } = useApi();
const { data, status, error } = await RestApi.view.info();
if (status.value == "success") {
  view.value = data.value
} else {
  console.log("error:", error);
}
</script>