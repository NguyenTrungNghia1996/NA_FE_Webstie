<template>
  <div class="flex flex-col min-h-full">
    <div class="bg-white flex-1 p-3 overflow-auto">
      <div class="mb-4 flex justify-end">
        <a-button type="primary" @click="showAddModal" :loading="loading">Thêm Menu mới</a-button>
      </div>
      <a-spin :spinning="loading">
        <div class="overflow-x-auto bg-white rounded-lg shadow">
          <a-table size="small" :columns="columns" :data-source="processedMenu" :pagination="false" row-key="id" :default-expand-all-rows="true" :loading="loading" :scroll="{ x: 'max-content' }" bordered>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'functionName'">
                <span v-if="!record.parentId" class="font-semibold">
                  {{ record.functionName }}
                </span>
                <span v-else class="pl-8">
                  {{ record.functionName }}
                </span>
              </template>

              <template v-if="column.key === 'link'">
                <span v-if="record.link" class="text-blue-500 break-all">
                  {{ record.link }}
                </span>
                <span v-else class="text-gray-400"> Không có link </span>
              </template>

              <template v-if="column.key === 'actions'">
                <div class="flex flex-wrap gap-2">
                  <a-button type="primary" size="small" @click="editItem(record)" :loading="record.id === editingId"> Sửa </a-button>
                  <a-button type="primary" size="small" danger @click="deleteItem(record)" :loading="record.id === deletingId"> Xóa </a-button>
                </div>
              </template>
            </template>

            <template #emptyText>
              <div class="py-8 text-center">
                <a-empty description="Không có dữ liệu menu" />
              </div>
            </template>
          </a-table>
        </div>
      </a-spin>
      <a-modal v-model:open="modalVisible" :title="isEditing ? 'Chỉnh sửa Menu' : 'Thêm Menu mới'" @ok="handleOk" @cancel="handleCancel" :confirm-loading="confirmLoading" width="90%" :style="{ maxWidth: '600px' }" :destroyOnClose="true">
        <a-spin :spinning="modalLoading">
          <a-form :model="formState" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" autocomplete="off" layout="vertical">
            <a-form-item label="Tên Menu" name="functionName" :rules="[{ required: true, message: 'Vui lòng nhập tên menu!' }]">
              <a-input v-model:value="formState.functionName" placeholder="Nhập tên menu" />
            </a-form-item>

            <a-form-item label="Menu cha" name="parentId">
              <a-select v-model:value="formState.parentId" placeholder="Chọn menu cha" allow-clear :loading="loadingParentMenus">
                <a-select-option :value="null">Không có (Menu chính)</a-select-option>
                <a-select-option v-for="parent in parentMenus" :key="parent.id" :value="parent.id">
                  {{ parent.functionName }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="Đường dẫn" name="link">
              <a-input v-model:value="formState.link" placeholder="Ví dụ: /path/to/page" />
            </a-form-item>
          </a-form>
        </a-spin>
      </a-modal>
    </div>
  </div>
</template>

<script setup>
const { RestApi } = useApi();

const menuData = ref([]);
const loading = ref(false);
const modalLoading = ref(false);
const loadingParentMenus = ref(false);
const editingId = ref(null);
const deletingId = ref(null);

const columns = [
  {
    title: "Tên chức năng",
    dataIndex: "functionName",
    key: "functionName",
    width: "30%",
  },
  {
    title: "Menu cha",
    dataIndex: "parentName",
    key: "parentName",
    width: "25%",
  },
  {
    title: "Đường dẫn",
    dataIndex: "link",
    key: "link",
    width: "25%",
  },
  {
    title: "Thao tác",
    key: "actions",
    width: 200,
    fixed: "right",
  },
];

// Modal and form state
const modalVisible = ref(false);
const confirmLoading = ref(false);
const isEditing = ref(false);

const formState = reactive({
  id: null,
  functionName: "",
  parentId: null,
  link: "",
});

// Hàm load dữ liệu từ API
const fetchMenuData = async () => {
  try {
    loading.value = true;
    const { data, status } = await RestApi.menu_backend.list_full_detail({
      body: JSON.stringify({
        pageIndex: "1",
        pageSize: "100",
      }),
    });
    if (status.value === "success") {
      menuData.value = data.value.menu;
    } else {
      message.error("Không thể tải dữ liệu menu");
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    message.error("Không thể tải dữ liệu menu");
  } finally {
    loading.value = false;
  }
};

const fetchParentMenus = async () => {
  try {
    loadingParentMenus.value = true;
    // Nếu cần API riêng để lấy parent menus
  } finally {
    loadingParentMenus.value = false;
  }
};

await fetchMenuData();
// onMounted(async () => {
//   await Promise.all([fetchMenuData(), fetchParentMenus()]);
// });

const parentMenus = computed(() => {
  return menuData.value.filter(item => !item.parentId);
});

const processedMenu = computed(() => {
  const parents = menuData.value.filter(item => !item.parentId);
  const children = menuData.value.filter(item => item.parentId);

  return parents.map(parent => {
    const childItems = children.filter(child => child.parentId === parent.id);
    return {
      ...parent,
      children: childItems.length > 0 ? childItems : undefined,
    };
  });
});

const showAddModal = () => {
  isEditing.value = false;
  resetForm();
  modalVisible.value = true;
};

const editItem = record => {
  isEditing.value = true;
  editingId.value = record.id;
  Object.assign(formState, { ...record });
  modalVisible.value = true;
};

const deleteItem = async record => {
  Modal.confirm({
    title: "Xác nhận xóa",
    content: `Bạn có chắc chắn muốn xóa menu "${record.functionName}"?`,
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    async onOk() {
      try {
        deletingId.value = record.id;
        const { data, status } = await RestApi.menu_backend.delete({ params: { id: record.id } });
        if (status.value === "success") {
          message.success("Xóa menu thành công");
          await fetchMenuData();
        } else {
          message.error("Xóa menu thất bại");
        }
      } catch (error) {
        console.error("Lỗi khi xóa menu:", error);
        message.error("Không thể xóa menu");
      } finally {
        deletingId.value = null;
      }
    },
  });
};

const handleOk = async () => {
  try {
    confirmLoading.value = true;
    modalLoading.value = true;

    if (isEditing.value) {
      const { data, status } = await RestApi.menu_backend.update({ body: JSON.stringify(formState) });
      if (status.value === "success") {
        message.success("Cập nhật menu thành công");
        await fetchMenuData();
        modalVisible.value = false;
      } else {
        message.error("Cập nhật menu thất bại");
      }
    } else {
      delete formState.id;
      const { data, status } = await RestApi.menu_backend.create({ body: JSON.stringify(formState) });
      if (status.value === "success") {
        message.success("Thêm mới menu thành công");
        await fetchMenuData();
        modalVisible.value = false;
      } else {
        message.error("Thêm mới menu thất bại");
      }
    }
  } catch (error) {
    console.error("Lỗi khi lưu menu:", error);
    message.error("Không thể lưu menu");
  } finally {
    confirmLoading.value = false;
    modalLoading.value = false;
    editingId.value = null;
  }
};

const handleCancel = () => {
  modalVisible.value = false;
  resetForm();
  editingId.value = null;
};

const resetForm = () => {
  formState.id = null;
  formState.functionName = "";
  formState.parentId = null;
  formState.link = "";
};
</script>

<style scoped>
.container {
  max-width: 100%;
  padding: 0.5rem;
}

.ant-table {
  font-size: 14px;
}

.ant-table-cell.ant-table-cell-actions {
  position: sticky;
  right: 0;
  background: white;
  z-index: 1;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .container {
    padding: 0.25rem;
  }

  .ant-btn {
    padding: 0 6px;
    font-size: 12px;
  }

  .ant-form-item-label > label {
    font-size: 14px;
  }

  .ant-input,
  .ant-select-selector {
    font-size: 14px;
    padding: 4px 11px;
  }

  .ant-table {
    font-size: 13px;
  }

  .ant-modal-body {
    padding: 16px;
  }
}

.break-all {
  word-break: break-all;
}
</style>
