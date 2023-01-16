import axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "../constants";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = JSON.parse(localStorage.getItem("token") as string) ?? "";

    config.timeoutErrorMessage =
      "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại";
    config.headers = {
      Authorization: `Bearer ${token}`
    };
    return config;
  },

  async (exception) => {
    return await Promise.reject(exception);
  }
);

export default instance;
