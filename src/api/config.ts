import axios, { type AxiosError } from "axios";
import storage from "@/utils/storage.util";
import { env } from "@/utils/env.util";

const baseURL = env.apiUrl || "";

/**
 * Axios instance for public API requests (no auth required).
 */
export const axiosPublic = axios.create({
  baseURL,
  headers: storage.getConfig().headers,
});

/**
 * Axios instance for private API requests (auth required).
 * Adds Bearer token via interceptor and handles 401/403.
 */
export const axiosPrivate = axios.create({
  baseURL,
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const bearerConfig = storage.getConfigWithBearer();
    Object.entries(bearerConfig.headers).forEach(([key, value]) => {
      config.headers.set(key, value);
    });
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject({
        error: true,
        data: null,
        message: "Network error. Please check your connection.",
        errors: [error.message],
      });
    }

    const { status, data } = error.response;

    if (status === 401 || status === 403) {
      storage.clearAuth();
      window.location.href = "/";
      return Promise.reject({
        error: true,
        data: null,
        message: "Session expired. Please login again.",
        errors: ["Session expired"],
      });
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        error: true,
        data: null,
        message: "Request timeout. Please try again.",
        errors: [error.message],
      });
    }

    const payload = data as Record<string, unknown>;
    return Promise.reject({
      error: true,
      data: payload ?? null,
      message: (payload?.message as string) || "An error occurred",
      errors: (payload?.errors as unknown[]) || ["An error occurred"],
    });
  }
);
