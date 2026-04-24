import { http, HttpResponse } from "msw";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export const handlers = [
  http.get(`${API_BASE}/api/health`, () =>
    HttpResponse.json({ status: true, data: { ok: true } }),
  ),
];
