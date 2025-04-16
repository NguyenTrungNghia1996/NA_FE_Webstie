<template>
  <div class="bg-white min-h-full p-3">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="info" tab="Thông tin công ty">
        <a-form layout="vertical" :model="formState" autocomplete="off" class="p-3">
          <div class="grid grid-cols-3 gap-x-3">
            <a-form-item label="Tên công ty" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="Tiêu Đề" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="Giờ làm viêc" name="username">
              <a-time-range-picker class="w-full" use12-hours format="h:mm a" />
            </a-form-item>
            <a-form-item label="Số điện thoại" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="Địa chỉ" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="Email" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="Link Facebook" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="Trạng thái" name="username">
              <a-switch v-model:checked="formState.delivery" />
            </a-form-item>
          </div>
          <a-form-item label="Mô tả ngắn" name="username">
            <a-textarea v-model:value="formState.desc" />
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <!-- introduce -->
      <a-tab-pane key="intro" tab="Giới thiệu">
        
      </a-tab-pane>
    </a-tabs>
    <!-- <div class="bg-white p-3">
      
    </div> -->
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();
const t = nuxtApp.$i18n.t;

const formState = ref({});
const activeKey = ref("info");
onMounted(() => {
  ////////////////////////////////Breadcrumb
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => {
    return [
      { url: "/manage_site", title: "Quản lý site" },
      { url: "/manage_site/information", title: "Quản lý thông tin công ty" },
    ];
  });
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>
