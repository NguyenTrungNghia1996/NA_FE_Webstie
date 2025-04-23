<template>
  <div class="flex flex-col min-h-full">
    <div class="bg-white flex-1 p-3 overflow-auto">
      <div class="flex justify-end py-3">
        <a-button @click="showModal" type="primary">
          <span class="flex justify-center items-center">Thêm mới</span>
        </a-button>
      </div>
      <a-table size="small" :columns="columns" :data-source="dataSource" :pagination="pagination" @change="handleTableChange" row-key="id" bordered>
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
          </template>
          <template v-else-if="column.key === 'actions'">
            <a-space>
              <a-button size="small" type="primary">Sửa</a-button>
              <a-popconfirm title="Bạn có chắc chắn muốn xoá người dùng này không?" ok-text="Xoá" cancel-text="Huỷ" @confirm="handleDelete(record.id)">
                <a-button size="small" type="primary" danger>Xoá</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <a-modal v-model:open="isModalVisible" title="Thêm người dùng">
      
      <!-- <a-form :model="formState" :rules="rules" ref="formRef" label-col="{ span: 6 }" wrapper-col="{ span: 18 }">
        <a-form-item label="Tên tài khoản" name="userName">
          <a-input v-model:value="formState.userName" />
        </a-form-item>
      </a-form> -->
    </a-modal>
  </div>
</template>

<script setup>
const { RestApi } = useApi();
const dataSource = ref([]);
const isModalVisible = ref(false);
const param = ref({ PageIndex: 1, PageSize: 10 });
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trên tổng số ${total} bản ghi`,
  showSizeChanger: true,
  pageSizeOptions: ["1", "10", "20", "50", "100"],
});

const columns = [
  {
    title: "STT",
    key: "index",
  },
  {
    title: "Tên tài khoản",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Chức năng",
    key: "actions",
  },
];
const handleTableChange = async (paginationInfo, filters, sorter) => {
  param.value.PageIndex = paginationInfo.current;
  param.value.PageSize = paginationInfo.pageSize;
  pagination.current = paginationInfo.current;
  pagination.pageSize = paginationInfo.pageSize;
  await loadData({ ...param.value });
};

const loadData = async param => {
  const { data, status } = await RestApi.user.list({ params: param });
  if (status.value === "success") {
    dataSource.value = data.value.data;
    pagination.total = data.value.total || 0;
  } else {
    message.error("Lỗi lấy dữ liệu");
  }
};

await loadData({ ...param.value });

const handleDelete = async record => {
  const { status } = await RestApi.user.delete({ params: { id: record } });
  if (status.value === "success") {
    message.success("Xoá thành công");
    await loadData({ ...param.value });
  } else {
    message.error("Lỗi khi xoá người dùng");
  }
};

const showModal = () => {
   console.log("aaaaaaaaaaaa");
  isModalVisible.value = true;
};

onMounted(() => {
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => [
    { url: "/system_management", title: "Quản lý hệ thống" },
    { url: "/system_management/user", title: "Quản lý người dùng" },
  ]);
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>

<style scoped></style>
