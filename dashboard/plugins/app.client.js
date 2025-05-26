import { customAlphabet } from "nanoid";
import { useSettingStore } from "~~/stores/settingStore";
export default defineNuxtPlugin(async NuxtApp => {
  const { RestApi } = useApi();
  const settingStore = useSettingStore(NuxtApp.$pinia);
  // const { data, status } = await RestApi.menu_backend.menu_by_user();
  // if (status.value === "success") {
  //   settingStore.setMenu(data.value.menu);
  // }

  // const t = NuxtApp.$i18n.t;
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
  return {
    provide: {
      RANDOMID: () => nanoid(),
    },
  };
});
