<template>
  <div>
    <div class="bg-white gap-2 p-3">
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
  </div>
</template>

<script setup>
const { RestApi } = useApi();

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
    
    let status_data ;
    if (isEditMode.value) {
      const { data, status } = await RestApi.intro.update({ body: JSON.stringify(formData.value) });
      status_data = status.value
    } else {
      const { data, status } = await RestApi.intro.create({ body: JSON.stringify(formData.value) });
      status_data = status.value
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

    const uploadedUrl = await RestApi.upload_s3(file.name, file, {
      acl: "public-read",
      encoding: "blob",
      content_type: file.type,
      bucket: "website",
    });

    console.log("Uploaded image URL:", uploadedUrl);
    formData.value.urlImg = uploadedUrl;
  } catch (error) {
    console.error("Upload lỗi:", error);
    message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
  }
};
const inputFileUploadInfo = ref(null);
const triggerUploadInfo = () => {
  inputFileUploadInfo.value.click();
};
</script>

<style scoped>
/* Thêm responsive cho bảng */
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
