import { defineStore } from "pinia";
export const useSettingStore = defineStore("setting", {
  state: () => ({
    breadcrumb: [
      { url: "/dashboard", title: "Dashboard" },
      { url: "/dashboard", title: "Dashboard" },
    ],
    loading: false,
  }),
  actions: {
    setBreadcrumb(value) {
      this.breadcrumb =value;
    },
    setLoading(value) {
      this.loading = value;
    },
  },
  getters: {
  },
});