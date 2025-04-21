<template>
  <div class="mx-auto p-2 md:p-4 bg-white rounded-lg md:rounded-2xl shadow-md">
    <a-form layout="vertical" :model="formState" @finish="handleSubmit" class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
      <!-- Các form item với responsive classes -->
      <a-form-item label="Tên công ty" class="md:col-span-1">
        <a-input v-model:value="formState.tenCty" class="w-full" />
      </a-form-item>

      <a-form-item label="Mô tả ngắn" class="md:col-span-1">
        <a-input v-model:value="formState.motangan" class="w-full" />
      </a-form-item>

      <a-form-item label="Địa chỉ" class="md:col-span-1">
        <a-input v-model:value="formState.diaChi" class="w-full" />
      </a-form-item>

      <a-form-item label="Số điện thoại" class="md:col-span-1">
        <a-input v-model:value="formState.soDienThoai" class="w-full" />
      </a-form-item>

      <a-form-item label="Email" class="md:col-span-1">
        <a-input v-model:value="formState.email" class="w-full" />
      </a-form-item>

      <a-form-item label="Facebook" class="md:col-span-1">
        <a-input v-model:value="formState.facebook" class="w-full" />
      </a-form-item>

      <a-form-item label="Link Messenger" class="md:col-span-1">
        <a-input v-model:value="formState.linkMess" class="w-full" />
      </a-form-item>

      <a-form-item label="Tiêu đề trang" class="md:col-span-1">
        <a-input v-model:value="formState.title" class="w-full" />
      </a-form-item>

      <a-form-item label="Giờ làm việc" class="md:col-span-1">
        <a-input v-model:value="formState.gioLamViec" class="w-full" />
      </a-form-item>

      <a-form-item label="Website" class="md:col-span-1">
        <a-input v-model:value="formState.website" class="w-full" />
      </a-form-item>

      <a-form-item label="Logo (URL)" class="col-span-1 md:col-span-3">
        <!-- <a-input v-model:value="formState.logoimg" class="w-full" /> -->
        <div v-if="!formState.logoimg" class="flex justify-center items-center h-32 border-dashed border-2 border-gray-400 rounded cursor-pointer" @click="triggerUpload">
          <span class="text-gray-500">Chưa có ảnh</span>
        </div>

        <div v-else class="flex flex-col justify-center">
          <img :src="formState.logoimg" class="w-full max-h-60 object-contain border rounded cursor-pointer" @click="triggerUpload" />
        </div>
      </a-form-item>

      <a-form-item label="Mô tả" class="col-span-1 md:col-span-3">
        <TinyMCE v-model="formState.moTa" class="w-full" />
      </a-form-item>
    </a-form>
    <input class="hidden" ref="inputFileUpload" type="file" accept="image/jpeg,image/png" @change="onFilesChange" />
  </div>
</template>

<script setup>
const { RestApi } = useApi();

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
  message.error("Lỗi lấy dữ liệu");
}

const handleSubmit = () => {
  console.log("Dữ liệu đã cập nhật:", formState);
  // Có thể gửi dữ liệu qua API ở đây
};

const inputFileUpload = ref(null);
const triggerUpload = () => {
  // Mở file dialog khi click vào ảnh để người dùng chọn ảnh mới
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

    const uploadedUrl = await RestApi.upload_s3(file.name, file, {
      acl: "public-read",
      encoding: "blob",
      content_type: file.type,
      bucket: "website",
    });

    console.log("Uploaded image URL:", uploadedUrl);
    formState.value.logoimg = uploadedUrl;
  } catch (error) {
    console.error("Upload lỗi:", error);
    message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
  }
};
</script>

<style scoped>
/* Thêm một số style cho mobile */
@media (max-width: 768px) {
  .ant-form-item {
    margin-bottom: 12px;
  }

  .ant-input {
    font-size: 14px;
  }

  .ant-form-item-label > label {
    font-size: 14px;
  }
}
</style>
