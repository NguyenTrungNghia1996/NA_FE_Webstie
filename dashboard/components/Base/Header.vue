<template>
  <div class="h-full w-full flex justify-between items-center bg-[#001529] px-5">
    <div class="flex space-x-3 items-center">
      <!-- <img src="/img/logo.png" class="h-10" /> -->
      <span class="font-semibold text-white text-xl p-3">Dashboard</span>
    </div>
    <div class="flex space-x-3 items-center">
      <LangSwitcher />
      <a-dropdown>
        <div class="ant-dropdown-link" @click.prevent>
          <a-avatar v-if="userStore.user.avatar" :src="userStore.user.avatar"/>
          <a-avatar v-else>
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <span v-if="userStore.user.name" class="text-white pl-2">{{ userStore.user.name }}</span>
          <span v-else class="text-white pl-2"></span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="user_info">
              <div @click="toInfo">{{ $t("personal-information") }}</div>
            </a-menu-item>
            <a-menu-item key="logout">
              <div @click="signOut">{{ $t("logout") }}</div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script setup>
const userStore = useUserStore();
const signOut = async () => {
  userStore.logout();
  window.location.reload();
  // await navigateTo("/auth/login");
  // await navigateTo("/test/test");
};
const toInfo = async () => {
  await navigateTo("/info");
};
</script>