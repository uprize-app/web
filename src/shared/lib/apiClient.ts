import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

import { getSupabaseBrowser } from "./supabase/client";
import {
  createApiError,
  isApiError,
  type ApiError,
} from "./apiError";

export {
  createApiError,
  isApiError,
  isUnauthorizedApiError,
  type ApiError,
} from "./apiError";

/**
 * 백엔드 응답 envelope.
 * 모든 응답이 `{ status: true, data: T }` 또는 `{ status: false, message: string }`.
 */
type Envelope<T> = { status: true; data: T } | { status: false; message: string };

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseURL) {
  // build-safe — 런타임에서만 throw
  console.warn("[apiClient] NEXT_PUBLIC_API_BASE_URL 미설정");
}

const instance: AxiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 30_000,
});

/**
 * 요청 인터셉터 — Supabase 세션이 있으면 항상 Bearer 를 우선 붙인다.
 * USE_DEV_AUTH=true 는 로컬 개발용 X-Dev-User-Id 를 추가로 붙이는 역할만 한다.
 */
instance.interceptors.request.use(async (config) => {
  const useDevAuth = process.env.NEXT_PUBLIC_USE_DEV_AUTH === "true";

  if (typeof window !== "undefined") {
    try {
      const { data } = await getSupabaseBrowser().auth.getSession();
      const token = data.session?.access_token;
      if (token) config.headers.set("Authorization", `Bearer ${token}`);
    } catch (e) {
      console.warn("[apiClient] Supabase 세션 읽기 실패", e);
    }
  }

  if (useDevAuth) {
    const devUserId = process.env.NEXT_PUBLIC_DEV_USER_ID;
    if (devUserId) config.headers.set("X-Dev-User-Id", devUserId);
  }

  return config;
});

const unwrap = <T,>(env: Envelope<T>, httpStatus: number): T => {
  if (env.status === true) return env.data;
  throw createApiError(env.message, httpStatus);
};

const normalize = (error: unknown): ApiError => {
  if (isApiError(error)) return error;
  if (error instanceof AxiosError) {
    const data = error.response?.data as Envelope<unknown> | undefined;
    const httpStatus = error.response?.status;
    if (data && data.status === false) {
      return createApiError(data.message, httpStatus);
    }
    if (error.code === "ECONNABORTED") {
      return createApiError("요청 시간이 초과됐습니다.", httpStatus);
    }
    if (!error.response) {
      return createApiError("백엔드에 연결할 수 없습니다.", undefined);
    }
    return createApiError(error.message, httpStatus);
  }
  if (error instanceof Error) return createApiError(error.message);
  return createApiError("알 수 없는 오류");
};

const request = async <T,>(
  fn: () => Promise<{ data: Envelope<T>; status: number }>,
): Promise<T> => {
  try {
    const res = await fn();
    return unwrap(res.data, res.status);
  } catch (e) {
    throw normalize(e);
  }
};

export const apiClient = {
  get: <T,>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    request<T>(() => instance.get<Envelope<T>>(url, config)),
  post: <T,>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    request<T>(() => instance.post<Envelope<T>>(url, body, config)),
  patch: <T,>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    request<T>(() => instance.patch<Envelope<T>>(url, body, config)),
  delete: <T,>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    request<T>(() => instance.delete<Envelope<T>>(url, config)),
};
