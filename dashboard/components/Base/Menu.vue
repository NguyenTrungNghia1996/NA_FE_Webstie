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
              <a-sub-menu v-if="menuItem.children?.length" :key="menuItem.key">
                <template #icon>
                  <Icon :name="menuItem.icon || 'ant-design:folder-outlined'" class="text-xl" />
                </template>
                <template #title>
                  <p class="font-roboto">{{ menuItem.title }}</p>
                </template>
                <a-menu-item v-for="subItem in menuItem.children" :key="subItem.url">
                  <p @click="navigateToPage(subItem.url)" class="font-roboto">
                    {{ subItem.title }}
                  </p>
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item v-else-if="menuItem.url" :key="menuItem.url" @click="navigateToPage(menuItem.url)">
                <template #icon>
                  <Icon :name="menuItem.icon || 'ant-design:file-outlined'" class="text-xl" />
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
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
const settingStore = useSettingStore();
const { locale } = useI18n();
const router = useRouter();

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

const formattedMenu = computed(() => {
  // Sort parent items by stt (order)
  const menuItems = settingStore.menu
    .filter(item => item.parentId === null)
    .sort((a, b) => a.stt - b.stt);

  return menuItems.map(parentItem => {
    // Sort children items by stt (order)
    const children = settingStore.menu
      .filter(item => item.parentId === parentItem.id)
      .sort((a, b) => a.stt - b.stt);

    return {
      id: parentItem.id,
      title: parentItem.functionName,
      key: `parent-${parentItem.id}`,
      url: parentItem.link || null,
      icon: getIconForMenu(parentItem.id),
      children: children.map(child => ({
        id: child.id,
        title: child.functionName,
        key: `child-${child.id}`,
        url: child.link,
        icon: getIconForMenu(child.id),
        stt: child.stt // Keep stt for potential sorting
      })),
      stt: parentItem.stt // Keep stt for potential sorting
    };
  });
});

// Hàm lấy icon tương ứng cho menu
function getIconForMenu(menuId) {
  const icons = {
    1: "ant-design:setting-outlined",
    4: "ant-design:global-outlined",
    5: "ant-design:shopping-cart-outlined",
    6: "ant-design:project-outlined",
    8: "ant-design:team-outlined",
    17: "ant-design:appstore-outlined",
  };
  return icons[menuId] || "ant-design:file-outlined";
}

// Tìm kiếm menu theo keyword
const filteredMenuList = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();
  if (!keyword) return formattedMenu.value;

  return formattedMenu.value
    .map(menu => {
      const matchingChildren = menu.children?.filter(child => 
        child.title.toLowerCase().includes(keyword)
      );

      if (menu.title.toLowerCase().includes(keyword) || matchingChildren?.length) {
        return {
          ...menu,
          children: matchingChildren?.length ? matchingChildren : menu.children,
        };
      }
      return null;
    })
    .filter(Boolean);
});

// Điều hướng trang
const navigateToPage = async url => {
  if (url) {
    await navigateTo(url);
  }
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
  const currentPath = router.currentRoute.value.fullPath;

  // Tìm menu cha chứa route hiện tại
  const parentItem = formattedMenu.value.find(menu => 
    menu.children?.some(child => child.url === currentPath)
  );

  if (parentItem) {
    menuState.openKeys = [parentItem.key];
  }
});
</script>