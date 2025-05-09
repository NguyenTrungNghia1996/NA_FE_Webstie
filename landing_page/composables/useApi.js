let ENDPOINTS = {
  MENU: "/api/frontend/Menu/Getlistmenu",
  GET_ABOUT: "/api/frontend/Gioithieu/Getlist_Thongtingioithieu",
  GET_INFO: "/api/frontend/Thontincongty/info",
  SEND_CONTACT: "/api/frontend/Lienhe/Send_Thongtinlienhe",
  TYPICAL_CUSTOMERS:"/api/frontend/Khachhangtieubieu/Getlist_Khachhangtieubieu",
  //service
  GET_SERVICE: "/api/frontend/Dichvu/Getlist_Dichvu",
  GET_DETAIL_SERVICE: "/api/frontend/Dichvu/Getdetail_Dichvu",
  GET_OUTSTANDING_SERVICE: "/api/frontend/Dichvu/Getlist_Dichvu_Noibat",
  //proudct
  GET_PROUDCT: "/api/frontend/Sanpham/Getlist_Sanpham",
  GET_DETAIL_PROUDCT: "/api/frontend/Sanpham/Getdetail_Sanpham",
  GET_OUTSTANDING_PROUDCT: "/api/frontend/Sanpham/Getlist_Sanpham_Noibat",

  BANNER:"/api/frontend/SlideBanner/Getlist",
};
class Request {
  constructor() {
    this.handler = {
      onRequest({ request, options }) {
        // Set the request headers
        // options.headers = options.headers || {}
        // options.headers.authorization = "..."
      },
      onRequestError({ request, options, error }) {
        // console.log(
        //   "🚀 ~ file: useApi.js:72 ~ Request ~ onResponseError ~ error:",
        //   request,
        //   options,
        //   error
        // );
        // const userStore = useUserStore()
        // userStore.logout()
      },
      onResponse({ request, response, options }) {
        // console.log(response._data.code, process.client)
        // if (!response._data.status) {
        // throw createError({ statusCode:response._data.code ,message:response._data.message, fatal: true })
        // console.log("resAPI", response._data)
        //   userStore.logout();
        //   await navigateTo("/");
        // const userStore = useUserStore();
        // userStore.logout();
        //   createError({ statusCode: response._data.code, message: response._data.message, fatal: true });
        // }
        return response._data;
      },
      onResponseError({ request, response, options }) {
        // console.log("onResponseError request:", request);
        // console.log("onResponseError response:", response);
        // console.log("onResponseError options:",options);
        // console.log(
        //   "🚀 ~ file: useApi.js:72 ~ Request ~ onResponseError ~ error:",
        //   request,
        //   response,x
        //   options
        // );

        return response._data;
      },
    };
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
    this.requester = new Request();
    this.view = new View(this.requester);
    this.product = new Product(this.requester);
  }
}
class View {
  constructor(requester) {
    this.requester = requester;
  }
  async menu(data) {
    return this.requester.get(ENDPOINTS.MENU, data);
  }
  async about(data) {
    return this.requester.get(ENDPOINTS.GET_ABOUT, data);
  }
  async info(data){
    return this.requester.get(ENDPOINTS.GET_INFO, data);
  }
  async send_contact(data) {
    return this.requester.post(ENDPOINTS.SEND_CONTACT, data);
  }
  async typical_customers(data) {
    return this.requester.get(ENDPOINTS.TYPICAL_CUSTOMERS,data)
  }
  async banner(data) {
    return this.requester.get(ENDPOINTS.BANNER,data)
  }
}
class Product {
  constructor(requester) {
    this.requester = requester;
  }
  //proudct
  async get_proudct(data) {
    return this.requester.get(ENDPOINTS.GET_PROUDCT, data);
  }
  async get_detail_proudct(data) {
    return this.requester.get(ENDPOINTS.GET_DETAIL_PROUDCT, data);
  }
  async get_outstanding_proudct(data) {
    return this.requester.get(ENDPOINTS.GET_OUTSTANDING_PROUDCT, data);
  }
  //service
  async get_service(data) {
    return this.requester.get(ENDPOINTS.GET_SERVICE, data);
  }
  async get_detail_service(data) {
    return this.requester.get(ENDPOINTS.GET_DETAIL_SERVICE, data);
  }
  async get_outstanding_service(data) {
    return this.requester.get(ENDPOINTS.GET_OUTSTANDING_SERVICE, data);
  }
}

export default () => {
  return { RestApi: new RestApi() };
};
