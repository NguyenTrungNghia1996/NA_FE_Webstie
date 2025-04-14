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
    products: [],
    service: [],
    typical_customers: [],
  }),
  actions: {
    setInfo(value) {
      this.info = value;
    },
    setProduct(value) {
      this.products = value;
    },
    setService(value) {
      this.service = value;
    },
    setTypicalCustomers(value) {
      this.typical_customers = value;
    },
  },
  getters: {},
});
