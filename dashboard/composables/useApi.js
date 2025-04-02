let ENDPOINTS = {
  Test:"/test"
};
class Request {
  constructor() {
    this.handler = {
      onRequest({ request, options }) {
      },
      onRequestError({ request, options, error }) {
      },
      onResponse({ request, response, options }) {
        return response._data;
      },
      onResponseError({ request, response, options }) {
        return response._data;
      },
    };
    if (process.client) {
      const userStore = useUserStore();
      this.TOKEN = `Bearer ${userStore.user.token}`;
    } else {
      const token = useCookie("TOKEN");
      this.TOKEN = `Bearer ${token.value}`;
    }
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
    this.test = new Test(this.request);
  }
}
class Test {
  constructor() {
    this.request = new Request();
  }
  async get(data) {
    return await this.request.get(ENDPOINTS.Test, data);
  }
}
export default () => {
  return { RestApi: new RestApi() };
};