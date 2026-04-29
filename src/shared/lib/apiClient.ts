import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

/**
 * 백엔드 응답 envelope.
 * 모든 응답이 `{ status: true, data: T }` 또는 `{ status: false, message: string }`.
 */
type Envelope<T> = { status: true; data: T } | { status: false; message: string };

/**
 * 정규화된 API 에러.
 * UI 는 instanceof ApiError 로 분기.
 */
export class ApiError extends Error {
  readonly httpStatus?: number;
  constructor(message: string, httpStatus?: number) {
    super(message);
    this.name = "ApiError";
    this.httpStatus = httpStatus;
  }
}

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

/** 요청 인터셉터 — dev 환경에서는 X-Dev-User-Id, prod 는 추후 Supabase JWT 주입 */
instance.interceptors.request.use((config) => {
  const devUserId = process.env.NEXT_PUBLIC_DEV_USER_ID;
  if (devUserId) {
    config.headers.set("X-Dev-User-Id", devUserId);
  }
  // TODO: Supabase 세션 토큰 주입
  // const token = supabase.auth.getSession()?.data?.session?.access_token
  // if (token) config.headers.set("Authorization", `Bearer ${token}`)
  return config;
});

const unwrap = <T,>(env: Envelope<T>, httpStatus: number): T => {
  if (env.status === true) return env.data;
  throw new ApiError(env.message, httpStatus);
};

const normalize = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;
  if (error instanceof AxiosError) {
    const data = error.response?.data as Envelope<unknown> | undefined;
    const httpStatus = error.response?.status;
    if (data && data.status === false) {
      return new ApiError(data.message, httpStatus);
    }
    if (error.code === "ECONNABORTED") {
      return new ApiError("요청 시간이 초과됐습니다.", httpStatus);
    }
    if (!error.response) {
      return new ApiError("백엔드에 연결할 수 없습니다.", undefined);
    }
    return new ApiError(error.message, httpStatus);
  }
  if (error instanceof Error) return new ApiError(error.message);
  return new ApiError("알 수 없는 오류");
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
