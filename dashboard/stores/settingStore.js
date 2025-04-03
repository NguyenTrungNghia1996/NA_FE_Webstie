import { defineStore } from "pinia";
export const useSettingStore = defineStore("setting", {
  state: () => ({
    breadcrumb: [
      { url: "/dashboard", title: "Dashboard" },
      { url: "/dashboard", title: "Dashboard" },
    ],
  }),
  actions: {
    setBreadcrumb(value) {
      this.breadcrumb =value;
    }
  },
  getters: {
  },
});