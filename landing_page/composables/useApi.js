let ENDPOINTS = {
  MENU: "/api/frontend/Menu/Getlistmenu",
  GET_DETAIL: "/api/frontend/Sanpham/Getdetail_Sanpham",
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
        console.log("onRequestError request:", request);
        console.log("onRequestError error:", error);
        console.log("onRequestError options:",options);
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
}
class Product {
  constructor(requester) {
    this.requester = requester;
  }
  async get_detail(data) {
    return this.requester.get(ENDPOINTS.GET_DETAIL, data);
  }
}

export default () => {
  return { RestApi: new RestApi() };
};
