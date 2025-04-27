let ENDPOINTS = {
  Login: "/api/backend/Authen/login",
  S3: "/api/backend/Upload/presigned-url",
  INFO: "/api/backend/Thongtincongty/info",
  //service
  SERVICE_LIST: "/api/backend/Dichvu/Dichvu_Getlist_Paging",
  SERVICE: "/api/backend/Dichvu/Dichvu",
  //intro
  INTRO_LIST: "/api/backend/Gioithieu/Gioithieu_Getlist_Paging",
  INTRO: "/api/backend/Gioithieu/gioithieu",
  //product
  PRODUCT_LIST: "/api/backend/Sanpham/Sanpham_Getlist_Paging",
  PRODUCT: "/api/backend/Sanpham/Sanpham",
  //Intro
  INTRO_LIST: "/api/backend/Gioithieu/Gioithieu_Getlist_Paging",
  INTRO: "/api/backend/Gioithieu/gioithieu",
  //Menu
  MENU_LIST: "/api/backend/Menu_Website/Menu_Website_Getlist_Paging",
  MENU: "/api/backend/Menu_Website/Menu_Website_Detail",
  //permission
  PERMISSION_GROUP: "/api/backend/RolesGroup/Danhsachnhomquyen",
  PERMISSION: "/api/backend/RolesGroup/phanquyen",
  //user
  USER_LIST: "/api/backend/User/GetList_UserPaging",
  USER: "/api/backend/User/user",
  //staff
  STAFF_LIST: "/api/backend/NhanSu/Nhansu_Getlist_Paging",
  STAFF: "/api/backend/NhanSu/NhanSu",
  POSITION:"/api/backend/NhanSu/chucvu",
  //change_password
  CHANGE_PASSWORD: "/api/backend/User/user/change-password",
  RESET_PASSWORD:"/api/backend/User/user/reset-password",
  //Menu_backend
  GET_ALL_MENU: "/api/backend/Menu/GetallFunction",
  GET_DETAIL_FULL_MENU: "/api/backend/Menu/GetlistallMenu_Paging",
  MENU_BACKEND:"/api/backend/Menu/function"
};
import { useUserStore } from "~~/stores/userStore";
class Request {
  constructor() {
    this.handler = {
      onRequest({ request, options }) {},
      onRequestError({ request, options, error }) {},
      onResponse({ request, response, options }) {
        return response._data;
      },
      async onResponseError({ request, response, options }) {
        if (response.status == 401) {
          const userStore = useUserStore();
          userStore.logout();
          return await navigateTo("/auth/login");
        }
        return response._data;
      },
    };
    const userStore = useUserStore();
    this.TOKEN = `Bearer ${userStore.user.token}`;
    this.base_url = useRuntimeConfig().public.baseURL;
  }
  get(url, options) {
    return useFetch(url, {
      baseURL: this.base_url,
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: this.TOKEN,
      },
      ...options,
      ...this.handler,
    });
  }
  post(url, options) {
    return useFetch(url, {
      baseURL: this.base_url,
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: this.TOKEN,
      },
      ...options,
      ...this.handler,
    });
  }
  patch(url, options) {
    return useFetch(url, {
      baseURL: this.base_url,
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: this.TOKEN,
      },
      ...options,
      ...this.handler,
    });
  }
  put(url, options) {
    return useFetch(url, {
      baseURL: this.base_url,
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: this.TOKEN,
      },
      ...options,
      ...this.handler,
    });
  }
  delete(url, options) {
    return useFetch(url, {
      baseURL: this.base_url,
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: this.TOKEN,
      },
      ...options,
      ...this.handler,
    });
  }
}
class RestApi {
  constructor() {
    this.request = new Request();
    this.user = new User(this.request);
    this.service = new Service(this.request);
    this.product = new Product(this.request);
    this.info = new Info(this.request);
    this.intro = new Intro(this.request);
    this.menu = new Menu(this.request);
    this.permission = new Permission(this.request);
    this.staff = new Staff(this.request);
    this.menu_backend = new Menu_backend(this.request);
  }
  async get_url_upload(acl, content_encoding, content_type, key, platform) {
    let data = { acl, content_encoding, content_type, key, platform };
    return this.request.put(ENDPOINTS.S3, { body: data });
  }
  async upload_s3(
    key,
    data,
    { acl, encoding, content_type, bucket } = {
      acl: "public-read",
      encoding: "base64",
      content_type: "image/jpeg",
      bucket: "website",
    },
  ) {
    const { data: resp } = await this.get_url_upload(acl, encoding, content_type, key, bucket);
    const url = resp.value.value?.url;
    const direct_url = resp.value.value?.direct_url;
    if (!url || !direct_url) throw Error("presigned error");
    let buf;
    switch (encoding) {
      case "base64":
        // buf = Buffer.from(data.replace(/^data:image\/\w+;base64,/, ""), "base64")
        buf = _base64ToArrayBuffer(data.replace(/^data:image\/\w+;base64,/, ""));
        break;
      case "blob":
        buf = data;
        break;
      default:
        throw new Error("Invalid encoding");
    }
    await useFetch(url, {
      method: "PUT",
      headers: {
        Authorization: "",
        "x-amz-acl": acl || "public-read",
        "Content-Encoding": encoding,
        "Content-Type": content_type,
        "Access-Control-Allow-Origin": "*",
      },
      body: buf,
    });
    return direct_url;
  }
}
class User {
  constructor() {
    this.request = new Request();
  }
  async login(data) {
    return await this.request.post(ENDPOINTS.Login, data);
  }
  async list(data) { 
    return await this.request.get(ENDPOINTS.USER_LIST, data);
  }
  async get(data) {
    return await this.request.get(ENDPOINTS.USER, data);
  }
  async create(data) {
    return await this.request.post(ENDPOINTS.USER, data);
  }
  async update(data) {
    return await this.request.put(ENDPOINTS.USER, data);
  }
  async delete(data) {
    return await this.request.delete(ENDPOINTS.USER, data);
  }
  async change_pasword(data) {
    return await this.request.post(ENDPOINTS.CHANGE_PASSWORD, data);
  }
  async reset_password(data) {
    return await this.request.post(ENDPOINTS.RESET_PASSWORD, data);
  }
}
class Service {
  constructor() {
    this.request = new Request();
  }
  async list(data) {
    return await this.request.get(ENDPOINTS.SERVICE_LIST, data);
  }
  async get(data) {
    return await this.request.get(ENDPOINTS.SERVICE, data);
  }
  async create(data) {
    return await this.request.post(ENDPOINTS.SERVICE, data);
  }
  async update(data) {
    return await this.request.put(ENDPOINTS.SERVICE, data);
  }
  async delete(data) {
    return await this.request.delete(ENDPOINTS.SERVICE, data);
  }
}
class Product {
  constructor() {
    this.request = new Request();
  }
  async list(data) {
    return await this.request.get(ENDPOINTS.PRODUCT_LIST, data);
  }
  async get(data) {
    return await this.request.get(ENDPOINTS.PRODUCT, data);
  }
  async create(data) {
    return await this.request.post(ENDPOINTS.PRODUCT, data);
  }
  async update(data) {
    return await this.request.put(ENDPOINTS.PRODUCT, data);
  }
  async delete(data) {
    return await this.request.delete(ENDPOINTS.PRODUCT, data);
  }
}
class Info {
  constructor() {
    this.request = new Request();
  }
  async get(data) {
    return await this.request.get(ENDPOINTS.INFO, data);
  }
  async update(data) {
    return await this.request.put(ENDPOINTS.INFO, data);
  }
}
class Intro {
  constructor() {
    this.request = new Request();
  }
  async list(data) {
    return await this.request.get(ENDPOINTS.INTRO_LIST, data);
  }
  async get(data) {
    return await this.request.get(ENDPOINTS.INTRO, data);
  }
  async create(data) {
    return await this.request.post(ENDPOINTS.INTRO, data);
  }
  async update(data) {
    return await this.request.put(ENDPOINTS.INTRO, data);
  }
  async delete(data) {
    return await this.request.delete(ENDPOINTS.INTRO, data);
  }
}
class Menu {
  constructor() {
    this.request = new Request();
  }
  async list(data) {
    return await this.request.get(ENDPOINTS.MENU_LIST, data);
  }
  async get(data) {
    return await this.request.get(ENDPOINTS.MENU, data);
  }
  async create(data) {
    return await this.request.post(ENDPOINTS.MENU, data);
  }
  async update(data) {
    return await this.request.put(ENDPOINTS.MENU, data);
  }
  async delete(data) {
    return await this.request.delete(ENDPOINTS.MENU, data);
  }
}
class Permission {
  constructor() {
    this.request = new Request();
  }
  async list_group(data) {
    return await this.request.get(ENDPOINTS.PERMISSION_GROUP, data);
  }
  async get(data) {
    return await this.request.get(ENDPOINTS.PERMISSION, data);
  }
  async create(data) {
    return await this.request.post(ENDPOINTS.PERMISSION, data);
  }
  async update(data) {
    return await this.request.put(ENDPOINTS.PERMISSION, data);
  }
  async delete(data) {
    return await this.request.delete(ENDPOINTS.PERMISSION, data);
  }
}
class Staff{
  constructor() {
    this.request = new Request();
  }
  async list(data) {
    return await this.request.get(ENDPOINTS.STAFF_LIST, data);
  }
  async get(data) {
    return await this.request.get(ENDPOINTS.STAFF, data);
  }
  async create(data) {
    return await this.request.post(ENDPOINTS.STAFF, data);
  }
  async update(data) {
    return await this.request.put(ENDPOINTS.STAFF, data);
  }
  async delete(data) {
    return await this.request.delete(ENDPOINTS.STAFF, data);
  }
  async get_position(data) {
    return await this.request.get(ENDPOINTS.POSITION, data);
  }
}
class Menu_backend {
  constructor() {
    this.request = new Request();
  }
  async list_all(data) {
    return await this.request.get(ENDPOINTS.GET_ALL_MENU, data);
  }
  async list_full_detail(data) {
    return await this.request.post(ENDPOINTS.GET_DETAIL_FULL_MENU, data);
  }
  async create(data) {
    return await this.request.post(ENDPOINTS.MENU_BACKEND, data);
  }
  async update(data) {
    return await this.request.put(ENDPOINTS.MENU_BACKEND, data);
  }
  async delete(data) {
    return await this.request.delete(ENDPOINTS.MENU_BACKEND, data);
  }
}
export default () => {
  return { RestApi: new RestApi() };
};
