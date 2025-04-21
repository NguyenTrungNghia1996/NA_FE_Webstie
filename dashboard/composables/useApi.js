let ENDPOINTS = {
  Login: "/api/backend/Authen/login",
  S3: "/api/backend/Upload/presigned-url",
  // S3: "/presigned-url",
  //service
  SERVICE_LIST: "/api/backend/Dichvu/Dichvu_Getlist_Paging",
  SERVICE: "/api/backend/Dichvu/Dichvu",
  //intro
  INTRO_LIST: "/api/backend/Gioithieu/Gioithieu_Getlist_Paging",
  INTRO: "/api/backend/Gioithieu/gioithieu",
  //product
  PRODUCT_LIST: "/api/backend/Sanpham/Sanpham_Getlist_Paging",
  PRODUCT: "/api/backend/Sanpham/Sanpham",
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
    this.product = new Product(this.request)
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
        "Access-Control-Allow-Origin": "*"
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
export default () => {
  return { RestApi: new RestApi() };
};
