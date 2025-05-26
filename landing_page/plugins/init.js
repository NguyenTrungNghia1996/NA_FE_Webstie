import { useSettingStore } from "#imports";
export default defineNuxtPlugin(async nuxtApp => {
  const settingStore = useSettingStore(nuxtApp.$pinia);
  const { RestApi } = useApi();
  const appTitle = useState('appTitle', () => '')
  const convertCompanyData = input => {
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
      title: input.title || ""
    };
  };
  const { data: info, status: status_info, error: error_info } = await RestApi.view.info();
  if (status_info.value == "success") {
    appTitle.value = info.value?.title || 'Nguyên Anh EST'
    settingStore.setInfo(convertCompanyData(info.value));
  } else {
    console.log("error:", error_info);
  }
  const { data: proudct, status: status_proudct, error: error_proudct } = await RestApi.product.get_proudct();
  if (status_proudct.value == "success") {
    settingStore.setProduct(
      proudct.value.map(item => {
        return {
          lable: item.tieuDe,
          url: `/sanpham/${item.id}`
        };
      }),
    );
  } else {
    console.log("error:", error_proudct);
  }
  const { data: service, status: status_service, error: error_service } = await RestApi.product.get_service();
  if (status_service.value == "success") {
    settingStore.setService(
      service.value.map(item => {
        return {
          lable: item.tieuDe,
          url: `/dichvu/${item.id}`
        };
      }),
    );
  } else {
    console.log("error:", error_service);
  }


});
