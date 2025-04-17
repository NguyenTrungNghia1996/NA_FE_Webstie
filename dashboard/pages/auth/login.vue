<template>
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo công ty -->
      <div class="flex justify-center">
        <img src="/logo.png" alt="Logo công ty" class="h-24 w-auto" />
      </div>

      <a-card class="shadow-lg">
        <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Đăng nhập hệ thống</h2>

        <a-form :model="form" layout="vertical" @finish="handleLogin" autocomplete="off">
          <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Vui lòng nhập email!' }]">
            <a-input v-model:value="form.email" placeholder="Nhập email của bạn" size="large">
              <template #prefix>
                <UserOutlined class="text-gray-400" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="Mật khẩu" name="password" :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]">
            <a-input-password v-model:value="form.password" placeholder="Nhập mật khẩu" size="large">
              <template #prefix>
                <LockOutlined class="text-gray-400" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="flex justify-between mb-4">
            <a-checkbox v-model:checked="rememberMe"> Ghi nhớ đăng nhập </a-checkbox>
            <a-typography-link> Quên mật khẩu? </a-typography-link>
          </div>

          <a-form-item>
            <a-button type="primary" html-type="submit" size="large" block :loading="loading"> Đăng nhập </a-button>
          </a-form-item>
        </a-form>
      </a-card>

      <!-- <div class="text-center text-sm text-gray-600 mt-4">
        Chưa có tài khoản? <a-typography-link>Đăng ký ngay</a-typography-link>
      </div> -->
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "auth" });
const form = reactive({
  email: "",
  password: "",
});

const rememberMe = ref(false);
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    // Xử lý đăng nhập
    console.log("Form submitted:", { ...form, rememberMe: rememberMe.value });
    // await loginApi(form)
    // navigateTo('/dashboard')
  } catch (error) {
    console.error("Login failed:", error);
    message.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Bạn có thể thêm style tùy chỉnh ở đây nếu cần */
:deep(.ant-card) {
  border-radius: 8px;
}

:deep(.ant-input-affix-wrapper) {
  padding: 8px 11px;
}
</style>
