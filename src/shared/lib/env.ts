import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().min(1).default("http://localhost:4000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1).default("https://placeholder.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default("placeholder-anon-key"),
  NEXT_PUBLIC_KAKAO_JS_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_USE_DEV_AUTH: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  NEXT_PUBLIC_DEV_USER_ID: z.string().min(1).optional(),
});

const rawEnv = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_KAKAO_JS_KEY: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
  NEXT_PUBLIC_USE_DEV_AUTH: process.env.NEXT_PUBLIC_USE_DEV_AUTH,
  NEXT_PUBLIC_DEV_USER_ID: process.env.NEXT_PUBLIC_DEV_USER_ID,
};

const parsed = envSchema.safeParse(rawEnv);

const REQUIRED_KEYS = [
  "NEXT_PUBLIC_API_BASE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

const missing = REQUIRED_KEYS.filter((key) => !rawEnv[key]);

if (missing.length > 0) {
  // 빌드 단계에서 누락이어도 default 값으로 통과시킴.
  // 런타임에 실제 값이 inline 되지 않으면 placeholder URL 로 동작하므로
  // 운영 배포 전에 반드시 Vercel 프로젝트 환경변수에 등록할 것.
  // eslint-disable-next-line no-console
  console.warn(
    `⚠️  환경변수 누락: ${missing.join(", ")} — Vercel 프로젝트 → Settings → Environment Variables 에 등록 필요`,
  );
}

if (!parsed.success) {
  // schema 자체가 깨진 경우(잘못된 enum 값 등)는 여전히 명확하게 알림.
  // eslint-disable-next-line no-console
  console.error("❌ 환경변수 형식 오류:", parsed.error.flatten().fieldErrors);
  throw new Error("환경변수 형식 오류 — .env.local 또는 Vercel 환경변수 확인");
}

export const env = parsed.data;
