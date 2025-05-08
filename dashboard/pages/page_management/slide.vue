<template>
  <div class="bg-white min-h-full p-3">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Quản lý banner</h1>
      <a-button type="primary" @click="showModal(null)">
        <template #icon>
          <PlusOutlined />
        </template>
        Thêm banner
      </a-button>
    </div>

    <a-table size="small" :dataSource="banners" :columns="columns" rowKey="id" bordered :scroll="{ x: 'max-content' }" class="overflow-auto">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'image'">
          <img :src="record.url" alt="Biểu ngữ" class="w-20 h-auto object-cover rounded" />
        </template>
        <template v-else-if="column.key === 'action'">
          <div class="flex space-x-2">
            <a-button type="primary" size="small" @click="showModal(record)">Sửa</a-button>
            <a-popconfirm title="Bạn có chắc muốn xóa?" ok-text="Xóa" cancel-text="Hủy" @confirm="handleDelete(record.id)">
              <a-button type="primary" danger size="small">Xóa</a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>

    <!-- Modal thêm/sửa biểu ngữ -->
    <a-modal v-model:open="modalVisible" :title="isEdit ? 'Sửa banner' : 'Thêm banner'" @ok="handleOk" @cancel="handleCancel" :confirm-loading="confirmLoading" width="600px">
      <a-form ref="modalFormRef" :model="modalForm" :rules="formRules" layout="vertical">
        <a-form-item label="URL hình ảnh" name="url">
          <!-- <a-input v-model:value="modalForm.url" placeholder="Nhập URL hình ảnh" /> -->
          <div v-if="!modalForm.url" class="flex justify-center items-center h-32 border-dashed border-2 border-gray-400 rounded cursor-pointer" @click="triggerUpload">
            <span class="text-gray-500">Chưa có ảnh</span>
          </div>

          <div v-else class="flex flex-col justify-center">
            <img :src="modalForm.url" class="w-full max-h-60 object-contain border rounded cursor-pointer" @click="triggerUpload" />
          </div>
        </a-form-item>
        <a-form-item label="Thứ tự hiển thị" name="thutu">
          <a-input-number v-model:value="modalForm.thutu" :min="0" style="width: 100%" />
        </a-form-item>
      </a-form>
      <input class="!hidden" ref="inputFileUpload" type="file" accept="image/jpeg,image/png" @change="onFilesChange" />
    </a-modal>
  </div>
</template>

<script setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const { RestApi } = useApi();
const banners = ref([]);
const modalFormRef = ref();

// Form state
const modalForm = reactive({
  url: "",
  thutu: 0,
});

// Validation rules
const formRules = {
  url: [{ required: true, message: "Vui lòng nhập URL hình ảnh", trigger: "blur" }],
  thutu: [
    { required: true, message: "Vui lòng nhập thứ tự hiển thị", trigger: "blur" },
    { type: "number", message: "Thứ tự phải là số", trigger: "blur" },
  ],
};

const loadData = async () => {
  const { data, status } = await RestApi.slide.list();
  if (status.value === "success") {
    banners.value = data.value.data;
  } else {
    message.error("Lỗi lấy dữ liệu");
  }
};

// Cột bảng
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80,
  },
  {
    title: "Hình ảnh",
    key: "image",
    width: 150,
    align: "center",
  },
  {
    title: "URL",
    dataIndex: "url",
    key: "url",
    ellipsis: true,
  },
  {
    title: "Thứ tự",
    dataIndex: "thutu",
    key: "thutu",
    width: 120,
    align: "center",
  },
  {
    title: "Hành động",
    key: "action",
    width: 150,
    align: "center",
  },
];

// Modal state
const modalVisible = ref(false);
const confirmLoading = ref(false);
const isEdit = ref(false);
const currentId = ref(null);

// Hiển thị modal
const showModal = record => {
  if (record) {
    isEdit.value = true;
    currentId.value = record.id;
    modalForm.url = record.url;
    modalForm.thutu = record.thutu;
  } else {
    // Chế độ thêm mới
    isEdit.value = false;
    currentId.value = null;
    modalForm.url = "";
    modalForm.thutu = 0;
  }
  modalVisible.value = true;
};

// Xử lý khi nhấn OK
const handleOk = async () => {
  try {
    await modalFormRef.value.validate();
    confirmLoading.value = true;
    if (isEdit.value && currentId.value) {
      modalForm.id = currentId.value
      const { status } = await RestApi.slide.update({body: JSON.stringify(modalForm)});
      if (status.value === "success") {
        message.success("Cập nhật banner thành công");
        await loadData();
      } else {
        message.error("Cập nhật banner thất bại");
      }
    } else {
      const { status } = await RestApi.slide.create({ body: JSON.stringify(modalForm) });
      if (status.value === "success") {
        message.success("Thêm banner mới thành công");
        await loadData();
      } else {
        message.error("Thêm banner thất bại");
      }
    }

    confirmLoading.value = false;
    modalVisible.value = false;
  } catch (error) {
    console.error("Validation failed:", error);
  }
};

// Xử lý khi nhấn Cancel
const handleCancel = () => {
  modalFormRef.value.resetFields();
  modalVisible.value = false;
};

// Xử lý xóa biểu ngữ
const handleDelete = async id => {
  const { status } = await RestApi.slide.delete({ params: { id: id } });
  if (status.value === "success") {
    message.success("Xóa banner thành công");
    await loadData();
  } else {
    message.error("Xóa banner thất bại");
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
    const fileExtension = file.name.split(".").pop();
    const originalName = file.name.substring(0, file.name.lastIndexOf("."));
    const newFileName = `${timestamp}_${originalName}.${fileExtension}`;
    const renamedFile = new File([file], newFileName, { type: file.type });

    const uploadedUrl = await RestApi.upload_s3(renamedFile.name, renamedFile, {
      acl: "public-read",
      encoding: "blob",
      content_type: file.type,
      bucket: "website",
    });
    modalForm.url = uploadedUrl;
    e.target.value = null;
  } catch (error) {
    console.error("Upload lỗi:", error);
    message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
    e.target.value = null;
  }
};
await loadData();
</script>

<style scoped></style>
