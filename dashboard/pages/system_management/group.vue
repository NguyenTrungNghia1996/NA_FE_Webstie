<template>
  <div class="flex flex-col min-h-full">
    <div class="bg-white flex-1 p-3 overflow-auto">
      <div class="flex justify-end py-3">
        <a-button @click="showModal" type="primary">
          <span class="flex justify-center items-center">Thêm mới</span>
        </a-button>
      </div>
      <ClientOnly>
        <a-table size="small" :columns="columns" :data-source="dataSource" :pagination="pagination" row-key="id" bordered :scroll="{ x: 800 }" @change="handleTableChange">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <div class="flex gap-2 justify-center">
                <a-button size="small" type="primary" @click="handleEdit(record)">Sửa</a-button>
                <a-popconfirm title="Bạn có chắc chắn muốn xoá nhóm này?" ok-text="Xoá" cancel-text="Huỷ" @confirm="() => handleDelete(record)">
                  <a-button size="small" type="primary" danger>Xoá</a-button>
                </a-popconfirm>
              </div>
            </template>
          </template>
        </a-table>
      </ClientOnly>
    </div>
    <a-modal width="100%" v-model:open="isModalVisible" :title="isEditMode ? 'Chỉnh sửa nhóm quyền' : 'Thêm nhóm quyền'" @ok="handleSave" @cancel="handleCancel">
      <RolePermissionTable :roleData="modalRule" :availablePermissions="availablePermissions" @update:roleData="updateRoleData" ref="roleFormRef" />
    </a-modal>
  </div>
</template>

<script setup>
const { RestApi } = useApi();
const roleFormRef = ref();
const dataSource = ref([]);
const isEditMode = ref(false);
const isModalVisible = ref(false);
const modalRule = ref({});
//table
const updateRoleData = newRoleData => {
  modalRule.value = newRoleData;
};

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trên tổng số ${total} bản ghi`,
  showSizeChanger: true,
  pageSizeOptions: ["1", "10", "20", "50", "100"],
});
const handleTableChange = async (paginationInfo, filters, sorter) => {
  param.value.PageIndex = paginationInfo.current;
  param.value.PageSize = paginationInfo.pageSize;
  pagination.current = paginationInfo.current;
  pagination.pageSize = paginationInfo.pageSize;
  await loadData({ ...param.value });
};
const param = ref({ PageIndex: 1, PageSize: 10 });
const loadData = async param => {
  const { data, status } = await RestApi.permission.list_group({ params: param });
  if (status.value === "success") {
    dataSource.value = data.value.data;
    pagination.total = data.value.total || 0;
  } else {
    message.error("Lỗi lấy dữ liệu");
  }
};
const columns = [
  {
    title: "Tên nhóm",
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Mô tả",
    dataIndex: "moTa",
    key: "moTa",
    responsive: ["md"],
  },
  {
    title: "Hành động",
    key: "action",
    fixed: "right",
    width: 120,
  },
];
await loadData({ ...param.value });

//add
function convertMenuToRolePermission(inputData, roleGroupName = "", moTa = "") {
  // Kiểm tra nếu đầu vào không hợp lệ
  if (!inputData || !inputData.menu || !Array.isArray(inputData.menu)) {
    throw new Error("Input data is invalid");
  }
  const outputData = {
    roleGroupName: roleGroupName,
    moTa: moTa,
    dataPhanQuyen: inputData.menu.map(item => ({
      id: item.id,
      functionName: item.functionName,
      dataPermission: []
    }))
  };
  return outputData;
}
const roleSource = ref({});
const { data, status } = await RestApi.menu_backend.list_all();
if (status.value === "success") {
  roleSource.value = convertMenuToRolePermission(data.value);
} else {
  message.error("Lỗi lấy dữ liệu phần quyền")
}

const availablePermissions = ref([
  { id: 1, permissionName: "Truy cập" },
  { id: 2, permissionName: "Thêm" },
  { id: 3, permissionName: "Sửa" },
  { id: 4, permissionName: "Xóa" },
]);
const showModal = async () => {
  isEditMode.value = false;
  await nextTick(); // Đảm bảo roleFormRef sẵn sàng
  roleFormRef.value?.resetForm?.();
  Object.assign(modalRule.value, roleSource.value);
  isModalVisible.value = true;
};

//edit
const handleEdit = async record => {
  isEditMode.value = true;
  const { data, status } = await RestApi.permission.get({ params: { roleId: record.id } });
  if (status.value === "success") {
    Object.assign(modalRule.value, data.value.data);
    isModalVisible.value = true;
  } else {
    message.error("Lấy dữ liệu chi tiết không thành công !");
  }
};
//delete
const handleDelete = async record => {
  const { data, status } = await RestApi.permission.delete({ params: { id: record.id } });
  if (status?.value === "success") {
    message.success("Xóa dữ liệu thành công !");
    await loadData({ ...param.value });
  } else {
    message.error("Xóa dữ liệu không thành công !");
  }
};
//all
const handleCancel = () => {
  isModalVisible.value = false;
  nextTick(() => {
    roleFormRef.value?.resetForm?.();
  });
};

const handleSave = async () => {
   try {
    const valid = await roleFormRef.value?.validateForm?.();
    if (!valid) return;

    const action = isEditMode.value ? "update" : "create";
    const successMessage = isEditMode.value ? "Cập nhật nhóm quyền thành công!" : "Thêm mới nhóm quyền thành công!";
    const errorMessage = isEditMode.value ? "Cập nhật nhóm quyền không thành công!" : "Thêm mới nhóm quyền không thành công!";

    const response = await RestApi.permission[action]({
      body: JSON.stringify(modalRule.value),
    });

    if (response.status.value === "success") {
      message.success(successMessage);
    } else {
      message.error(errorMessage);
      return;
    }

    // ✅ Thành công thì reset form và đóng modal
    await loadData({ ...param.value });
    roleFormRef.value?.resetForm?.();
    isModalVisible.value = false;

  } catch (error) {
    console.error("Lỗi xử lý nhóm quyền:", error);
    message.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
  }
};
onMounted(() => {
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => [
    { url: "/system_management", title: "Quản lý hệ thống" },
    { url: "/system_management/group", title: "Quản lý nhóm người dùng" },
  ]);
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>
