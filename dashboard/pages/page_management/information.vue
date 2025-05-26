<template>
  <div class="bg-white min-h-full p-3">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="info" tab="Thông tin công ty">
        <div class="p-4">
          <a-form layout="vertical" :model="formState" @finish="handleSubmit" :validate-messages="validateMessages" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Các form item với responsive classes -->
            <a-form-item label="Tên công ty" name="tenCty" class="md:col-span-1" :rules="[{ required: true, message: 'Vui lòng nhập tên công ty' }]">
              <a-input v-model:value="formState.tenCty" placeholder="Nhập tên công ty" />
            </a-form-item>

            <a-form-item label="Mô tả ngắn" name="motangan" class="md:col-span-1">
              <a-input v-model:value="formState.motangan" placeholder="Nhập mô tả ngắn" />
            </a-form-item>

            <a-form-item label="Địa chỉ" name="diaChi" class="md:col-span-1" :rules="[{ required: true, message: 'Vui lòng nhập địa chỉ' }]">
              <a-input v-model:value="formState.diaChi" placeholder="Nhập địa chỉ" />
            </a-form-item>

            <a-form-item
              label="Số điện thoại"
              name="soDienThoai"
              class="md:col-span-1"
              :rules="[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ' },
              ]"
            >
              <a-input v-model:value="formState.soDienThoai" placeholder="Nhập số điện thoại" />
            </a-form-item>

            <a-form-item
              label="Email"
              name="email"
              class="md:col-span-1"
              :rules="[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]"
            >
              <a-input v-model:value="formState.email" placeholder="Nhập email" />
            </a-form-item>

            <a-form-item label="Facebook" name="facebook" class="md:col-span-1" :rules="[{ type: 'url', message: 'URL không hợp lệ' }]">
              <a-input v-model:value="formState.facebook" placeholder="Nhập link Facebook" />
            </a-form-item>

            <a-form-item label="Link Messenger" name="linkMess" class="md:col-span-1" :rules="[{ type: 'url', message: 'URL không hợp lệ' }]">
              <a-input v-model:value="formState.linkMess" placeholder="Nhập link Messenger" />
            </a-form-item>

            <a-form-item label="Tiêu đề trang" name="title" class="md:col-span-1" :rules="[{ required: true, message: 'Vui lòng nhập tiêu đề trang' }]">
              <a-input v-model:value="formState.title" placeholder="Nhập tiêu đề trang" />
            </a-form-item>

            <a-form-item label="Giờ làm việc" name="gioLamViec" class="md:col-span-1">
              <a-input v-model:value="formState.gioLamViec" placeholder="Ví dụ: 8:00 - 17:00" />
            </a-form-item>

            <a-form-item label="Website" name="website" class="md:col-span-1" :rules="[{ type: 'url', message: 'URL không hợp lệ' }]">
              <a-input v-model:value="formState.website" placeholder="Nhập website" />
            </a-form-item>

            <a-form-item label="Logo" name="logoimg" class="col-span-1 md:col-span-3">
              <div v-if="!formState.logoimg" class="flex justify-center items-center h-32 border-dashed border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors" @click="triggerUpload">
                <div class="text-center">
                  <CloudUploadOutlined class="text-2xl text-gray-400 mb-2" />
                  <p class="text-gray-500">Nhấn để tải lên logo</p>
                  <p class="text-xs text-gray-400 mt-1">(PNG, JPG, tối đa 2MB)</p>
                </div>
              </div>

              <div v-else class="flex flex-col items-center">
                <img :src="formState.logoimg" class="w-auto max-h-60 object-contain border rounded cursor-pointer mb-2" @click="triggerUpload" />
                <a-button type="link" @click="triggerUpload" class="text-blue-500">
                  <template #icon><EditOutlined /></template>
                  Thay đổi logo
                </a-button>
              </div>
            </a-form-item>

            <a-form-item label="Mô tả" name="moTa" class="col-span-1 md:col-span-3">
              <TinyMCE v-model="formState.moTa" class="w-full" />
            </a-form-item>
          </a-form>
          <input class="hidden" ref="inputFileUpload" type="file" accept="image/jpeg,image/png" @change="onFilesChange" />
        </div>
        <div class="p-4 border-t flex justify-end items-center">
          <a-button type="primary" @click="handleSubmit" :loading="loading"> Lưu thông tin </a-button>
        </div>
        <!-- <div class="flex justify-end items-center p-4 border-t">
          <a-button type="primary" @click="handleSubmit" :loading="loading" class="md:w-auto w-full"> Lưu thông tin </a-button>
        </div> -->
      </a-tab-pane>
      <a-tab-pane key="intro" tab="Giới thiệu">
        <div class="gap-2 p-3 border-b">
          <a-form class="grid grid-cols-1 md:grid-cols-2 gap-2" :model="modelRef" ref="formRef" autocomplete="off" layout="horizontal" @finish="onSubmit">
            <a-form-item class="!mb-0" label="Tìm Kiếm" name="name">
              <a-input v-model:value="modelRef.name" placeholder="Tìm kiếm" />
            </a-form-item>
            <div class="flex flex-wrap gap-2 justify-end mt-2 md:mt-0">
              <a-button @click="resetForm" class="font-roboto w-full md:w-auto">Đặt Lại</a-button>
              <a-button class="font-roboto w-full md:w-auto" htmlType="submit" type="primary">Tìm Kiếm</a-button>
            </div>
          </a-form>
        </div>
        <div class="flex justify-end py-3 px-3">
          <a-button type="primary" @click="showAddModal">
            <span class="flex justify-center items-center">Thêm mới</span>
          </a-button>
        </div>
        <div class="p-3 overflow-x-auto">
          <a-table :dataSource="dataSource" :columns="columns" :loading="loading_info" :pagination="pagination" :scroll="{ x: 'max-content' }" rowKey="id" @change="handleTableChange" size="middle">
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.key === 'stt'">
                {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
              </template>

              <template v-if="column.key === 'urlImg'">
                <img :src="record.urlImg" alt="img" class="w-20 h-14 object-cover rounded" />
              </template>
               <template v-if="column.key === 'moTa'">
                <span v-html="record.moTa"/>
               </template>
              <template v-else-if="column.key === 'active'">
                <span :class="record.active ? 'text-green-600' : 'text-red-500'">
                  {{ record.active ? "Hoạt động" : "Tạm ẩn" }}
                </span>
              </template>
              <template v-else-if="column.key === 'thutuhienthi'">
                {{ record.thutuhienthi || "-" }}
              </template>
              <template v-else-if="column.key === 'action'">
                <div class="flex gap-2">
                  <a-button type="primary" size="small" @click="onEdit(record)">Sửa</a-button>
                  <a-popconfirm title="Bạn chắc chắn muốn xóa?" ok-text="Xóa" cancel-text="Hủy" @confirm="onDelete(record)">
                    <a-button type="primary" danger size="small">Xóa</a-button>
                  </a-popconfirm>
                </div>
              </template>
            </template>
          </a-table>
        </div>
        <a-modal v-model:open="isModalVisible" :title="isEditMode ? 'Chỉnh sửa giới thiệu' : 'Thêm mới giới thiệu'" @ok="handleModalSubmit" @cancel="handleModalCancel" :width="800" :body-style="{ maxHeight: '100vh', overflowY: 'auto' }">
          <a-form :model="formData" layout="vertical" :rules="formRules" ref="modalFormRef">
            <a-form-item label="Tiêu đề" name="tentieude">
              <a-input v-model:value="formData.tentieude" />
            </a-form-item>

            <a-form-item label="Mô tả" name="moTa">
              <!-- <a-textarea v-model:value="formData.moTa" :rows="4" /> -->
              <TinyMCE v-model="formData.moTa" />
            </a-form-item>

            <a-form-item label="Hình ảnh (URL)" name="urlImg">
              <!-- <a-input v-model:value="formData.urlImg" /> -->
              <div v-if="!formData.urlImg" class="flex justify-center items-center h-32 border-dashed border-2 border-gray-400 rounded cursor-pointer" @click="triggerUploadInfo">
                <span class="text-gray-500">Chưa có ảnh</span>
              </div>

              <div v-else class="flex flex-col justify-center">
                <img :src="formData.urlImg" class="w-full max-h-60 object-contain border rounded cursor-pointer" @click="triggerUploadInfo" />
              </div>
            </a-form-item>
            <a-form-item label="Thứ tự hiển thị" name="thutuhienthi">
              <a-input-number v-model:value="formData.thutuhienthi" :min="1" style="width: 100%" />
            </a-form-item>
            <a-form-item label="Trạng thái" name="active">
              <a-switch v-model:checked="formData.active" />
            </a-form-item>
          </a-form>
          <input class="hidden" ref="inputFileUploadInfo" type="file" accept="image/jpeg,image/png" @change="onFilesChangeInfo" />
        </a-modal>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup>
const { RestApi } = useApi();

const activeKey = ref("info");
const loading = ref(false);
const inputFileUpload = ref(null);
const formState = ref({
  id: 0,
  tenCty: "",
  moTa: "",
  diaChi: "",
  soDienThoai: "",
  email: "",
  facebook: "",
  title: "",
  gioLamViec: "",
  logoimg: "",
  website: "",
  motangan: "",
  linkMess: "",
});
const validateMessages = {
  required: "${label} là bắt buộc",
  types: {
    email: "${label} không hợp lệ",
    url: "${label} phải là URL hợp lệ",
  },
  string: {
    // Add any string validation messages here
  },
};
const { data, status } = await RestApi.info.get();
if (status.value === "success") {
  let company_data = data.value.data;
  formState.value = {
    id: company_data.id ?? 0,
    tenCty: company_data.tenCty ?? "",
    moTa: company_data.moTa ?? "",
    diaChi: company_data.diaChi ?? "",
    soDienThoai: company_data.soDienThoai ?? "",
    email: company_data.email ?? "",
    facebook: company_data.facebook ?? "",
    title: company_data.title ?? "",
    gioLamViec: company_data.gioLamViec ?? "",
    logoimg: company_data.logoimg ?? "",
    website: company_data.website ?? "",
    motangan: company_data.motangan ?? "",
    linkMess: company_data.linkMess ?? "",
  };
} else {
  message.error("Lỗi khi lấy dữ liệu công ty");
}

const handleSubmit = async () => {
  loading.value = true;
  try {
    const res = await RestApi.info.update({ body: JSON.stringify({ ...formState.value }) });
    if (res.status.value === "success") {
      message.success("Cập nhật thông tin thành công!");
    } else {
      message.error("Cập nhật thất bại, vui lòng thử lại.");
    }
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    message.error("Đã xảy ra lỗi trong quá trình cập nhật.");
  } finally {
    loading.value = false;
  }
};

const triggerUpload = () => {
  inputFileUpload.value.click();
};

const onFilesChange = async e => {
  try {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      message.error("Chỉ chấp nhận file ảnh (PNG, JPEG, JPG)");
      return;
    }

    if (file.size > maxSize) {
      message.error("Kích thước file quá lớn (tối đa 2MB)");
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

    formState.value.logoimg = uploadedUrl;
    message.success("Tải lên logo thành công!");
    e.target.value = null;
  } catch (error) {
    console.error("Upload lỗi:", error);
    message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
    e.target.value = null;
  }
};

const modelRef = ref({ name: "" });
const dataSource = ref([]);
const loading_info = ref(false);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trên tổng số ${total} bản ghi`,
  showSizeChanger: true,
  pageSizeOptions: ["1", "10", "20", "50", "100"],
});

// Table columns
const columns = ref([
  {
    title: "STT",
    key: "stt",
    width: 20,
  },
  {
    title: "Tiêu đề",
    dataIndex: "tentieude",
    key: "tentieude",
    ellipsis: true,
    width: 100,
  },
  {
    title: "Mô tả ngắn",
    dataIndex: "moTa",
    key: "moTa",
    width: 300,
  },
  {
    title: "Hình Ảnh",
    dataIndex: "urlImg",
    key: "urlImg",
    width: 150,
  },
  {
    title: "Thứ tự hiển thị",
    dataIndex: "thutuhienthi",
    key: "thutuhienthi",
    width: 50,
    // sorter: (a, b) => a.thutuhienthi - b.thutuhienthi
  },
  {
    title: "Trạng thái",
    dataIndex: "active",
    key: "active",
    width: 100,
  },
  {
    title: "Chức năng",
    key: "action",
    width: 50,
    fixed: "right",
  },
]);

const param = ref({ search: "", PageIndex: 1, PageSize: 10 });
const fetchData = async param => {
  loading.value = true;
  const { data, status } = await RestApi.intro.list({ params: param });
  if (status.value === "success") {
    dataSource.value = data.value.data;
    pagination.total = data.value.totalrecord || 0;
  } else {
    message.error("Lỗi lấy dữ liệu");
  }
  loading.value = false;
};

const onSubmit = async () => {
  pagination.current = 1;
  param.value.search = 1;
  param.value.search = modelRef.value.name;
  await fetchData({ ...param.value });
};

const resetForm = async () => {
  modelRef.value.name = "";
  pagination.current = 1;
  param.value.search = 1;
  param.value.search = "";
  await fetchData({ ...param.value });
};

const handleTableChange = async paginationInfo => {
  param.value.PageIndex = paginationInfo.current;
  param.value.PageSize = paginationInfo.pageSize;
  pagination.current = paginationInfo.current;
  pagination.pageSize = paginationInfo.pageSize;
  await fetchData({ ...param.value });
};

// ====================== Modal ======================
const isModalVisible = ref(false);
const isEditMode = ref(false);
const modalFormRef = ref();

const formData = ref({
  id: null,
  tentieude: "",
  moTa: "",
  urlImg: "",
  active: true,
});

const formRules = {
  tentieude: [{ required: true, message: "Vui lòng nhập tiêu đề" }],
  moTa: [{ required: true, message: "Vui lòng nhập mô tả" }],
  urlImg: [{ required: true, message: "Vui lòng nhập URL hình ảnh" }],
  thutuhienthi: [
    { required: true, message: "Vui lòng nhập thứ tự hiển thị" },
    { type: "number", message: "Thứ tự hiển thị phải là số" },
  ],
};

const showAddModal = () => {
  isEditMode.value = false;
  Object.assign(formData.value, {
    tentieude: "",
    moTa: "",
    urlImg: "",
    active: true,
  });
  isModalVisible.value = true;
};

const onEdit = record => {
  isEditMode.value = true;
  Object.assign(formData.value, { ...record });
  isModalVisible.value = true;
};

const onDelete = async record => {
  try {
    const { data, status } = await RestApi.intro.delete({ params: { id: record.id } });
    if (status.value === "success") {
      message.success("Xóa thành công!");
      await fetchData({ ...param.value });
    } else {
      message.error("Xóa thất bại.");
    }
  } catch (err) {
    message.error("Có lỗi xảy ra khi xóa.");
  }
};

const handleModalSubmit = async () => {
  try {
    await modalFormRef.value.validateFields();

    let status_data;
    if (isEditMode.value) {
      const { data, status } = await RestApi.intro.update({ body: JSON.stringify(formData.value) });
      status_data = status.value;
    } else {
      const { data, status } = await RestApi.intro.create({ body: JSON.stringify(formData.value) });
      status_data = status.value;
    }
    if (status_data === "success") {
      message.success(isEditMode.value ? "Cập nhật thành công!" : "Thêm mới thành công!");
      isModalVisible.value = false;
      await fetchData({ ...param.value });
    } else {
      message.error("Lưu thất bại.");
    }
  } catch (err) {
    console.error(err);
    message.error("Có lỗi xảy ra khi lưu.");
  }
};

const handleModalCancel = () => {
  isModalVisible.value = false;
};

await fetchData({ ...param.value });

const onFilesChangeInfo = async e => {
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
    formData.value.urlImg = uploadedUrl;
    e.target.value = null;
  } catch (error) {
    console.error("Upload lỗi:", error);
    message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
    e.target.value = null;
  }
};
const inputFileUploadInfo = ref(null);
const triggerUploadInfo = () => {
  inputFileUploadInfo.value.click();
};
onMounted(() => {
  ////////////////////////////////Breadcrumb
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => {
    return [
      { url: "/page_management", title: "Quản lý site" },
      { url: "/page_management/information", title: "Quản lý thông tin công ty" },
    ];
  });
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 768px) {
  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-form-item-label > label {
    font-size: 14px;
    font-weight: 500;
  }

  .ant-input,
  .ant-input-affix-wrapper {
    padding: 8px 11px;
    font-size: 14px;
  }
}
@media (max-width: 768px) {
  .ant-table {
    width: 100%;
    overflow-x: auto;
    display: block;
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    white-space: nowrap;
    padding: 8px 12px;
  }
}

/* Cải thiện giao diện nút trên mobile */
.ant-btn {
  white-space: nowrap;
}
</style>
