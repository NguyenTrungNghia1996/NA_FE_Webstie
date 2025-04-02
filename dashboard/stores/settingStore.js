import { defineStore } from "pinia";
export const useSettingStore = defineStore("setting", {
  state: () => ({
    breadcrumb:[],
  }),
  actions: {
    setBreadcrumb(value) {
      this.breadcrumb =value;
    }
  },
  getters: {
  },
});