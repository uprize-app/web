import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/shared/lib/env";
import { getSupabaseBrowserClient } from "@/shared/lib/supabaseClient";
import type { ApiEnvelope, ApiErrorShape } from "@/shared/types/api.types";

export class ApiError extends Error implements ApiErrorShape {
  statusCode: number;
  cause?: unknown;

  constructor(message: string, statusCode: number, cause?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.cause = cause;
  }
}

const injectAuthHeader = async (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};

  if (env.NEXT_PUBLIC_USE_DEV_AUTH) {
    if (env.NEXT_PUBLIC_DEV_USER_ID) {
      config.headers["X-Dev-User-Id"] = env.NEXT_PUBLIC_DEV_USER_ID;
    }
    return config;
  }

  if (typeof window !== "undefined") {
    const supabase = getSupabaseBrowserClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token) {
      config.headers["Authorization"] = `Bearer ${session.access_token}`;
    }
  }

  return config;
};

const unwrapEnvelope = <T,>(payload: unknown): T => {
  const envelope = payload as ApiEnvelope<T> | undefined;

  if (envelope && typeof envelope === "object" && "status" in envelope) {
    if (envelope.status === true) {
      return envelope.data;
    }
    throw new ApiError(envelope.message || "요청 처리에 실패했습니다", 500, envelope);
  }

  return payload as T;
};

const normalizeError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<ApiEnvelope<unknown>>;
    const status = axiosErr.response?.status ?? 0;
    const envelope = axiosErr.response?.data;
    const message =
      envelope && typeof envelope === "object" && "status" in envelope && envelope.status === false
        ? envelope.message
        : axiosErr.message;
    return new ApiError(message || "네트워크 오류가 발생했습니다", status, axiosErr);
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 0, error);
  }

  return new ApiError("알 수 없는 오류가 발생했습니다", 0, error);
};

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 30_000,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use(injectAuthHeader);

  client.interceptors.response.use(
    (response) => {
      response.data = unwrapEnvelope(response.data);
      return response;
    },
    (error: unknown) => Promise.reject(normalizeError(error)),
  );

  return client;
};

export const apiClient = createApiClient();

export const apiGet = async <T,>(url: string, params?: Record<string, unknown>): Promise<T> => {
  const response = await apiClient.get<T>(url, { params });
  return response.data;
};

export const apiPost = async <TResponse, TBody = unknown>(url: string, body?: TBody): Promise<TResponse> => {
  const response = await apiClient.post<TResponse>(url, body);
  return response.data;
};

export const apiPatch = async <TResponse, TBody = unknown>(url: string, body?: TBody): Promise<TResponse> => {
  const response = await apiClient.patch<TResponse>(url, body);
  return response.data;
};

export const apiDelete = async <T,>(url: string): Promise<T> => {
  const response = await apiClient.delete<T>(url);
  return response.data;
};
