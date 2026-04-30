"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export const getSupabaseBrowser = (): SupabaseClient => {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Supabase 환경변수가 누락됐습니다.");
  }
  cached = createBrowserClient(url, anon);
  return cached;
};
