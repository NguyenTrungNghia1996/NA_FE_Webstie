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
        <a-button @click="showModal" type="primary">Thêm mới</a-button>
      </div>
      <ClientOnly>
        <a-table size="small" :data-source="dataSource" :columns="columns" row-key="id" :pagination="pagination" :scroll="{ x: 'max-content' }" class="overflow-auto" @change="handleTableChange" bordered>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'ngaySinh'">
              {{ record.ngaySinh ? moment(record.ngaySinh).format("DD/MM/YYYY") : "" }}
            </template>
            <template v-else-if="column.key === 'ngayBatDau'">
              {{ record.ngayBatDau ? moment(record.ngayBatDau).format("DD/MM/YYYY") : "" }}
            </template>
            <template v-else-if="column.key === 'chucVu'">
              {{ getPositionName(record.idChucVu) }}
            </template>
            <template v-else-if="column.key === 'gioiTinh'">
              {{ record.gioiTinh === 1 ? "Nam" : record.gioiTinh === 0 ? "Nữ" : "Khác" }}
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

    <a-modal v-model:open="modalVisible" :title="isEditMode ? 'Cập nhật nhân viên' : 'Thêm mới nhân viên'" @ok="handleSave" @cancel="closeModal">
      <a-form layout="vertical" :model="formState" ref="modalFormRef" class="grid grid-cols-2 gap-3">
        <a-form-item label="Tên nhân viên" name="tenNhanVien" :rules="[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]">
          <a-input v-model:value="formState.tenNhanVien" />
        </a-form-item>
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            {
              type: 'email',
              message: 'Email không hợp lệ',
            },
          ]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item
          label="Số điện thoại"
          name="phone"
          :rules="[
            {
              pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              message: 'Số điện thoại không hợp lệ',
            },
          ]"
        >
          <a-input v-model:value="formState.phone" />
        </a-form-item>
        <a-form-item label="Giới tính" name="gioiTinh" :rules="[{ required: true, message: 'Vui lòng chọn giới tính' }]">
          <a-select v-model:value="formState.gioiTinh" placeholder="Chọn giới tính">
            <a-select-option :value="1">Nam</a-select-option>
            <a-select-option :value="0">Nữ</a-select-option>
            <a-select-option :value="2">Khác</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Ngày sinh" name="ngaySinh" :rules="[{ required: true, message: 'Vui lòng chọn ngày sinh' }]">
          <a-date-picker v-model:value="formState.ngaySinh" format="DD/MM/YYYY" value-format="YYYY-MM-DDTHH:mm:ss" style="width: 100%" />
        </a-form-item>
        <a-form-item label="Ngày bắt đầu làm việc" name="ngayBatDau" :rules="[{ required: true, message: 'Vui lòng chọn ngày bắt đầu làm việc' }]">
          <a-date-picker v-model:value="formState.ngayBatDau" format="DD/MM/YYYY" value-format="YYYY-MM-DDTHH:mm:ss" style="width: 100%" />
        </a-form-item>
        <a-form-item label="Quê quán" name="queQuan">
          <a-input v-model:value="formState.queQuan" />
        </a-form-item>
        <a-form-item label="Chức vụ" name="idChucVu" :rules="[{ required: true, message: 'Vui lòng chọn chức vụ' }]">
          <a-select v-model:value="formState.idChucVu" placeholder="Chọn chức vụ" :options="positionOptions" :field-names="{ label: 'tenChucVu', value: 'id' }" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
const modalFormRef = ref(null);
const nuxtApp = useNuxtApp();
const { RestApi } = useApi();
const t = nuxtApp.$i18n.t;
const isEditMode = ref(false);

const param = ref({ search: "", PageIndex: 1, PageSize: 10 });
const dataSource = ref([]);
const positionOptions = ref([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trên tổng số ${total} bản ghi`,
  showSizeChanger: true,
  pageSizeOptions: ["1", "10", "20", "50", "100"],
});

const modelRef = reactive({ name: "" });
const formRef = ref(null);
const modalVisible = ref(false);

const resetFormState = () => ({
  id: undefined,
  tenNhanVien: "",
  email: "",
  phone: "",
  gioiTinh: 1,
  ngaySinh: null,
  ngayBatDau: null,
  queQuan: "",
  idChucVu: null,
});

const formState = ref(resetFormState());

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

const handleDelete = async record => {
  const { status } = await RestApi.staff.delete({ params: { id: record.id } });
  if (status.value === "success") {
    message.success("Đã xoá nhân viên");
    await loadData({ ...param.value });
  } else {
    message.error("Xoá thất bại");
  }
};

const closeModal = () => {
  modalVisible.value = false;
  formState.value = resetFormState();
};

const showModal = () => {
  isEditMode.value = false;
  formState.value = resetFormState();
  modalVisible.value = true;
};

const showEdit = async record => {
  isEditMode.value = true;
  formState.value = { ...resetFormState(), ...record };
  modalVisible.value = true;
};

const handleSave = async () => {
  try {
    await modalFormRef.value.validateFields();
    const payload = {
      ...formState.value,
      ngaySinh: formState.value.ngaySinh ? moment(formState.value.ngaySinh).format("YYYY-MM-DDT00:00:00") : "",
      ngayBatDau: formState.value.ngayBatDau ? moment(formState.value.ngayBatDau).format("YYYY-MM-DDT00:00:00") : "",
    };

    if (!isEditMode.value) {
      delete payload.id;
      delete payload.stt;
    }
    let status;
    if (isEditMode.value) {
      ({ status } = await RestApi.staff.update({ body: JSON.stringify(payload) }));
    } else {
      ({ status } = await RestApi.staff.create({ body: JSON.stringify(payload) }));
    }

    if (status.value === "success") {
      message.success(isEditMode.value ? "Cập nhật thành công" : "Thêm mới thành công");
      closeModal();
      await loadData(param.value);
    } else {
      message.error("Lỗi xử lý");
    }
  } catch (error) {
    message.error("Validation Failed:", error);
  }
};

const getPositionName = id => {
  const position = positionOptions.value.find(item => item.id === id);
  return position ? position.tenChucVu : "";
};

const columns = computed(() => [
  { title: "STT", dataIndex: "stt", key: "stt", width: 60 },
  { title: "Tên Nhân Viên", dataIndex: "tenNhanVien", key: "tenNhanVien" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Số Điện Thoại", dataIndex: "phone", key: "phone" },
  { title: "Ngày Sinh", dataIndex: "ngaySinh", key: "ngaySinh" },
  { title: "Ngày bắt đầu", dataIndex: "ngayBatDau", key: "ngayBatDau" },
  { title: "Quê Quán", dataIndex: "queQuan", key: "queQuan" },
  { title: "Chức Vụ", key: "chucVu" },
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

const loadPositionData = async () => {
  const { data, status } = await RestApi.staff.get_position();
  if (status.value === "success") {
    positionOptions.value = data.value.data;
  } else {
    message.error("Lỗi lấy dữ liệu chức vụ");
  }
};

onMounted(async () => {
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => [
    { url: "/system_management", title: "Quản lý hệ thống" },
    { url: "/system_management/staff", title: "Quản lý nhân viên" },
  ]);
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });

  await loadPositionData();
  await loadData({ ...param.value });
});
</script>
