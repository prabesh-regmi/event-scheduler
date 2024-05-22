import axios from "axios";
import {
  getAccessTokens,
  getRefreshTokens,
  setAccessTokens,
  setRefreshTokens,
} from "../utils/getTokens";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
const getParsedUrl = (url, params) => {
  if (!params) {
    return url;
  }
  let urlString = "";
  Object.keys(params).forEach((key, index, array) => {
    if (params[key] !== undefined && params[key] !== null) {
      urlString += `${index === 0 ? "?" : ""}${key}=${params[key]}${
        index !== array.length - 1 ? "&" : ""
      }`;
    }
  });

  return url + urlString;
};

// axios interceptors for adding authorization in axios instance
instance.interceptors.request.use(
  (config) => {
    const token = getAccessTokens();
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const token = getRefreshTokens();
    if (
      error.response?.data?.code === 401 &&
      error.response?.data?.message === "JWT expired"
    ) {
      const { data } = await instance.post("/auth/refresh-tokens", {
        refreshToken: token,
      });
      const { accessToken, refreshToken } = data;
      setAccessTokens(accessToken);
      setRefreshTokens(refreshToken);
      return instance.request(error.config);
    }
    throw error;
  }
);

// Add other HTTP methods as needed
export const Api = {
  get: (url, params, headers) => instance.get(url, params, headers),
  post: (url, params, headers) => instance.post(url, params, headers),
  put: (url, params, headers) => instance.put(url, params, headers),
  patch: (url, params, headers) => instance.patch(url, params, headers),
  delete: (url, params, headers) =>
    instance.delete(getParsedUrl(url, params, headers)),
  head: (url, params, headers) =>
    instance.head(getParsedUrl(url, params, headers)),
  options: (url, params, headers) =>
    instance.options(getParsedUrl(url, params, headers)),
};
export const buildQueryParams = (params = {}) =>
  Object.keys(params)
    .map((key) =>
      encodeURIComponent(params[key])
        ? `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        : ""
    )
    .join("&");
