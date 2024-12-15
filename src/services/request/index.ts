import axios from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    common: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
});

request.interceptors.request.use(
  (config: any) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response: unknown) => {
    return response;
  },
  (error: unknown) => {
    throw error;
  }
);

export { request };
