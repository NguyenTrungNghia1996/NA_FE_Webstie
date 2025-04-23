<template>
  <!-- <div>
    {{ roleData }}
    <RolePermissionTable v-model:roleData="roleData" :availablePermissions="availablePermissions" />
  </div> -->
  <div>
    <!-- Button to open Modal -->
    <a-button @click="openModal">Chỉnh sửa Quyền</a-button>

    <!-- Modal containing RolePermissionTable -->
    <a-modal width="100%" v-model:visible="isModalVisible" title="Chỉnh sửa quyền" @ok="handleSave" @cancel="handleCancel">
      <RolePermissionTable :roleData="roleSource" :availablePermissions="availablePermissions" @update:roleData="updateRoleData" />
    </a-modal>
  </div>
</template>
<script setup>
const isModalVisible = ref(false);
const openModal = () => {
  isModalVisible.value = true;
};
const handleCancel = () => {
  isModalVisible.value = false;
};
const handleSave = () => {
  console.log("Saved data:", roleData.value);
  isModalVisible.value = false;
};

// Update roleData when changes are made in child component
const updateRoleData = newRoleData => {
  roleData.value = newRoleData;
};
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
</script>
