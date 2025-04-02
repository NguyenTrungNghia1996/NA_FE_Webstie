import { defineStore } from "pinia";
export const useUserStore = defineStore('user', {
  state: () => ({
    user:{}
  }),
  actions: {
    setUser(value) {
      this.user = value;
    },
    logout() {
      this.user = {};
      const token = useCookie("TOKEN");
      token.value = "";
      // if (process.client) {
      //   localStorage.setItem("user", JSON.stringify({}))
      // }
      // return navigateTo('/auth/login')
    }
  },
  getters: {}
})