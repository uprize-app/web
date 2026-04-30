import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import type { SupabaseClient } from "@supabase/supabase-js";

export const getSupabaseServer = async (): Promise<SupabaseClient> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Supabase 환경변수가 누락됐습니다.");
  }
  const cookieStore = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // RSC 환경에서 set 불가 — 미들웨어가 갱신 담당
        }
      },
    },
  });
};
