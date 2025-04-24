<template>
  <div class="flex flex-col min-h-full">
    <div class="bg-white flex-1 p-3 overflow-auto">
      <div class="flex justify-end py-3">
        <a-button @click="showModal" type="primary">
          <span class="flex justify-center items-center">Thêm mới</span>
        </a-button>
      </div>
      <ClientOnly>
        <a-table size="small" :columns="columns" :data-source="dataSource" :pagination="pagination" @change="handleTableChange" row-key="id" bordered>
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
            </template>
            <template v-else-if="column.key === 'actions'">
              <a-space>
                <a-button size="small" type="primary" @click="handleEdit(record)" :loading="editLoading[record.id]"> Sửa </a-button>
                <a-popconfirm title="Bạn có chắc chắn muốn xoá người dùng này không?" ok-text="Xoá" cancel-text="Huỷ" @confirm="handleDelete(record.id)">
                  <a-button size="small" type="primary" danger>Xoá</a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </a-table>
      </ClientOnly>
    </div>

    <a-modal v-model:open="isModalVisible" :title="isEditMode ? 'Sửa người dùng' : 'Thêm người dùng'" @ok="handleSubmit" @cancel="handleCancel" :confirm-loading="submitLoading">
      <a-form class="grid grid-cols-2 gap-2" :model="formState" layout="vertical">
        <a-form-item label="Tên tài khoản" name="userName">
          <a-input v-model:value="formState.userName" placeholder="Nhập tên tài khoản" />
        </a-form-item>

        <a-form-item label="Nhân viên" name="idUserInfo">
          <a-select v-model:value="formState.idUserInfo" placeholder="Chọn nhân viên" :options="staffOptions" :field-names="{ label: 'label', value: 'value' }">
            <template #option="{ label }">
              <div class="flex justify-between">
                <span>{{ label }}</span>
              </div>
            </template>
          </a-select>
        </a-form-item>

        <a-form-item label="Nhóm quyền" name="idRoles" class="col">
          <a-select v-model:value="formState.idRoles" mode="multiple" placeholder="Chọn nhóm quyền" :options="groupOptions" :field-names="{ label: 'name', value: 'id' }" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
const { RestApi } = useApi();
const dataSource = ref([]);
const isModalVisible = ref(false);
const isEditMode = ref(false);
const param = ref({ PageIndex: 1, PageSize: 10 });
const group_data = ref([]);
const staff_data = ref([]);
const editLoading = ref({});
const submitLoading = ref(false);

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trên tổng số ${total} bản ghi`,
  showSizeChanger: true,
  pageSizeOptions: ["1", "10", "20", "50", "100"],
});

const columns = [
  { title: "STT", key: "index" },
  { title: "Tên tài khoản", dataIndex: "userName", key: "userName" },
  { title: "Chức năng", key: "actions" },
];

const formState = reactive({
  userName: "",
  idUserInfo: 0,
  idRoles: [],
});

const groupOptions = computed(() => group_data.value);

const staffOptions = computed(() =>
  staff_data.value.map(item => ({
    label: `${item.tenNhanVien} - ${item.chucVu}`,
    value: item.id,
  })),
);

const handleTableChange = async paginationInfo => {
  param.value.PageIndex = paginationInfo.current;
  param.value.PageSize = paginationInfo.pageSize;
  pagination.current = paginationInfo.current;
  pagination.pageSize = paginationInfo.pageSize;
  await loadData({ ...param.value });
};

const loadData = async param => {
  try {
    const { data, status } = await RestApi.user.list({ params: param });
    if (status.value === "success") {
      dataSource.value = data.value.data;
      pagination.total = data.value.total || 0;
    } else {
      message.error("Lỗi lấy dữ liệu");
    }
  } catch (error) {
    console.error("Error loading data:", error);
    message.error("Đã xảy ra lỗi khi tải dữ liệu");
  }
};

const get_data_select = async () => {
  const { data: data_group, status: status_group } = await RestApi.permission.list_group({
    params: { PageIndex: 1, PageSize: 50 },
  });
  if (status_group.value === "success") {
    group_data.value = data_group.value.data.map(item => ({
      ...item,
      id: item.id.toUpperCase(),
    }));
  }

  const { data: data_staff, status: status_staff } = await RestApi.staff.list({
    params: { PageIndex: 1, PageSize: 50 },
  });
  if (status_staff.value === "success") {
    staff_data.value = data_staff.value.data;
  }
};
await loadData({ ...param.value });

const handleDelete = async id => {
  try {
    const { status } = await RestApi.user.delete({ params: { id } });
    if (status.value === "success") {
      message.success("Xoá thành công");
      await loadData({ ...param.value });
    } else {
      message.error("Lỗi khi xoá người dùng");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    message.error("Đã xảy ra lỗi khi xoá người dùng");
  }
};

const showModal = () => {
  isEditMode.value = false;
  get_data_select();
  Object.assign(formState, {
    userName: "",
    idUserInfo: null,
    idRoles: [],
  });
  isModalVisible.value = true;
};

const handleEdit = async record => {
  try {
    editLoading.value[record.id] = true;
    get_data_select();
    isEditMode.value = true;
    const { data, status } = await RestApi.user.get({ params: { idUser: record.id } });
    if (status.value === "success") {
      const user = data.value.data;
      Object.assign(formState, { ...user, idUserInfo: user.idUserInfo || null });
      isModalVisible.value = true;
    } else {
      message.error("Lỗi lấy dữ liệu");
    }
  } catch (error) {
    console.error("Error editing user:", error);
    message.error("Đã xảy ra lỗi khi tải thông tin người dùng");
  } finally {
    editLoading.value[record.id] = false;
  }
};

const handleSubmit = async () => {
  try {
    submitLoading.value = true;
    let st;
    console.log(formState);
    // if (isEditMode.value) {
    //   const { data, status } = await RestApi.user.update({
    //     body: JSON.stringify(formState),
    //   });
    //   st = status;
    // } else {
    //   const { data, status } = await RestApi.user.create({
    //     body: JSON.stringify(formState),
    //   });
    //   st = status;
    // }

    if (st === "success") {
      message.success(isEditMode.value ? "Cập nhật người dùng thành công!" : "Thêm mới người dùng thành công!");
    } else {
      message.error(isEditMode.value ? "Cập nhật người dùng không thành công!" : "Thêm mới người dùng không thành công!");
    }
  } catch (error) {
    console.error("Lỗi xử lý người dùng:", error);
    message.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
  } finally {
    await loadData({ ...param.value });
    isModalVisible.value = false;
    submitLoading.value = false;
  }
};

const handleCancel = () => {
  isModalVisible.value = false;
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
