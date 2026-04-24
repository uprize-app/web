import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/shared/lib/env";

let browserClient: SupabaseClient | null = null;

export const getSupabaseBrowserClient = (): SupabaseClient => {
  if (browserClient) return browserClient;
  browserClient = createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return browserClient;
};
