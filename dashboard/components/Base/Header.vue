<template>
  <div class="h-full w-full flex justify-between items-center bg-[#4096FF] px-5">
    <div class="flex space-x-3 items-center">
      <span class="font-roboto font-semibold text-white text-xl p-3">Dashboard</span>
    </div>
    <div class="flex space-x-3 items-center">
      <!-- <LangSwitcher /> -->
      <a-dropdown>
        <div class="ant-dropdown-link flex items-center" @click.prevent>
          <a-avatar v-if="userStore.user.avatar" :src="userStore.user.avatar" />
          <a-avatar v-else>
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <span class="text-white pl-2">{{ userStore.user.name || "" }}</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="change_password" @click="showChangePasswordModal">
              <div>{{ $t("change_password") }}</div>
            </a-menu-item>
            <a-menu-item key="logout" @click="signOut">
              <div>{{ $t("logout") }}</div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <!-- Change Password Modal -->
    <a-modal v-model:open="changePasswordModalVisible" :title="$t('change_password')" @ok="handleChangePassword" @cancel="handleCancel" :confirm-loading="confirmLoading">
      <a-form layout="vertical" :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" autocomplete="off">
        <a-form-item :label="$t('current_password')" name="currentPassword">
          <a-input-password v-model:value="passwordForm.currentPassword" />
        </a-form-item>
        <a-form-item :label="$t('new_password')" name="newPassword">
          <a-input-password v-model:value="passwordForm.newPassword" />
        </a-form-item>
        <a-form-item :label="$t('confirm_password')" name="confirmPassword">
          <a-input-password v-model:value="passwordForm.confirmPassword" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
const userStore = useUserStore();
const { RestApi } = useApi();

// Modal state
const changePasswordModalVisible = ref(false);
const confirmLoading = ref(false);
const passwordFormRef = ref();

// Form data
const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Validation rules
const passwordRules = {
  currentPassword: [{ required: true, message: "Bạn phải nhập mật khẩu hiện tại" }],
  newPassword: [
    { required: true, message: "Bạn phải nhập mật khẩu mới" },
    { min: 6, message: "Mật khẩu có ít nhất 6 kí tự " },
  ],
  confirmPassword: [
    { required: true, message: "Bạn cần xác nhận lại mật khẩu mới" },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("newPassword") === value) {
          return Promise.resolve();
        }
        return Promise.reject("Hai mật khẩu không khớp nhau!");
      },
    }),
  ],
};

const showChangePasswordModal = () => {
  changePasswordModalVisible.value = true;
};

const handleChangePassword = async () => {
  try {
    await passwordFormRef.value.validate();
    confirmLoading.value = true;
    const { data, status } = await RestApi.user.change_pasword({
      body: JSON.stringify({
        confirmNewPassword: passwordForm.value.confirmPassword,
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword,
      }),
    });
    if (status.value === "success") {
      message.success("Thay đổi mật khẩu thành công");
      await userStore.logout();
      await navigateTo("/auth/login");
    } else {
      message.error("Thay đổi mật khẩu không thành công");
    }
  } catch (error) {
    message.error(error.response?.data?.message || "Thay đổi mật khẩu thất bại");
  } finally {
    // resetForm();
    // changePasswordModalVisible.value = false;
    confirmLoading.value = false;
  }
};

const handleCancel = () => {
  resetForm();
  changePasswordModalVisible.value = false;
};

const resetForm = () => {
  passwordForm.value = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  if (passwordFormRef.value) {
    passwordFormRef.value.clearValidate();
  }
};

const signOut = async () => {
  try {
    await userStore.logout();
    await navigateTo("/auth/login");
  } catch (error) {
    message.error("Logout failed");
  }
};
</script>

<style scoped>
.ant-dropdown-link {
  cursor: pointer;
  transition: opacity 0.2s;
}

.ant-dropdown-link:hover {
  opacity: 0.8;
}
</style>
