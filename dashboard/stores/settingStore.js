import { defineStore } from "pinia";
export const useSettingStore = defineStore("setting", {
  state: () => ({
    breadcrumb: [
      { url: "/dashboard", title: "Dashboard" },
      { url: "/dashboard", title: "Dashboard" },
    ],
    loading: false,
    menu:[]
  }),
  actions: {
    setBreadcrumb(value) {
      this.breadcrumb =value;
    },
    setLoading(value) {
      this.loading = value;
    },
    setMenu(value) {
      this.menu = value
    }
  },
  getters: {
  },
});