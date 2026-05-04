export type ApiError = Error & {
  readonly name: "ApiError";
  readonly httpStatus?: number;
};

export const createApiError = (
  message: string,
  httpStatus?: number,
): ApiError => {
  const error = new Error(message) as Error & {
    name: "ApiError";
    httpStatus?: number;
  };
  error.name = "ApiError";
  if (httpStatus !== undefined) error.httpStatus = httpStatus;
  return error;
};

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof Error && error.name === "ApiError";

export const isUnauthorizedApiError = (error: unknown) =>
  isApiError(error) && error.httpStatus === 401;
