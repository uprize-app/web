export type ApiSuccess<T> = {
  status: true;
  data: T;
};

export type ApiFailure = {
  status: false;
  message: string;
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

export type ApiErrorShape = {
  message: string;
  statusCode: number;
  cause?: unknown;
};
