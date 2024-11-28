import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
 timeout: 15000,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    const e = error.response.data;
    const dataErrors = e.errors?.errors?.message || e.errors?.message || e.errors;

    return Promise.reject(dataErrors);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let dataErrors = {};
    const e = error.response.data?.errors || error.response.data?.message ;

    if (typeof e === 'object') {
      Object.keys(e).forEach((key: string) => {
        dataErrors = {
          ...dataErrors,
          [key]: e[key].shift()
        };
      });
    } else {
      dataErrors = {
        message: e
      }
    }

    return Promise.reject(dataErrors);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};