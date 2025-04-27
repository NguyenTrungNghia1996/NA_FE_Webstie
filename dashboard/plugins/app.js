import { customAlphabet } from "nanoid";
import { useSettingStore } from "~~/stores/settingStore";
export default defineNuxtPlugin(async NuxtApp => {
  const { RestApi } = useApi();
  const settingStore = useSettingStore(NuxtApp.$pinia);
  const { data, status } = await RestApi.menu_backend.list_full_detail({
    body: JSON.stringify({
      pageIndex: "1",
      pageSize: "100",
    }),
  });
  if (status.value === "success") {
    settingStore.setMenu(data.value.menu);
  }

  // const t = NuxtApp.$i18n.t;
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
  return {
    provide: {
      RANDOMID: () => nanoid(),
    },
  };
});
