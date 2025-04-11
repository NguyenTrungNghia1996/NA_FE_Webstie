import { useSettingStore } from "#imports";
export default defineNuxtPlugin(async (nuxtApp) => {
  const settingStore = useSettingStore(nuxtApp.$pinia);
  const { RestApi } = useApi();
  const convertCompanyData = (input) => {
    return {
      name: input.tenCty || "",
      description: input.moTa || "",
      address: input.diaChi || "",
      phone: input.soDienThoai || "",
      email: input.email || "",
      facebook: input.facebook || "",
      logo: input.logoimg || "",
      website: input.website || "",
      message: input.linkMess || "",
    };
  };
  const { data, status, error } = await RestApi.view.info();
  if (status.value == "success") {
    settingStore.setInfo(convertCompanyData(data.value))
  } else {
    console.log("error:", error);
  }
});
