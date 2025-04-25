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
      {
        id: nuxtApp.$RANDOMID(),
        title: "Nhân viên",
        url: "/system_management/staff",
        key: "/system_management/staff",
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


<!-- <template>
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

          <a-menu 
            :open-keys="menuState.openKeys" 
            v-model:selectedKeys="selectedMenuKeys" 
            mode="inline" 
            :key="locale" 
            @openChange="onMenuOpenChange"
          >
            <template v-for="menuItem in filteredMenuList" :key="menuItem.key">
              <a-sub-menu v-if="menuItem.children?.length" :key="menuItem.key">
                <template #icon>
                  <Icon :name="menuItem.icon || 'ant-design:folder-outlined'" class="text-xl" />
                </template>
                <template #title>
                  <p class="font-roboto">{{ menuItem.title }}</p>
                </template>
                <a-menu-item v-for="subItem in menuItem.children" :key="subItem.key">
                  <p @click="navigateToPage(subItem.url)" class="font-roboto">
                    {{ subItem.title }}
                  </p>
                </a-menu-item>
              </a-sub-menu>

              <a-menu-item v-else :key="menuItem.key" @click="navigateToPage(menuItem.url)">
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
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

const nuxtApp = useNuxtApp();
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

// Dữ liệu menu từ JSON
const menuData = {
    "menu": [
        {
            "id": 1,
            "functionName": "Quản lý hệ thống",
            "parentId": null,
            "link": null
        },
        {
            "id": 2,
            "functionName": "Quản lý nhóm người dùng",
            "parentId": 1,
            "link": "/RolesGroup/Index"
        },
        {
            "id": 3,
            "functionName": "Quản lý người dùng",
            "parentId": 1,
            "link": "/AppUser/Index"
        },
        {
            "id": 4,
            "functionName": "Quản lý website",
            "parentId": null,
            "link": null
        },
        {
            "id": 5,
            "functionName": "Quản lý bán hàng",
            "parentId": null,
            "link": null
        },
        {
            "id": 6,
            "functionName": "Quản lý công việc",
            "parentId": null,
            "link": null
        },
        {
            "id": 7,
            "functionName": "Quản lý Menu",
            "parentId": 4,
            "link": "/QLMenu/Index"
        },
        {
            "id": 8,
            "functionName": "Quản lý Nhân sự",
            "parentId": null,
            "link": null
        },
        {
            "id": 9,
            "functionName": "Danh sách nhân sự",
            "parentId": 8,
            "link": "/UserInfo/Index"
        },
        {
            "id": 10,
            "functionName": "Quản lý thông tin khách hàng",
            "parentId": 6,
            "link": "/QLTTKH/Index"
        },
        {
            "id": 11,
            "functionName": "Quản lý thông tin dự án",
            "parentId": 6,
            "link": "/QLTTDA/Index"
        },
        {
            "id": 13,
            "functionName": "Quản lý thông tin công ty",
            "parentId": 4,
            "link": "/QLTTCT/Index"
        },
        {
            "id": 14,
            "functionName": "Quản lý dịch vụ",
            "parentId": 4,
            "link": "/QL_DichVu/Index"
        },
        {
            "id": 15,
            "functionName": "Quản lý sản phẩm",
            "parentId": 4,
            "link": "/QL_SanPham/Index"
        },
        {
            "id": 16,
            "functionName": "Quản lý Giới thiệu",
            "parentId": 4,
            "link": "/QL_GioiThieu/index"
        },
        {
            "id": 17,
            "functionName": "Quản lý Danh mục",
            "parentId": null,
            "link": null
        },
        {
            "id": 18,
            "functionName": "Danh Mục Chức vụ",
            "parentId": 17,
            "link": "/DM_ChucVu/Index"
        },
        {
            "id": 19,
            "functionName": "Danh Mục Loại Sản Phẩm",
            "parentId": 17,
            "link": "/QLBH_LoaiSanPham/Index"
        },
        {
            "id": 21,
            "functionName": "Danh Mục Kho",
            "parentId": 17,
            "link": "/QLBH_Kho/Index"
        },
        {
            "id": 22,
            "functionName": "Danh Mục Sản Phẩm",
            "parentId": 17,
            "link": "/QLBH_SanPham/Index"
        },
        {
            "id": 24,
            "functionName": "Danh Mục Nhà Cung Cấp",
            "parentId": 17,
            "link": "/QLBH_NhaCungCap/Index"
        },
        {
            "id": 34,
            "functionName": "Hóa đơn Nhập",
            "parentId": 5,
            "link": "/QLBH_ThongTinHoaDonNhap/Index"
        },
        {
            "id": 36,
            "functionName": "Nhập Kho",
            "parentId": 5,
            "link": "/QLBH_ThongTinPhieuNhap/index"
        },
        {
            "id": 37,
            "functionName": "Danh Mục ĐVT",
            "parentId": 17,
            "link": "/QLBH_DVT/Index"
        },
        {
            "id": 39,
            "functionName": "Xuất Kho",
            "parentId": 5,
            "link": "/QLBH_ThongTinPhieuXuat/Index"
        },
        {
            "id": 40,
            "functionName": "Hóa đơn Xuất",
            "parentId": 5,
            "link": "/QLBH_ThongtinHoaDonXuat/Index"
        },
        {
            "id": 41,
            "functionName": "Kiểm Kê",
            "parentId": 5,
            "link": "/QLBH_ThongTinPhieuKiemKe/Index"
        },
        {
            "id": 42,
            "functionName": "Tồn Kho",
            "parentId": 5,
            "link": "/QLBH_TonKho/Index"
        },
        {
            "id": 43,
            "functionName": "Báo cáo Nhập",
            "parentId": 5,
            "link": "/QLBH_BaoCaoNhap/Index"
        },
        {
            "id": 44,
            "functionName": "Báo cáo Xuất ",
            "parentId": 5,
            "link": "/QLBH_BaoCaoXuat/Index"
        },
        {
            "id": 45,
            "functionName": "Báo cáo Xuất Nhập Tồn",
            "parentId": 5,
            "link": "/QLBH_BaoCaoXuatNhapTon/Index"
        },
        {
            "id": 46,
            "functionName": "Báo cáo Hóa đơn nhập",
            "parentId": 5,
            "link": "/QLBH_BaoCaoHoaDonNhap/Index"
        },
        {
            "id": 47,
            "functionName": "Báo cáo Hóa đơn xuất",
            "parentId": 5,
            "link": "/QLBH_BaoCaoHoaDonXuat/Index"
        }
    ]
};

// Chuyển đổi dữ liệu menu thành cấu trúc phù hợp
const formattedMenu = computed(() => {
  const menuItems = menuData.menu.filter(item => item.parentId === null);
  
  return menuItems.map(parentItem => {
    const children = menuData.menu.filter(item => item.parentId === parentItem.id);
    
    return {
      id: parentItem.id,
      title: parentItem.functionName,
      key: `parent-${parentItem.id}`,
      icon: getIconForMenu(parentItem.id),
      children: children.map(child => ({
        id: child.id,
        title: child.functionName,
        key: `child-${child.id}`,
        url: child.link,
        icon: getIconForMenu(child.id)
      }))
    };
  });
});

// Hàm lấy icon tương ứng cho menu (có thể tuỳ chỉnh)
function getIconForMenu(menuId) {
  const icons = {
    1: 'ant-design:setting-outlined',    // Quản lý hệ thống
    4: 'ant-design:global-outlined',     // Quản lý website
    5: 'ant-design:shopping-cart-outlined', // Quản lý bán hàng
    6: 'ant-design:project-outlined',    // Quản lý công việc
    8: 'ant-design:team-outlined',       // Quản lý nhân sự
    17: 'ant-design:appstore-outlined',  // Quản lý danh mục
    // Thêm các icon khác tùy theo nhu cầu
  };
  
  return icons[menuId] || 'ant-design:file-outlined';
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
const navigateToPage = async (url) => {
  if (url) {
    await navigateTo(url);
  }
};

// Xử lý khi mở sub-menu
const onMenuOpenChange = (openKeys) => {
  menuState.openKeys = openKeys.length ? [openKeys.at(-1)] : [];
};

// Gán active menu khi route thay đổi
watch(
  () => router.currentRoute.value.fullPath,
  (newPath) => {
    selectedMenuKeys.value = [newPath];
  }
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
</script> -->