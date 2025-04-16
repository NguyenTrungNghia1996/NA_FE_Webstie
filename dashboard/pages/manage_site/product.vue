<template>
  <div class="flex flex-col min-h-full">
    <div class="bg-white grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
      <a-form :model="modelRef" ref="formRef" autocomplete="off" layout="horizontal" @finish="onSubmit">
        <a-form-item class="!mb-0" label="Tìm Kiếm" name="name">
          <a-input v-model:value="modelRef.name" placeholder="Tìm kiếm sản phầm" />
        </a-form-item>
      </a-form>
      <div class="flex justify-end">
        <a-button @click="resetForm" class="font-roboto">Đặt Lại</a-button>
        <a-button class="ml-2 font-roboto" htmlType="submit" type="primary">Tìm Kiếm</a-button>
      </div>
    </div>
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();
const t = nuxtApp.$i18n.t;

const modelRef = reactive({
  name: "",
});
const formRef = ref({});
const resetForm = async () => {
  // delete tableParams?.name;
  // tableParams.page = 1;
  // tableParams.limit = 10;
  formRef.value.resetFields();
};
async function onSubmit(value) {
  // Object.assign(tableParams, {
  //   page: 1,
  //   limit: 10,
  //   ...value,
  // });
}

onMounted(() => {
  ////////////////////////////////Breadcrumb
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => {
    return [
      { url: "/manage_site", title: "Quản lý site" },
      { url: "/manage_site/product", title: "Quản lý sản phẩm" },
    ];
  });
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>
