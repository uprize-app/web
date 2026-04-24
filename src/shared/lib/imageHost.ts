import { env } from "@/shared/lib/env";

const STATIC_ALLOWED_HOSTS = new Set([
  "fal.media",
  "v3.fal.media",
  "cdn.fal.ai",
  "t1.daumcdn.net",
  "map.daumcdn.net",
  "dapi.kakao.com",
]);

const supabaseHost = (() => {
  try {
    return new URL(env.NEXT_PUBLIC_SUPABASE_URL).hostname;
  } catch {
    return null;
  }
})();

export const isAllowedImageUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    if (STATIC_ALLOWED_HOSTS.has(hostname)) return true;
    return hostname === supabaseHost;
  } catch {
    return false;
  }
};
