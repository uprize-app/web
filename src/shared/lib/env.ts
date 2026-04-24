import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_KAKAO_JS_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_USE_DEV_AUTH: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  NEXT_PUBLIC_DEV_USER_ID: z.string().uuid().optional(),
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

if (!parsed.success) {
  console.error("❌ 환경변수 검증 실패:", parsed.error.flatten().fieldErrors);
  throw new Error("환경변수 검증 실패 — .env.local 확인");
}

export const env = parsed.data;
