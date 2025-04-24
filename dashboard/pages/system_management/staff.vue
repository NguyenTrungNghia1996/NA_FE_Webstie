<template>
  <div class="flex flex-col min-h-full">
    <div class="bg-white p-3">
      <a-form class="grid grid-cols-1 md:grid-cols-2 gap-2" :model="modelRef" ref="formRef" autocomplete="off" layout="horizontal" @finish="onSubmit">
        <a-form-item class="!mb-0" label="Tìm Kiếm" name="name">
          <a-input v-model:value="modelRef.name" placeholder="Tìm kiếm nhân viên" />
        </a-form-item>
        <div class="flex flex-wrap gap-2 justify-end mt-2 md:mt-0">
          <a-button @click="resetForm" class="font-roboto w-full md:w-auto">Đặt Lại</a-button>
          <a-button class="font-roboto w-full md:w-auto" htmlType="submit" type="primary">Tìm Kiếm</a-button>
        </div>
      </a-form>
    </div>

    <div class="bg-white flex-1 mt-2 p-3 overflow-auto">
      <div class="flex justify-end py-3">
        <a-button @click="() => showModal()" type="primary">Thêm mới</a-button>
      </div>
      <ClientOnly>
        <a-table size="small" :data-source="dataSource" :columns="columns" row-key="id" :pagination="pagination" :scroll="{ x: 'max-content' }" class="overflow-auto" @change="handleTableChange">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'ngaySinh'">
              {{ record.ngaySinh ? moment(record.ngaySinh).format("DD/MM/YYYY") : "" }}
            </template>
            <template v-else-if="column.key === 'action'">
              <div class="flex gap-2">
                <a-button type="primary" size="small" @click="showEdit(record)">Sửa</a-button>
                <a-popconfirm title="Bạn có chắc chắn muốn xoá?" ok-text="Xoá" cancel-text="Huỷ" @confirm="handleDelete(record)">
                  <a-button type="primary" size="small" danger>Xoá</a-button>
                </a-popconfirm>
              </div>
            </template>
            <template v-else>
              {{ record[column.dataIndex] }}
            </template>
          </template>
        </a-table>
      </ClientOnly>
    </div>

    <a-modal v-model:open="modalVisible" :title="isEditMode ? 'Cập nhật nhân viên' : 'Thêm mới nhân viên'" @ok="handleSave" @cancel="() => (modalVisible = false)">
      <a-form layout="vertical">
        <a-form-item label="Tên nhân viên"><a-input v-model:value="formState.tenNhanVien" /></a-form-item>
        <a-form-item label="Email"><a-input v-model:value="formState.email" /></a-form-item>
        <a-form-item label="Số điện thoại"><a-input v-model:value="formState.phone" /></a-form-item>
        <a-form-item label="Ngày sinh">
          <a-date-picker v-model:value="formState.ngaySinh" format="DD/MM/YYYY" value-format="YYYY-MM-DDTHH:mm:ss" style="width: 100%" />
        </a-form-item>
        <a-form-item label="Quê quán"><a-input v-model:value="formState.queQuan" /></a-form-item>
        <a-form-item label="Chức vụ"><a-input v-model:value="formState.chucVu" /></a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

const nuxtApp = useNuxtApp();
const { RestApi } = useApi();
const t = nuxtApp.$i18n.t;
const isEditMode = ref(false);

const param = ref({ search: "", PageIndex: 1, PageSize: 10 });
const dataSource = ref([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trên tổng số ${total} bản ghi`,
  showSizeChanger: true,
  pageSizeOptions: ["1","10", "20", "50", "100"],
});

const modelRef = reactive({ name: "" });
const formRef = ref(null);
const modalVisible = ref(false);

const formState = ref({
  tenNhanVien: "",
  email: "",
  phone: "",
  ngaySinh: null,
  queQuan: "",
  chucVu: "",
});

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
    param.value.PageIndex = 1;
    param.value.PageSize = 10;
    pagination.current = 1;
    pagination.pageSize = 10;
    modelRef.name = "";
  }
};

const onSubmit = async () => {
  param.value.search = modelRef.name;
  await loadData({ ...param.value });
};

const handleTableChange = async paginationInfo => {
  param.value.PageIndex = paginationInfo.current;
  param.value.PageSize = paginationInfo.pageSize;
  pagination.current = paginationInfo.current;
  pagination.pageSize = paginationInfo.pageSize;
  await loadData({ ...param.value });
};
//delete
const handleDelete = async record => {
  const { status } = await RestApi.staff.delete({ id: record.id });
  if (status.value === "success") {
    message.success("Đã xoá nhân viên");
    await loadData({ ...param.value });
  } else {
    message.error("Xoá thất bại");
  }
};

const handleSave = async () => {
  // const payload = {
  //   ...formState,
  //   ngaySinh: formState.ngaySinh ? moment(formState.ngaySinh).format("YYYY-MM-DDT00:00:00") : null,
  // };
  console.log(formState);
  let status;
  // if (editData.value) {
  //   // ({ status } = await RestApi.staff.update({ id: editData.value.id, ...payload }));
  // } else {
  //   // ({ status } = await RestApi.staff.create(payload));
  // }

  // if (status.value === "success") {
  //   message.success(editData.value ? "Cập nhật thành công" : "Thêm mới thành công");
  //   modalVisible.value = false;
  //   await loadData(param.value);
  // } else {
  //   message.error("Lỗi xử lý");
  // }
  modalVisible.value = false;
};
//create
const showModal = () => {
  isEditMode.value = false;
  Object.assign(formState.value, {
    id: null,
    idChucVu: null,
    stt: null,
    tenNhanVien: "",
    email: "",
    phone: "",
    ngaySinh: null,
    queQuan: "",
    chucVu: "",
  });
  modalVisible.value = true;
};
const showEdit = record => {
  isEditMode.value = true;
  Object.assign(formState.value, { ...record });
  modalVisible.value = true;
};

const columns = computed(() => [
  { title: "STT", dataIndex: "stt", key: "stt", width: 60 },
  { title: "Tên Nhân Viên", dataIndex: "tenNhanVien", key: "tenNhanVien" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Số Điện Thoại", dataIndex: "phone", key: "phone" },
  { title: "Ngày Sinh", dataIndex: "ngaySinh", key: "ngaySinh" },
  { title: "Quê Quán", dataIndex: "queQuan", key: "queQuan" },
  { title: "Chức Vụ", dataIndex: "chucVu", key: "chucVu" },
  { title: "Hành động", key: "action", fixed: "right", width: 140 },
]);

const loadData = async param => {
  const { data, status } = await RestApi.staff.list({ params: param });
  if (status.value === "success") {
    dataSource.value = data.value.data;
    pagination.total = data.value.totalrecord || 0;
  } else {
    message.error("Lỗi lấy dữ liệu");
  }
};

await loadData({ ...param.value });

onMounted(() => {
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => [
    { url: "/system_management", title: "Quản lý hệ thống" },
    { url: "/system_management/staff", title: "Quản lý nhân viên" },
  ]);
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>
