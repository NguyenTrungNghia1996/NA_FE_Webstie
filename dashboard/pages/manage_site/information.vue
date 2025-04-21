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
        <div class="bg-white grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
          <a-form :model="modelRef" ref="formRef" autocomplete="off" layout="horizontal" @finish="onSubmit">
            <a-form-item class="!mb-0" label="Tìm Kiếm" name="name">
              <a-input v-model:value="modelRef.name" placeholder="Tìm kiếm" />
            </a-form-item>
          </a-form>
          <div class="flex justify-end">
            <a-button @click="resetForm" class="font-roboto">Đặt Lại</a-button>
            <a-button class="ml-2 font-roboto" htmlType="submit" type="primary">Tìm Kiếm</a-button>
          </div>
        </div>
        <div class="flex-1 mt-2 p-3 overflow-auto">
          <div class="flex justify-end py-3">
            <a-button @click="showModal" >
              <span class="flex justify-center items-center">Thêm mới</span>
            </a-button>
          </div>
          <a-table :dataSource="dataSource" :columns="columns" />
        </div>
      </a-tab-pane>
    </a-tabs>
    <!-- <div class="bg-white p-3">
      
    </div> -->
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();
const t = nuxtApp.$i18n.t;
//form
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

//tab
const formState = ref({});
const activeKey = ref("intro");

//table

const columns = ref([
  {
    title: "STT",
    dataIndex: "order",
    key: "order",
  },
  {
    title: "Tiêu đề",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mô tả ngắn",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Hình Ảnh",
    dataIndex: "display_order",
    key: "display_order",
  },
  {
    title: "Trạng thái",
    dataIndex: "path",
    key: "path",
  },
  {
    title: "Chức năng",
    dataIndex: "action",
    key: "action",
  },
]);

const dataSource = ref([]);
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
