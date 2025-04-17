<template>
  <div class="flex flex-col min-h-full">
    <!-- Search Form -->
    <div class="bg-white grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
      <a-form :model="modelRef" ref="formRef" autocomplete="off" layout="horizontal" @finish="onSubmit">
        <a-form-item class="!mb-0" label="Tìm Kiếm" name="name">
          <a-input v-model:value="modelRef.name" placeholder="Tìm kiếm dịch vụ" />
        </a-form-item>
      </a-form>
      <div class="flex flex-wrap gap-2 justify-end mt-2 md:mt-0">
        <a-button @click="resetForm" class="font-roboto w-full md:w-auto">Đặt Lại</a-button>
        <a-button class="font-roboto w-full md:w-auto" htmlType="submit" type="primary" @click="formRef?.submit()">Tìm Kiếm</a-button>
      </div>
    </div>

    <!-- Table and Add Button -->
    <div class="bg-white flex-1 mt-2 p-3 overflow-auto">
      <div class="flex justify-end py-3">
        <a-button @click="showModal" type="primary">
          <span class="flex justify-center items-center">Thêm mới</span>
        </a-button>
      </div>

      <a-table
        :dataSource="dataSource"
        :columns="columns"
        rowKey="id"
        :scroll="{ x: 'max-content' }"
        class="overflow-auto"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'image'">
            <img :src="record.image" alt="Hình ảnh" class="w-16 h-10 object-cover" />
          </template>
          <template v-else-if="column.key === 'status'">
            <span>{{ record.status ? 'Hiện' : 'Ẩn' }}</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex gap-2">
              <a-button type="primary" size="small" @click="editRecord(record)">Chỉnh sửa</a-button>
              <a-popconfirm
                title="Bạn có chắc muốn xóa?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteRecord(record.id)"
              >
                <a-button type="primary" danger size="small">Xóa</a-button>
              </a-popconfirm>
            </div>
          </template>
        </template>
      </a-table>
    </div>

    <!-- Modal Thêm/Sửa -->
    <a-modal
      v-model:open="isModalOpen"
      :title="isEditMode ? 'Chỉnh sửa Dịch Vụ' : 'Thêm Dịch Vụ'"
      @ok="handleOk"
      @cancel="handleCancel"
      :confirm-loading="modalLoading"
    >
      <a-form :model="modalForm" layout="vertical">
        <a-form-item label="Tiêu đề" name="name">
          <a-input v-model:value="modalForm.name" />
        </a-form-item>
        <a-form-item label="Mô tả ngắn" name="description">
          <a-input v-model:value="modalForm.description" />
        </a-form-item>
        <a-form-item label="Hình ảnh" name="image">
          <a-input v-model:value="modalForm.image" />
        </a-form-item>
        <a-form-item label="Thứ tự" name="order">
          <a-input-number v-model:value="modalForm.order" class="w-full" />
        </a-form-item>
        <a-form-item label="Trạng thái" name="status">
          <a-switch v-model:checked="modalForm.status" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { message } from 'ant-design-vue';

const nuxtApp = useNuxtApp();
const { RestApi } = useApi();
const t = nuxtApp.$i18n.t;

const columns = ref([
  { title: 'STT', dataIndex: 'number', key: 'number', width: 80 },
  { title: 'Tiêu đề', dataIndex: 'name', key: 'name', width: 200 },
  { title: 'Mô tả ngắn', dataIndex: 'description', key: 'description', width: 250 },
  { title: 'Hình ảnh', dataIndex: 'image', key: 'image', width: 120 },
  { title: 'Thứ tự', dataIndex: 'order', key: 'order', width: 100 },
  { title: 'Trạng Thái', dataIndex: 'status', key: 'status', width: 100 },
  { title: 'Chức năng', key: 'action', fixed: 'right', width: 160 },
]);

const dataSource = ref([]);
const convert_data = data => {
  return data.map((item, index) => ({
    id: item.id,
    number: index + 1,
    name: item.tieuDe,
    description: item.moTaNgan,
    content: item.noiDung,
    image: item.urlImg,
    order: item.thutuhienthi,
    status: item.active,
  }));
};

const modelRef = reactive({ name: '' });
const formRef = ref();

const param = ref({ search: '', PageIndex: 1, PageSize: 10 });

const resetForm = () => {
  formRef.value.resetFields();
  param.value.search = '';
  loadData();
};

const onSubmit = value => {
  param.value.search = value.name;
  param.value.PageIndex = 1;
  loadData();
};

const isModalOpen = ref(false);
const isEditMode = ref(false);
const modalLoading = ref(false);
const modalForm = reactive({
  id: null,
  name: '',
  description: '',
  image: '',
  order: 0,
  status: true,
});

const showModal = () => {
  isEditMode.value = false;
  Object.assign(modalForm, {
    id: null,
    name: '',
    description: '',
    image: '',
    order: 0,
    status: true,
  });
  isModalOpen.value = true;
};

const editRecord = record => {
  isEditMode.value = true;
  Object.assign(modalForm, { ...record });
  isModalOpen.value = true;
};

const handleOk = async () => {
  modalLoading.value = true;
  try {
    if (modalForm.id) {
      await RestApi.service.update(modalForm.id, modalForm);
      message.success('Cập nhật thành công');
    } else {
      await RestApi.service.create(modalForm);
      message.success('Thêm mới thành công');
    }
    await loadData();
    isModalOpen.value = false;
  } catch (e) {
    message.error('Đã có lỗi xảy ra');
  } finally {
    modalLoading.value = false;
  }
};

const handleCancel = () => {
  isModalOpen.value = false;
};

const deleteRecord = async id => {
  try {
    await RestApi.service.delete(id);
    message.success('Xóa thành công');
    await loadData();
  } catch (e) {
    message.error('Xóa thất bại');
  }
};

const loadData = async () => {
  const { data, status } = await RestApi.service.list({ params: param.value });
  if (status.value === 'success') {
    dataSource.value = convert_data(data.value.data);
  }
};

await loadData();

onMounted(() => {
  const settingStore = useSettingStore();
  const tempBreadcrumb = computed(() => [
    { url: '/manage_site', title: 'Quản lý site' },
    { url: '/manage_site/service', title: 'Quản lý dịch vụ' },
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
