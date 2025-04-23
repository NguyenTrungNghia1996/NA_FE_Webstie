<template>
  <div class="h-full flex flex-col bg-white border">
    <ClientOnly>
      <a-layout class="flex-1 overflow-y-auto">
        <a-layout-sider theme="light" width="250px" v-model:collapsed="collapsed" collapsible>
          <div class="p-2">
            <template v-if="!collapsed">
              <a-input v-model:value="searchQuery" placeholder="Tìm kiếm menu..." allow-clear @focus="expandSidebar" />
            </template>
            <template v-else>
              <div class="w-full flex justify-center cursor-pointer" @click="expandSidebar">
                <Icon name="ant-design:search-outlined" class="text-xl" />
              </div>
            </template>
          </div>

          <a-menu :open-keys="menuState.openKeys" v-model:selectedKeys="selectedMenuKeys" mode="inline" :key="locale" @openChange="onMenuOpenChange">
            <template v-for="menuItem in filteredMenuList" :key="menuItem.key">
              <a-sub-menu v-if="menuItem.child?.length" :key="menuItem.key">
                <template #icon>
                  <Icon :name="menuItem.icon" class="text-3xl" />
                </template>
                <template #title>
                  <p class="font-roboto">{{ menuItem.title }}</p>
                </template>
                <a-menu-item v-for="subItem in menuItem.child" :key="subItem.key">
                  <p @click="navigateToPage(subItem.url)" class="font-roboto">
                    {{ subItem.title }}
                  </p>
                </a-menu-item>
              </a-sub-menu>

              <a-menu-item v-else :key="menuItem.url" @click="navigateToPage(menuItem.url)">
                <template #icon>
                  <Icon :name="menuItem.icon" class="text-3xl" />
                </template>
                <p class="font-roboto">{{ menuItem.title }}</p>
              </a-menu-item>
            </template>
          </a-menu>
        </a-layout-sider>
      </a-layout>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
import { useUserStore } from "~~/stores/userStore";

const nuxtApp = useNuxtApp();
const { locale } = useI18n();
const t = nuxtApp.$i18n.t;
const router = useRouter();
const userStore = useUserStore();

const collapsed = ref(false);
const selectedMenuKeys = ref([]);
const menuState = reactive({ openKeys: [] });
const searchQuery = ref("");

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMediumAndUp = breakpoints.greaterOrEqual("md");
const isLargeAndUp = breakpoints.greaterOrEqual("lg");

// Tự động ẩn/hiện menu theo kích thước
watch(isMediumAndUp, () => {
  if (!isMediumAndUp.value && !collapsed.value) collapsed.value = true;
});
watch(isLargeAndUp, () => {
  if (isLargeAndUp.value && collapsed.value) collapsed.value = false;
});

// Menu mẫu (có thể tách ra file riêng)
const menuAdmin = computed(() => [
  {
    id: nuxtApp.$RANDOMID(),
    title: t("dashboard"),
    url: "/dashboard",
    icon: "ant-design:dashboard-outlined",
    key: "/dashboard",
  },
  {
    id: nuxtApp.$RANDOMID(),
    title: "Quản lý website",
    url: "/page_management",
    icon: "ant-design:team-outlined",
    key: "/page_management",
    child: [
      {
        id: nuxtApp.$RANDOMID(),
        title: "Menu",
        url: "/page_management/menu",
        key: "/page_management/menu",
      },
      {
        id: nuxtApp.$RANDOMID(),
        title: "Thông tin công ty",
        url: "/page_management/information",
        key: "/page_management/information",
      },
      {
        id: nuxtApp.$RANDOMID(),
        title: "Dịch vụ",
        url: "/page_management/service",
        key: "/page_management/service",
      },
      {
        id: nuxtApp.$RANDOMID(),
        title: "Sản phẩm",
        url: "/page_management/product",
        key: "/page_management/product",
      },
    ],
  },
  {
    id: nuxtApp.$RANDOMID(),
    title: "Quản lý hệ thống",
    url: "/system_management",
    icon: "ant-design:team-outlined",
    key: "/system_management",
    child: [
      {
        id: nuxtApp.$RANDOMID(),
        title: "Nhóm người dùng",
        url: "/system_management/group",
        key: "/system_management/group",
      },
      {
        id: nuxtApp.$RANDOMID(),
        title: "Người dùng",
        url: "/system_management/user",
        key: "/system_management/user",
      },
    ],
  },
]);

// Hàm trả về danh sách menu tương ứng role
function getAvailableMenus() {
  if (userStore.user.role === "user" && userStore.user.user_type === "admin") {
    return menuAdmin.value;
  }
  return menuAdmin.value;
}

// Tìm kiếm menu theo keyword
const filteredMenuList = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();
  if (!keyword) return getAvailableMenus();

  return getAvailableMenus()
    .map(menu => {
      const matchingChildren = menu.child?.filter(child => child.title.toLowerCase().includes(keyword));
      if (menu.title.toLowerCase().includes(keyword) || matchingChildren?.length) {
        return {
          ...menu,
          child: matchingChildren?.length ? matchingChildren : menu.child,
        };
      }
      return null;
    })
    .filter(Boolean);
});

// Điều hướng trang
const navigateToPage = async url => {
  await navigateTo(url);
};

// Xử lý khi mở sub-menu
const onMenuOpenChange = openKeys => {
  menuState.openKeys = openKeys.length ? [openKeys.at(-1)] : [];
};

// Gán active menu khi route thay đổi
watch(
  () => router.currentRoute.value.fullPath,
  newPath => {
    selectedMenuKeys.value = [newPath];
  },
);

// Mở rộng sidebar khi click tìm kiếm
const expandSidebar = () => {
  collapsed.value = false;
};

// Xử lý mở menu cha khi load
onMounted(() => {
  selectedMenuKeys.value = [router.currentRoute.value.fullPath];
  const allMenus = getAvailableMenus();
  const parentItem = allMenus.find(menu => menu.child?.some(child => child.url === router.currentRoute.value.fullPath));
  if (parentItem) {
    menuState.openKeys = [parentItem.key];
  }
});
</script>
