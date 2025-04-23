<template>
  <div class="flex flex-col min-h-full">
    <!-- Search Form -->
    <div class="bg-white p-3">
      <a-form class="grid grid-cols-1 md:grid-cols-2 gap-2" :model="modelRef" ref="formRef" autocomplete="off" layout="horizontal" @finish="onSubmit">
        <a-form-item class="!mb-0" label="Tìm Kiếm" name="name">
          <a-input v-model:value="modelRef.name" placeholder="Tìm kiếm dịch vụ" />
        </a-form-item>
        <div class="flex flex-wrap gap-2 justify-end mt-2 md:mt-0">
          <a-button @click="resetForm" class="font-roboto w-full md:w-auto">Đặt Lại</a-button>
          <a-button class="font-roboto w-full md:w-auto" htmlType="submit" type="primary">Tìm Kiếm</a-button>
        </div>
      </a-form>
    </div>

    <!-- Table and Add Button -->
    <div class="bg-white flex-1 mt-2 p-3 overflow-auto">
      <div class="flex justify-end py-3">
        <a-button @click="showModal" type="primary">
          <span class="flex justify-center items-center">Thêm mới</span>
        </a-button>
      </div>
      <ClientOnly>
        <a-table size="small" :dataSource="dataSource" :columns="columns" rowKey="id" :pagination="pagination" :scroll="{ x: 'max-content' }" class="overflow-auto" @change="handleTableChange">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'image'">
              <img :src="record.image" alt="Hình ảnh" class="w-16 h-10 object-cover" />
            </template>
            <template v-else-if="column.key === 'status'">
              <!-- <span>{{ record.status ? "Hiện" : "Ẩn" }}</span> -->
              <span :class="record.status ? 'text-green-600' : 'text-red-500'">
                {{ record.status ? "Hoạt động" : "Tạm ẩn" }}
              </span>
            </template>
            <template v-else-if="column.key === 'action'">
              <div class="flex gap-2">
                <a-button type="primary" size="small" @click="editRecord(record)">Chỉnh sửa</a-button>
                <a-popconfirm title="Bạn có chắc muốn xóa?" ok-text="Xóa" cancel-text="Hủy" @confirm="deleteRecord(record.id)">
                  <a-button type="primary" danger size="small">Xóa</a-button>
                </a-popconfirm>
              </div>
            </template>
          </template>
        </a-table>
      </ClientOnly>
    </div>

    <!-- Modal Thêm/Sửa -->
    <a-modal v-model:open="isModalOpen" :title="isEditMode ? 'Chỉnh sửa Sản Phẩm ' : 'Thêm Sản Phẩm'" @ok="handleOk" @cancel="handleCancel" :confirm-loading="modalLoading" :width="800" :body-style="{ maxHeight: '100vh', overflowY: 'auto' }">
      <a-form :model="modalForm" layout="vertical">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a-form-item label="Tiêu đề" name="name">
            <a-input v-model:value="modalForm.name" />
          </a-form-item>
          <a-form-item label="Mô tả ngắn" name="description">
            <a-input v-model:value="modalForm.description" />
          </a-form-item>

          <a-form-item label="Thứ tự" name="order">
            <a-input-number v-model:value="modalForm.order" class="w-full" />
          </a-form-item>
          <a-form-item label="Trạng thái" name="status">
            <a-switch v-model:checked="modalForm.status" />
          </a-form-item>

          <!-- Placeholder image, click to upload -->
          <a-form-item label="Hình ảnh" class="col-span-full">
            <div v-if="!modalForm.image" class="flex justify-center items-center h-32 border-dashed border-2 border-gray-400 rounded cursor-pointer" @click="triggerUpload">
              <span class="text-gray-500">Chưa có ảnh</span>
            </div>

            <div v-else class="flex flex-col justify-center">
              <img :src="modalForm.image" class="w-full max-h-60 object-contain border rounded cursor-pointer" @click="triggerUpload" />
            </div>
          </a-form-item>
        </div>

        <!-- Nội dung chiếm nguyên hàng -->
        <div class="mt-4">
          <a-form-item label="Nội dung" name="content" class="col-span-full">
            <TinyMCE v-model="modalForm.content" />
          </a-form-item>
        </div>

        <div v-if="isEditMode" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <a-form-item label="Ngày tạo">
            <a-input :value="modalForm.create_date" disabled />
          </a-form-item>
          <a-form-item label="Người tạo">
            <a-input :value="modalForm.user_create" disabled />
          </a-form-item>
        </div>
      </a-form>

      <!-- File upload ẩn, chỉ dùng khi bấm vào ảnh -->
      <input class="hidden" ref="inputFileUpload" type="file" accept="image/jpeg,image/png" @change="onFilesChange" />
    </a-modal>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const { RestApi } = useApi();
const t = nuxtApp.$i18n.t;

const columns = ref([
  { title: "STT", dataIndex: "number", key: "number", width: 30 },
  { title: "Tiêu đề", dataIndex: "name", key: "name", width: 220 },
  { title: "Mô tả ngắn", dataIndex: "description", key: "description", width: 300 },
  { title: "Hình ảnh", dataIndex: "image", key: "image", width: 120 },
  { title: "Người tạo", dataIndex: "user_create", key: "user_create", width: 120 },
  { title: "Thứ tự", dataIndex: "order", key: "order", width: 100 },
  { title: "Trạng Thái", dataIndex: "status", key: "status", width: 100 },
  { title: "Chức năng", key: "action", fixed: "right", width: 100 },
]);

const dataSource = ref([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trên tổng số ${total} bản ghi`,
  showSizeChanger: true,
  pageSizeOptions: ["1", "10", "20", "50", "100"],
});

const convert_data = data => {
  return data.map((item, index) => ({
    id: item.id,
    number: (pagination.current - 1) * pagination.pageSize + index + 1,
    name: item.tieuDe,
    description: item.moTaNgan,
    content: item.noiDung,
    image: item.urlImg,
    order: item.thutuhienthi,
    status: item.active,
    create_date: item.ngayTao,
    user_create: item.nguoiTao,
  }));
};

const modelRef = reactive({ name: "" });
const formRef = ref();

const param = ref({ search: "", PageIndex: 1, PageSize: 10 });

const resetForm = async () => {
  formRef.value.resetFields();
  param.value.PageIndex = 1;
  param.value.PageSize = 10;
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

const handleTableChange = async paginationInfo => {
  param.value.PageIndex = paginationInfo.current;
  param.value.PageSize = paginationInfo.pageSize;
  pagination.current = paginationInfo.current;
  pagination.pageSize = paginationInfo.pageSize;
  await loadData({ ...param.value });
};

const isModalOpen = ref(false);
const isEditMode = ref(false);
const modalLoading = ref(false);
const modalForm = reactive({
  id: null,
  name: "",
  description: "",
  content: "",
  image: "",
  order: 0,
  status: true,
  create_date: "",
  user_create: "",
});

const showModal = () => {
  isEditMode.value = false;
  Object.assign(modalForm, {
    id: null,
    name: "",
    description: "",
    content: "",
    image: "",
    order: 0,
    status: true,
    create_date: "",
    user_create: "",
  });
  isModalOpen.value = true;
};

const editRecord = record => {
  isEditMode.value = true;
  Object.assign(modalForm, { ...record });
  isModalOpen.value = true;
};

function transformData(input) {
  return {
    tieuDe: input.name || "",
    moTaNgan: input.description || "",
    noiDung: input.content || "",
    urlImg: input.image || "",
    active: input.status || false,
    thutuhienthi: input.order || 0,
  };
}

const handleOk = async () => {
  modalLoading.value = true;
  try {
    if (modalForm.id) {
      // await RestApi.service.update(modalForm.id, modalForm);
      const updateBody = {
        id: modalForm.id,
        tieuDe: modalForm.name || "",
        moTaNgan: modalForm.description || "",
        noiDung: modalForm.content || "",
        urlImg: modalForm.image || "",
        active: modalForm.status || false,
        thutuhienthi: modalForm.order || 0,
        ngayTao: modalForm.create_date || "", // Thêm create_date
        nguoiTao: modalForm.user_create || "", // Thêm user_create
      };
      const { data, status } = await RestApi.product.update({ body: JSON.stringify(updateBody) });
      if (status.value === "success") {
        message.success("Cập nhật thành công");
        isModalOpen.value = false;
        await loadData({ ...param.value });
      } else {
        message.error("Cập nhật không thành công");
      }
    } else {
      const { data, status } = await RestApi.product.create({ body: JSON.stringify(transformData(modalForm)) });
      if (status.value === "success") {
        message.success("Thêm mới thành công");
        await loadData({ ...param.value });
        isModalOpen.value = false;
      } else {
        message.error("Thêm mới không thành công");
      }
    }
  } catch (e) {
    message.error("Đã có lỗi xảy ra");
  } finally {
    modalLoading.value = false;
  }
};

const handleCancel = () => {
  isModalOpen.value = false;
};

const deleteRecord = async id => {
  try {
    const { data, status } = await RestApi.product.delete({ params: { id: id } });
    if (status.value === "success") {
      message.success("Xóa thành công");
    } else {
      message.error("Xóa thất bại");
    }
    await loadData({ ...param.value });
  } catch (e) {
    message.error("Xóa thất bại");
  }
};

const loadData = async param => {
  const { data, status } = await RestApi.product.list({ params: param });
  if (status.value === "success") {
    dataSource.value = convert_data(data.value.data);
    pagination.total = data.value.totalrecord || 0;
  } else {
    message.error("Lỗi lấy dữ liệu");
  }
};

await loadData({ ...param.value });

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
    modalForm.image = uploadedUrl;
  } catch (error) {
    console.error("Upload lỗi:", error);
    message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
  }
};
const inputFileUpload = ref(null);
const triggerUpload = () => {
  inputFileUpload.value.click();
};

onMounted(() => {
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => [
    { url: "/page_management", title: "Quản lý site" },
    { url: "/page_management/product", title: "Quản lý sản phẩm" },
  ]);
  settingStore.setBreadcrumb(tempBreadcrumb.value);
  watch(tempBreadcrumb, () => {
    settingStore.setBreadcrumb(tempBreadcrumb.value);
  });
});
</script>

<style scoped>
:deep(.ant-table-header) {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}
</style>
