<template>
  <div class="p-4 sm:p-6">
    <!-- Tên nhóm quyền và mô tả -->
    <div class="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label for="roleName" class="block text-sm font-medium text-gray-700">Tên nhóm quyền</label>
        <a-input v-model:value="localRoleData.roleGroupName" placeholder="Tên quyền" @blur="handleRoleNameChange" />
      </div>
      <div>
        <label for="moTa" class="block text-sm font-medium text-gray-700">Mô tả</label>
        <a-input v-model:value="localRoleData.moTa" placeholder="Mô tả" @blur="handleMoTaChange" />
      </div>
      <div>
        <label for="search" class="block text-sm font-medium text-gray-700">Tìm kiếm</label>
        <a-input v-model:value="searchTerm" placeholder="Tìm chức năng..." allow-clear />
      </div>
    </div>
    <!-- Bảng quyền -->
    <a-table :columns="tableColumns" :dataSource="filteredFunctions" :pagination="false" rowKey="id" :scroll="{ x: 500, y: 500 }">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          {{ index + 1 }}
        </template>
        <template v-else-if="column.key === 'functionName'">
          {{ record.functionName }}
        </template>
        <template v-else>
          <a-checkbox :checked="hasPermission(record, column.key)" @change="handlePermissionChange(record, { id: column.key }, $event.target.checked)" />
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
const props = defineProps({
  roleData: Object,
  availablePermissions: Array,
});

const emit = defineEmits(["update:roleData"]);

const localRoleData = ref(JSON.parse(JSON.stringify(props.roleData)));
const searchTerm = ref("");

watch(
  () => props.roleData,
  newData => {
    localRoleData.value = JSON.parse(JSON.stringify(newData));
  },
  { deep: true },
);

const hasPermission = (func, permissionId) => {
  return func.dataPermission?.includes(permissionId);
};

const handlePermissionChange = (func, permission, checked) => {
  if (!func.dataPermission) {
    func.dataPermission = [];
  }
  const existingPermissionIndex = func.dataPermission.indexOf(permission.id);
  if (checked) {
    if (existingPermissionIndex === -1) {
      func.dataPermission.push(permission.id);
    }
  } else {
    if (existingPermissionIndex !== -1) {
      func.dataPermission.splice(existingPermissionIndex, 1);
    }
  }
  emit("update:roleData", localRoleData.value);
};

const handleRoleNameChange = () => {
  emit("update:roleData", localRoleData.value);
};

const handleMoTaChange = () => {
  emit("update:roleData", localRoleData.value);
};

const filteredFunctions = computed(() => {
  return localRoleData.value.dataPhanQuyen.filter(func => func.functionName.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const tableColumns = computed(() => [
  {
    title: "#",
    key: "index",
    width: 50,
    align: "center",
  },
  {
    title: "Tên chức năng",
    dataIndex: "functionName",
    key: "functionName",
    ellipsis: true,
  },
  ...props.availablePermissions.map(perm => ({
    title: perm.permissionName,
    key: perm.id,
    align: "center",
  })),
]);
</script>

<style scoped>
/* Optional style tweak */
</style>
