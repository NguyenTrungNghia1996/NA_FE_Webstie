import { defineStore } from "pinia";
export const useSettingStore = defineStore("setting", {
  state: () => ({
    breadcrumb: [
      { url: "/dashboard", title: "Dashboard" },
      { url: "/dashboard", title: "Dashboard" },
    ],
    loading: false,
    menu: [
      { id: 1, stt: 1, functionName: "Quản lý hệ thống", parentId: null, link: "/system_management", parentName: null },
      { id: 4, stt: 2, functionName: "Quản lý website", parentId: null, link: "/page_management", parentName: null },
      { id: 5, stt: 3, functionName: "Quản lý bán hàng", parentId: null, link: null, parentName: null },
      { id: 6, stt: 4, functionName: "Quản lý công việc", parentId: null, link: null, parentName: null },
      { id: 8, stt: 5, functionName: "Quản lý Nhân sự", parentId: null, link: null, parentName: null },
      { id: 9, stt: 6, functionName: "Danh sách nhân sự", parentId: 8, link: "/", parentName: "Quản lý Nhân sự" },
      { id: 10, stt: 7, functionName: "Quản lý thông tin khách hàng", parentId: 6, link: "/", parentName: "Quản lý công việc" },
      { id: 11, stt: 8, functionName: "Quản lý thông tin dự án", parentId: 6, link: "/", parentName: "Quản lý công việc" },
      { id: 17, stt: 9, functionName: "Quản lý Danh mục", parentId: null, link: null, parentName: null },
      { id: 18, stt: 10, functionName: "Danh Mục Chức vụ", parentId: 17, link: "/", parentName: "Quản lý Danh mục" },
      { id: 19, stt: 11, functionName: "Danh Mục Loại Sản Phẩm", parentId: 17, link: "/", parentName: "Quản lý Danh mục" },
      { id: 21, stt: 12, functionName: "Danh Mục Kho", parentId: 17, link: "/", parentName: "Quản lý Danh mục" },
      { id: 22, stt: 13, functionName: "Danh Mục Sản Phẩm", parentId: 17, link: "/", parentName: "Quản lý Danh mục" },
      { id: 24, stt: 14, functionName: "Danh Mục Nhà Cung Cấp", parentId: 17, link: "/", parentName: "Quản lý Danh mục" },
      { id: 34, stt: 15, functionName: "Hóa đơn Nhập", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 36, stt: 16, functionName: "Nhập Kho", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 37, stt: 17, functionName: "Danh Mục ĐVT", parentId: 17, link: "/", parentName: "Quản lý Danh mục" },
      { id: 39, stt: 18, functionName: "Xuất Kho", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 40, stt: 19, functionName: "Hóa đơn Xuất", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 41, stt: 20, functionName: "Kiểm Kê", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 42, stt: 21, functionName: "Tồn Kho", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 43, stt: 22, functionName: "Báo cáo Nhập", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 44, stt: 23, functionName: "Báo cáo Xuất ", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 45, stt: 24, functionName: "Báo cáo Xuất Nhập Tồn", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 46, stt: 25, functionName: "Báo cáo Hóa đơn nhập", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 47, stt: 26, functionName: "Báo cáo Hóa đơn xuất", parentId: 5, link: "/", parentName: "Quản lý bán hàng" },
      { id: 50, stt: 27, functionName: "Menu", parentId: 4, link: "/page_management/menu", parentName: "Quản lý website" },
      { id: 51, stt: 28, functionName: "Thông tin công ty", parentId: 4, link: "/page_management/information", parentName: "Quản lý website" },
      { id: 52, stt: 29, functionName: "Dịch vụ", parentId: 4, link: "/page_management/service", parentName: "Quản lý website" },
      { id: 53, stt: 30, functionName: "Sản phẩm", parentId: 4, link: "/page_management/product", parentName: "Quản lý website" },
      { id: 54, stt: 31, functionName: "Nhóm người dùng", parentId: 1, link: "/system_management/group", parentName: "Quản lý hệ thống" },
      { id: 55, stt: 32, functionName: "Người dùng", parentId: 1, link: "/system_management/user", parentName: "Quản lý hệ thống" },
      { id: 56, stt: 33, functionName: "Nhân viên", parentId: 1, link: "/system_management/staff", parentName: "Quản lý hệ thống" },
      { id: 57, stt: 34, functionName: "Menu", parentId: 1, link: "/system_management/menu", parentName: "Quản lý hệ thống" },
    ],
  }),
  actions: {
    setBreadcrumb(value) {
      this.breadcrumb = value;
    },
    setLoading(value) {
      this.loading = value;
    },
    setMenu(value) {
      this.menu = value;
    },
  },
  getters: {},
});
