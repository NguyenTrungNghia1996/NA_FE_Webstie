<template>
  <div class="flex flex-col min-h-full">
    <div class="bg-white flex-1 mt-2 p-3 overflow-auto">
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
      <RolePermissionTable :roleData="modalRule" :availablePermissions="availablePermissions" @update:roleData="updateRoleData" />
    </a-modal>
  </div>
</template>

<script setup>
const { RestApi } = useApi();
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
const roleSource = ref({
  roleGroupName: "",
  moTa: "",
  dataPhanQuyen: [
    {
      id: 1,
      functionName: "Quản lý hệ thống",
      dataPermission: [],
    },
    {
      id: 2,
      functionName: "Quản lý nhóm người dùng",
      dataPermission: [],
    },
    {
      id: 3,
      functionName: "Quản lý người dùng",
      dataPermission: [],
    },
    {
      id: 4,
      functionName: "Quản lý website",
      dataPermission: [],
    },
    {
      id: 5,
      functionName: "Quản lý bán hàng",
      dataPermission: [],
    },
    {
      id: 6,
      functionName: "Quản lý công việc",
      dataPermission: [],
    },
    {
      id: 7,
      functionName: "Quản lý Menu",
      dataPermission: [],
    },
    {
      id: 8,
      functionName: "Quản lý Nhân sự",
      dataPermission: [],
    },
    {
      id: 9,
      functionName: "Danh sách nhân sự",
      dataPermission: [],
    },
    {
      id: 10,
      functionName: "Quản lý thông tin khách hàng",
      dataPermission: [],
    },
    {
      id: 11,
      functionName: "Quản lý thông tin dự án",
      dataPermission: [],
    },
    {
      id: 13,
      functionName: "Quản lý thông tin công ty",
      dataPermission: [],
    },
    {
      id: 14,
      functionName: "Quản lý dịch vụ",
      dataPermission: [],
    },
    {
      id: 15,
      functionName: "Quản lý sản phẩm",
      dataPermission: [],
    },
    {
      id: 16,
      functionName: "Quản lý Giới thiệu",
      dataPermission: [],
    },
    {
      id: 17,
      functionName: "Quản lý Danh mục",
      dataPermission: [],
    },
    {
      id: 18,
      functionName: "Danh Mục Chức vụ",
      dataPermission: [],
    },
    {
      id: 19,
      functionName: "Danh Mục Loại Sản Phẩm",
      dataPermission: [],
    },
    {
      id: 21,
      functionName: "Danh Mục Kho",
      dataPermission: [],
    },
    {
      id: 22,
      functionName: "Danh Mục Sản Phẩm",
      dataPermission: [],
    },
    {
      id: 24,
      functionName: "Danh Mục Nhà Cung Cấp",
      dataPermission: [],
    },
    {
      id: 34,
      functionName: "Hóa đơn Nhập",
      dataPermission: [],
    },
    {
      id: 36,
      functionName: "Nhập Kho",
      dataPermission: [],
    },
    {
      id: 37,
      functionName: "Danh Mục ĐVT",
      dataPermission: [],
    },
    {
      id: 39,
      functionName: "Xuất Kho",
      dataPermission: [],
    },
    {
      id: 40,
      functionName: "Hóa đơn Xuất",
      dataPermission: [],
    },
    {
      id: 41,
      functionName: "Kiểm Kê",
      dataPermission: [],
    },
    {
      id: 42,
      functionName: "Tồn Kho",
      dataPermission: [],
    },
    {
      id: 43,
      functionName: "Báo cáo Nhập",
      dataPermission: [],
    },
    {
      id: 44,
      functionName: "Báo cáo Xuất ",
      dataPermission: [],
    },
    {
      id: 45,
      functionName: "Báo cáo Xuất Nhập Tồn",
      dataPermission: [],
    },
    {
      id: 46,
      functionName: "Báo cáo Hóa đơn nhập",
      dataPermission: [],
    },
    {
      id: 47,
      functionName: "Báo cáo Hóa đơn xuất",
      dataPermission: [],
    },
  ],
});
const availablePermissions = ref([
  { id: 1, permissionName: "Truy cập" },
  { id: 2, permissionName: "Thêm" },
  { id: 3, permissionName: "Sửa" },
  { id: 4, permissionName: "Xóa" },
]);
const showModal = () => {
  isEditMode.value = false;
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
    message.error("Lấy dữ liệu chi tiết không thành công !")
  }
};
//delete
const handleDelete = async record => {
  const { data, status } = await RestApi.permission.delete({ params: { id: record.id } });
  if (status?.value === "success") { 
    message.success("Xóa dữ liệu thành công !")
    await loadData({ ...param.value });
  } else {
    message.error("Xóa dữ liệu không thành công !")
  }
};
//all
const handleCancel = () => {
  isModalVisible.value = false;
};


const handleSave = async () => {
  try {
    const action = isEditMode.value ? 'update' : 'create';
    const successMessage = isEditMode.value
      ? 'Cập nhật nhóm quyền thành công!'
      : 'Thêm mới nhóm quyền thành công!';
    const errorMessage = isEditMode.value
      ? 'Cập nhật nhóm quyền không thành công!'
      : 'Thêm mới nhóm quyền không thành công!';

    const response = await RestApi.permission[action]({
      body: JSON.stringify(modalRule.value),
    });

    if (response.status.value === 'success') {
      message.success(successMessage);
    } else {
      message.error(errorMessage);
    }
  } catch (error) {
    console.error('Lỗi xử lý nhóm quyền:', error);
    message.error('Đã xảy ra lỗi. Vui lòng thử lại sau!');
  } finally {
    await loadData({ ...param.value });
    isModalVisible.value = false;
  }
};
</script>
