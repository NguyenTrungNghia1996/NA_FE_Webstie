import { defineStore } from "pinia";
export const useSettingStore = defineStore("setting", {
  state: () => ({
    info:{},
  }),
  actions: {
    setInfo(value) {
      this.info =value;
    }
  },
  getters: {
  },
});