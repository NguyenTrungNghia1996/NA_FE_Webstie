<template>
  <div class="p-2 md:p-4">
    <div class="mx-auto bg-white rounded-lg md:rounded-2xl shadow-md overflow-hidden">
      <div class="flex justify-end items-center p-4 border-b">
        <a-button 
          type="primary" 
          @click="handleSubmit"
          :loading="loading"
          class="md:w-auto w-full"
        >
          Lưu thông tin
        </a-button>
      </div>
      <div class="p-4">
        <a-form 
          layout="vertical" 
          :model="formState" 
          @finish="handleSubmit"
          :validate-messages="validateMessages"
          class="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <!-- Các form item với responsive classes -->
          <a-form-item 
            label="Tên công ty" 
            name="tenCty"
            class="md:col-span-1"
            :rules="[{ required: true, message: 'Vui lòng nhập tên công ty' }]"
          >
            <a-input v-model:value="formState.tenCty" placeholder="Nhập tên công ty" />
          </a-form-item>

          <a-form-item 
            label="Mô tả ngắn" 
            name="motangan"
            class="md:col-span-1"
          >
            <a-input v-model:value="formState.motangan" placeholder="Nhập mô tả ngắn" />
          </a-form-item>

          <a-form-item 
            label="Địa chỉ" 
            name="diaChi"
            class="md:col-span-1"
            :rules="[{ required: true, message: 'Vui lòng nhập địa chỉ' }]"
          >
            <a-input v-model:value="formState.diaChi" placeholder="Nhập địa chỉ" />
          </a-form-item>

          <a-form-item 
            label="Số điện thoại" 
            name="soDienThoai"
            class="md:col-span-1"
            :rules="[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ' }
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
              { type: 'email', message: 'Email không hợp lệ' }
            ]"
          >
            <a-input v-model:value="formState.email" placeholder="Nhập email" />
          </a-form-item>

          <a-form-item 
            label="Facebook" 
            name="facebook"
            class="md:col-span-1"
            :rules="[{ type: 'url', message: 'URL không hợp lệ' }]"
          >
            <a-input v-model:value="formState.facebook" placeholder="Nhập link Facebook" />
          </a-form-item>

          <a-form-item 
            label="Link Messenger" 
            name="linkMess"
            class="md:col-span-1"
            :rules="[{ type: 'url', message: 'URL không hợp lệ' }]"
          >
            <a-input v-model:value="formState.linkMess" placeholder="Nhập link Messenger" />
          </a-form-item>

          <a-form-item 
            label="Tiêu đề trang" 
            name="title"
            class="md:col-span-1"
            :rules="[{ required: true, message: 'Vui lòng nhập tiêu đề trang' }]"
          >
            <a-input v-model:value="formState.title" placeholder="Nhập tiêu đề trang" />
          </a-form-item>

          <a-form-item 
            label="Giờ làm việc" 
            name="gioLamViec"
            class="md:col-span-1"
          >
            <a-input v-model:value="formState.gioLamViec" placeholder="Ví dụ: 8:00 - 17:00" />
          </a-form-item>

          <a-form-item 
            label="Website" 
            name="website"
            class="md:col-span-1"
            :rules="[{ type: 'url', message: 'URL không hợp lệ' }]"
          >
            <a-input v-model:value="formState.website" placeholder="Nhập website" />
          </a-form-item>

          <a-form-item 
            label="Logo" 
            name="logoimg"
            class="col-span-1 md:col-span-3"
          >
            <div 
              v-if="!formState.logoimg" 
              class="flex justify-center items-center h-32 border-dashed border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
              @click="triggerUpload"
            >
              <div class="text-center">
                <CloudUploadOutlined class="text-2xl text-gray-400 mb-2" />
                <p class="text-gray-500">Nhấn để tải lên logo</p>
                <p class="text-xs text-gray-400 mt-1">(PNG, JPG, tối đa 2MB)</p>
              </div>
            </div>

            <div v-else class="flex flex-col items-center">
              <img 
                :src="formState.logoimg" 
                class="w-auto max-h-60 object-contain border rounded cursor-pointer mb-2"
                @click="triggerUpload"
              />
              <a-button type="link" @click="triggerUpload" class="text-blue-500">
                <template #icon><EditOutlined /></template>
                Thay đổi logo
              </a-button>
            </div>
          </a-form-item>

          <a-form-item 
            label="Mô tả" 
            name="moTa"
            class="col-span-1 md:col-span-3"
          >
            <TinyMCE v-model="formState.moTa" class="w-full" />
          </a-form-item>
        </a-form>
        <input 
          class="hidden" 
          ref="inputFileUpload" 
          type="file" 
          accept="image/jpeg,image/png" 
          @change="onFilesChange"
        />
      </div>
      <div class="p-4 border-t md:hidden">
        <a-button 
          type="primary" 
          @click="handleSubmit"
          :loading="loading"
          block
        >
          Lưu thông tin
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { RestApi } = useApi();
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

// Custom validate messages
const validateMessages = {
  required: '${label} là bắt buộc',
  types: {
    email: '${label} không hợp lệ',
    url: '${label} phải là URL hợp lệ',
  },
  string: {
    // Add any string validation messages here
  },
};

// Fetch company data
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

    const uploadedUrl = await RestApi.upload_s3(file.name, file, {
      acl: "public-read",
      encoding: "blob",
      content_type: file.type,
      bucket: "website",
    });

    formState.value.logoimg = uploadedUrl;
    message.success("Tải lên logo thành công!");
  } catch (error) {
    console.error("Upload lỗi:", error);
    message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
  }
};
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
  
  .ant-input, .ant-input-affix-wrapper {
    padding: 8px 11px;
    font-size: 14px;
  }
}
</style>