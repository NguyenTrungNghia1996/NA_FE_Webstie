<template>
  <div class="flex flex-col min-h-full">
    <div class="bg-white p-3">
      <a-form class="grid grid-cols-1 md:grid-cols-2 gap-2" :model="modelRef" ref="formRef" autocomplete="off" layout="horizontal" @finish="onSubmit">
        <a-form-item class="!mb-0" label="Tìm Kiếm" name="name">
          <a-input v-model:value="modelRef.name" placeholder="Tìm kiếm menu" />
        </a-form-item>
        <div class="flex flex-wrap gap-2 justify-end mt-2 md:mt-0">
          <a-button @click="resetForm" class="font-roboto w-full md:w-auto">Đặt Lại</a-button>
          <a-button class="font-roboto w-full md:w-auto" htmlType="submit" type="primary">Tìm Kiếm</a-button>
        </div>
      </a-form>
    </div>
    <div class="bg-white flex-1 mt-2 p-3 overflow-auto">
      <div class="flex justify-end gap-2 mb-4">
        <a-button type="primary" @click="openForm()" class="font-roboto w-full md:w-auto">Thêm menu</a-button>
      </div>
      <div class="overflow-x-auto">
        <a-table :columns="columns" :data-source="menuTree" :pagination="pagination" :row-key="record => record.id" :expandable="{ childrenColumnName: 'children' }" bordered @change="handleTableChange">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'active'">
              <span :class="record.active ? 'text-green-600' : 'text-red-500'">
                {{ record.active ? "Hoạt động" : "Tạm ẩn" }}
              </span>
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="flex gap-2">
                <a-button type="primary" @click="openForm(record)" size="small">Sửa</a-button>
                <a-popconfirm title="Bạn có chắc chắn muốn xóa menu này?" ok-text="Xóa" cancel-text="Hủy" @confirm="handleDelete(record.id)">
                  <a-button type="primary" danger size="small">Xóa</a-button>
                </a-popconfirm>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <a-modal v-model:open="showForm" :title="form.id ? 'Sửa menu' : 'Thêm menu'" :footer="null" wrap-class-name="modal-responsive">
        <a-form :model="form" layout="vertical" @submit.prevent class="grid gap-4 sm:grid-cols-2">
          <a-form-item label="Tên menu" class="col-span-full">
            <a-input v-model:value="form.name" placeholder="Nhập tên menu" />
          </a-form-item>

          <a-form-item label="URL">
            <a-input v-model:value="form.url" placeholder="Nhập đường dẫn" />
          </a-form-item>

          <a-form-item label="Menu cha">
            <a-select v-model:value="form.idMenuCha" allow-clear placeholder="Chọn menu cha">
              <a-select-option :value="0">Không có</a-select-option>
              <a-select-option v-for="m in allMenus.filter(m => m.id !== form.id)" :key="m.id" :value="m.id">
                {{ m.name }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Thứ tự">
            <a-input-number v-model:value="form.order" class="w-full" />
          </a-form-item>

          <a-form-item label="Hiển thị" class="col-span-full">
            <a-switch v-model:checked="form.active" />
          </a-form-item>

          <div class="flex justify-end gap-2 col-span-full">
            <a-button @click="showForm = false">Huỷ</a-button>
            <a-button type="primary" @click="handleSave">Lưu</a-button>
          </div>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script setup>
const { RestApi } = useApi();
const nuxtApp = useNuxtApp();
const t = nuxtApp.$i18n.t;
//tìm kiếm

// table

const rawMenus = ref([]);
const allMenus = ref([]);

const form = ref({
  id: null,
  name: "",
  url: "",
  idMenuCha: 0,
  order: 0,
  active: true,
});
const showForm = ref(false);

const param = ref({ PageIndex: 1, PageSize: 10 });
const pagination = ref({
  current: 1,
  pageSize: 10,
  showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trên tổng số ${total} bản ghi`,
  showSizeChanger: true,
  pageSizeOptions: ["1", "10", "20", "50", "100"],
});

const columns = [
  { title: "Tên menu", dataIndex: "name", key: "name", width: 200 },
  { title: "URL", dataIndex: "url", key: "url" },
  { title: "Thứ tự", dataIndex: "order", key: "order" },
  { title: "Hiển thị", dataIndex: "active", key: "active" },
  { title: "Hành động", key: "actions", fixed: "right", width: 200 },
];

const buildMenuTree = data => {
  const map = new Map();
  const roots = [];
  data.forEach(item => map.set(item.id, { ...item, children: [] }));
  map.forEach(item => {
    if (item.idMenuCha && map.has(item.idMenuCha)) {
      map.get(item.idMenuCha).children.push(item);
    } else {
      roots.push(item);
    }
  });
  return roots;
};

const menuTree = computed(() => buildMenuTree(rawMenus.value));

const fetchMenus = async param => {
  const { data, status } = await RestApi.menu.list({ params: param });
  if (status.value === "success") {
    rawMenus.value = data.value.data;
    pagination.value.total = data.value.totalrecord;
  } else {
    message.error("Lấy dữ liệu không thành công ~");
  }
};

const fetchAllMenus = async () => {
  const { data, status } = await RestApi.menu.list({ params: { PageIndex: 1, PageSize: 50 } });
  if (status.value === "success") {
    allMenus.value = data.value.data;
  } else {
    message.error("Không thể tải danh sách menu cha!");
  }
};

const handleTableChange = async paginationInfo => {
  param.value.PageIndex = paginationInfo.current;
  param.value.PageSize = paginationInfo.pageSize;
  pagination.value.current = paginationInfo.current;
  pagination.value.pageSize = paginationInfo.pageSize;
  await fetchMenus({ ...param.value });
};

const openForm = (menu = null) => {
  fetchAllMenus();
  if (menu) {
    Object.assign(form.value, { ...menu });
  } else {
    form.value = { id: null, name: "", url: "", idMenuCha: 0, order: 0, active: true };
  }
  showForm.value = true;
};

const handleSave = async () => {
  const send_data = {
    name: form.value.name,
    active: form.value.active,
    order: form.value.order,
    idMenuCha: form.value.idMenuCha,
    url: form.value.url,
  };

  let status_data;
  if (form.value.id) {
    send_data.id = form.value.id;
    const { status } = await RestApi.menu.update({ body: JSON.stringify(send_data) });
    status_data = status.value;
  } else {
    const { status } = await RestApi.menu.create({ body: JSON.stringify(send_data) });
    status_data = status.value;
  }

  if (status_data === "success") {
    await fetchMenus({ ...param.value });
    showForm.value = false;
    message.success("Lưu menu thành công!");
  } else {
    message.error("Không thể lưu menu!");
  }
};

const handleDelete = async delete_id => {
  try {
    console.log(delete_id);
    const { status } = await RestApi.menu.delete({ params: { id:delete_id } });
    if (status.value === "success") {
      message.success("Xóa dữ liệu thành công!");
      await fetchMenus({ ...param.value });
    } else {
      message.error("Xóa dữ liệu không thành công!");
    }
  } catch (error) {
    message.error("Đã xảy ra lỗi khi xóa dữ liệu!");
  }
};

await fetchMenus({ ...param.value });
const modelRef = reactive({
  name: "",
});
const formRef = ref({});
const resetForm = async () => {
  formRef.value.resetFields();
  param.value.search = "";
  pagination.current = 1;
  pagination.pageSize = 10;
  param.value.PageSize = 10;
  param.value.PageIndex = 1;
  await fetchMenus({ ...param.value });
};
const onSubmit = async value => {
  param.value.search = value.name;
  param.value.PageIndex = 1;
  pagination.current = 1;
  param.value.PageSize = 10;
  pagination.pageSize = 10;
  await fetchMenus({ ...param.value });
};
onMounted(() => {
  ////////////////////////////////Breadcrumb
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => {
    return [
      { url: "/page_management", title: "Quản lý site" },
      { url: "/page_management/menu", title: "Quản lý menu" },
    ];
  });
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>

<style scoped>
.ant-table-cell {
  vertical-align: middle;
}

.modal-responsive {
  max-width: 100vw;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .modal-responsive .ant-modal {
    width: 95vw !important;
    padding: 1rem;
  }
}

.ant-btn-primary:not(.ant-btn-dangerous) {
  background-color: #1890ff;
  border-color: #1890ff;
}

.ant-btn-dangerous {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}
</style>
