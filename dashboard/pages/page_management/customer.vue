<template>
  <div class="flex flex-col min-h-full">
    <!-- Search Form -->
    <div class="bg-white p-3">
      <a-form class="grid grid-cols-1 md:grid-cols-2 gap-2" :model="modelRef" ref="formRef" autocomplete="off" layout="horizontal" @finish="onSubmit">
        <a-form-item class="!mb-0" label="Tìm Kiếm" name="name">
          <a-input v-model:value="modelRef.name" placeholder="Tìm kiếm khách hàng" />
        </a-form-item>
        <div class="flex flex-wrap gap-2 justify-end mt-2 md:mt-0">
          <a-button @click="resetForm" class="font-roboto w-full md:w-auto">Đặt Lại</a-button>
          <a-button class="font-roboto w-full md:w-auto" htmlType="submit" type="primary">Tìm Kiếm</a-button>
        </div>
      </a-form>
    </div>

    <!-- Customer Table -->
    <div class="bg-white p-3 mt-4">
      <div class="flex justify-end py-3">
        <a-button type="primary" @click="showAddModal" class="font-roboto w-full md:w-auto">
          <template #icon><plus-outlined /></template>
          Thêm mới
        </a-button>
      </div>
      <ClientOnly>
        <a-table size="small" :columns="columns" :dataSource="dataSource" :pagination="pagination" :rowKey="record => record.id" @change="handleTableChange" bordered :scroll="{ x: 'max-content' }" class="overflow-auto">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'active'">
              <a-tag :color="record.active ? 'green' : 'red'">
                {{ record.active ? "Hoạt động" : "Không hoạt động" }}
              </a-tag>
            </template>
            <template v-else-if="column.key === 'urlLogo'">
              <img v-if="record.urlLogo" :src="record.urlLogo" class="w-10 h-10 object-cover" />
              <span v-else>Không có ảnh</span>
            </template>
            <template v-else-if="column.key === 'action'">
              <div class="flex gap-2">
                <a-button type="primary" size="small" @click="showEditModal(record)">Sửa</a-button>
                <a-popconfirm title="Bạn có chắc muốn xóa?" ok-text="Xóa" cancel-text="Hủy" @confirm="handleDelete(record.id)">
                  <a-button type="primary" danger size="small">Xóa</a-button>
                </a-popconfirm>
              </div>
            </template>
          </template>
        </a-table>
      </ClientOnly>
    </div>

    <!-- Add/Edit Modal -->
    <a-modal v-model:open="modalVisible" :title="isEditMode ? 'Cập nhật khách hàng' : 'Thêm mới khách hàng'" @ok="handleModalOk" @cancel="handleModalCancel" :confirmLoading="confirmLoading" width="800px">
      <a-form ref="modalFormRef" :model="modalForm" :rules="formRules" layout="vertical">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Left Column -->
          <div>
            <a-form-item label="Tên khách hàng" name="tenKhachHang">
              <a-input v-model:value="modalForm.tenKhachHang" />
            </a-form-item>
            <a-form-item label="Địa chỉ" name="diaChi">
              <a-input v-model:value="modalForm.diaChi" />
            </a-form-item>
            <a-form-item label="Email" name="email">
              <a-input v-model:value="modalForm.email" />
            </a-form-item>
            <a-form-item label="Số điện thoại" name="soDienThoai">
              <a-input v-model:value="modalForm.soDienThoai" />
            </a-form-item>
          </div>
          <div>
            <a-form-item label="Mã số thuế" name="maSoThue">
              <a-input v-model:value="modalForm.maSoThue" />
            </a-form-item>
            <a-form-item label="Website" name="website">
              <a-input v-model:value="modalForm.website" />
            </a-form-item>
            <a-form-item label="Loại khách hàng" name="idLoaiKH">
              <a-select v-model:value="modalForm.idLoaiKH">
                <a-select-option :value="1">Cá nhân</a-select-option>
                <a-select-option :value="2">Doanh nghiệp</a-select-option>
              </a-select>
            </a-form-item>
            <div class="grid grid-cols-2 gap-2">
              <a-form-item label="Thứ tự" name="thutu">
                <a-input-number v-model:value="modalForm.thutu" class="w-full" />
              </a-form-item>
              <a-form-item label="Trạng thái" name="active">
                <a-switch v-model:checked="modalForm.active" />
              </a-form-item>
            </div>
          </div>
          <div class="col-span-2">
            <a-form-item label="URL Logo" name="urlLogo">
              <!-- <a-input v-model:value="modalForm.urlLogo" /> -->
              <div v-if="!modalForm.urlLogo" class="flex justify-center items-center h-32 border-dashed border-2 border-gray-400 rounded cursor-pointer" @click="triggerUpload">
                <span class="text-gray-500">Chưa có ảnh</span>
              </div>

              <div v-else class="flex flex-col justify-center">
                <img :src="modalForm.urlLogo" class="w-full max-h-60 object-contain border rounded cursor-pointer" @click="triggerUpload" />
              </div>
            </a-form-item>
          </div>
        </div>
        <input class="!hidden" ref="inputFileUpload" type="file" accept="image/jpeg,image/png" @change="onFilesChange" />
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
const { RestApi } = useApi();

// Table data and pagination
const dataSource = ref([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trên tổng số ${total} bản ghi`,
  showSizeChanger: true,
  pageSizeOptions: ["1", "10", "20", "50", "100"],
});

// Columns configuration with fixed action column
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 30,
    align: "center",
    fixed: "left",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "tenKhachHang",
    key: "tenKhachHang",
    width: 100,
  },
  {
    title: "Địa chỉ",
    dataIndex: "diaChi",
    key: "diaChi",
    width: 100,
  },
  {
    title: "Logo",
    dataIndex: "urlLogo",
    key: "urlLogo",
    width: 100,
  },
  {
    title: "Trạng thái",
    dataIndex: "active",
    key: "active",
    width: 50,
  },
  {
    title: "Loại KH",
    dataIndex: "loaiKH",
    key: "loaiKH",
    width: 50,
  },
  {
    title: "Hành động",
    key: "action",
    width: 50,
    align: "center",
    fixed: "right",
  },
];

// Search form
const modelRef = ref({ name: "" });
const param = ref({ search: "", PageIndex: 1, PageSize: 10 });
const formRef = ref();

// Modal related
const modalVisible = ref(false);
const isEditMode = ref(false);
const confirmLoading = ref(false);
const modalFormRef = ref();
const modalForm = reactive({
  id: 0,
  tenKhachHang: "",
  diaChi: "",
  urlLogo: "",
  email: "",
  soDienThoai: "",
  maSoThue: "",
  active: true,
  idLoaiKH: 1,
  website: "",
  thutu: 0,
});

// Form validation rules
const formRules = {
  tenKhachHang: [{ required: true, message: "Vui lòng nhập tên khách hàng" }],
  diaChi: [{ required: true, message: "Vui lòng nhập địa chỉ" }],
  email: [{ required: true, message: "Vui lòng nhập email" },{ type: "email", message: "Email không hợp lệ" }],
  soDienThoai: [{ required: true, message: "Vui lòng nhập số điện thoại" }, { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ" }],
  urlLogo:[{ required: true, message: "Vui lòng chọn ảnh" }]
};

// CRUD operations
const resetForm = async () => {
  formRef.value.resetFields();
  param.value.PageIndex = 1;
  param.value.PageSize = 10;
  param.value.search = "";
  pagination.current = 1;
  pagination.pageSize = 10;
  await loadData({ ...param.value });
};

const onSubmit = async value => {
  param.value.search = value.name;
  param.value.PageIndex = 1;
  pagination.current = 1;
  await loadData({ ...param.value });
};

const handleTableChange = (pag, filters, sorter) => {
  param.value.PageIndex = pag.current;
  param.value.PageSize = pag.pageSize;
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  loadData({ ...param.value });
};

const loadData = async param => {
  const { data, status } = await RestApi.customer.list({ params: param });
  if (status.value === "success") {
    dataSource.value = data.value.data.map((item, index) => ({
      ...item,
      stt: index + 1 + (param.PageIndex - 1) * param.PageSize,
    }));
    pagination.total = data.value.totalrecord || 0;
  } else {
    message.error("Lỗi lấy dữ liệu");
  }
};

const showAddModal = () => {
  isEditMode.value = false;
  resetModalForm();
  modalVisible.value = true;
};

const showEditModal = record => {
  isEditMode.value = true;
  Object.assign(modalForm, {
    id: record.id,
    tenKhachHang: record.tenKhachHang,
    diaChi: record.diaChi,
    urlLogo: record.urlLogo,
    email: record.email,
    soDienThoai: record.soDienThoai,
    maSoThue: record.maSoThue,
    active: record.active,
    idLoaiKH: record.idLoaiKH,
    website: record.website,
    thutu: record.thutu,
  });
  modalVisible.value = true;
};

const resetModalForm = () => {
  Object.assign(modalForm, {
    tenKhachHang: "",
    diaChi: "",
    urlLogo: "",
    email: "",
    soDienThoai: "",
    maSoThue: "",
    active: true,
    idLoaiKH: 1,
    website: "",
    thutu: 0,
  });
};

const handleModalOk = async () => {
  try {
    await modalFormRef.value.validateFields();
    confirmLoading.value = true;

    if (isEditMode.value) {
      // Update existing customer
      const { data, status } = await RestApi.customer.update({ body: JSON.stringify(modalForm) });
      console.log(data);
      if (status.value === "success") {
        message.success("Cập nhật khách hàng thành công");
      } else {
        message.error("Cập nhật khách hàng thất bại");
      }
    } else {
      delete modalForm.id;
      const { data, status } = await RestApi.customer.create({ body: JSON.stringify(modalForm) });
      console.log(data);
      if (status.value === "success") {
        message.success("Thêm mới khách hàng thành công");
      } else {
        message.error("Thêm mới khách hàng thất bại");
      }
    }

    modalVisible.value = false;
    await loadData({ ...param.value });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    confirmLoading.value = false;
  }
};

const handleModalCancel = () => {
  modalVisible.value = false;
  modalFormRef.value.resetFields();
};

const handleDelete = async id => {
  const { status } = await RestApi.customer.delete({ params: { id: id } });
  if (status.value === "success") {
    message.success("Xóa khách hàng thành công");
    await loadData({ ...param.value });
  } else {
    message.error("Xóa khách hàng thất bại");
  }
};

const inputFileUpload = ref(null);
const triggerUpload = () => {
  inputFileUpload.value.click();
};
const onFilesChange = async e => {
  try {
    const file = e.target.files[0];
    if (!file) return;

    const file_type = file.type;
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file_type)) {
      message.error("Tệp tải lên không đúng định dạng (chỉ chấp nhận PNG, JPEG, JPG)");
      return;
    }

    const timestamp = new Date().getTime();
    const fileExtension = file.name.split('.').pop();
    const originalName = file.name.substring(0, file.name.lastIndexOf('.'));
    const newFileName = `${timestamp}_${originalName}.${fileExtension}`;
    const renamedFile = new File([file], newFileName, { type: file.type });

    const uploadedUrl = await RestApi.upload_s3(renamedFile.name, renamedFile, {
      acl: "public-read",
      encoding: "blob",
      content_type: file.type,
      bucket: "website",
    });

    // console.log("Uploaded image URL:", uploadedUrl);
    modalForm.urlLogo = uploadedUrl;
    e.target.value = null;
  } catch (error) {
    console.error("Upload lỗi:", error);
    message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
    // Reset input file khi có lỗi
    e.target.value = null;
  }
};
// Initial load
await loadData({ ...param.value });
onMounted(() => {
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => [
    { url: "/page_management", title: "Quản lý site" },
    { url: "/page_management/customer", title: "Quản lý khách hàng" },
  ]);
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>

<style scoped>
.ant-table-cell img {
  max-width: 50px;
  max-height: 50px;
}

/* Ensure fixed columns work properly */
.ant-table-container {
  overflow-x: auto;
}
</style>
