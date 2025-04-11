import { defineStore } from "pinia";
export const useSettingStore = defineStore("setting", {
  state: () => ({
    info: {
      name: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      facebook: "",
      logo: "",
      website: "",
      message: "",
    },
  }),
  actions: {
    setInfo(value) {
      this.info = value;
    },
  },
  getters: {},
});
