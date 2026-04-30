"use client";

import { useEffect, useState } from "react";

import type { Session } from "@supabase/supabase-js";

import { getSupabaseBrowser } from "@/shared/lib/supabase/client";

type SessionState = {
  session: Session | null;
  loading: boolean;
};

export const useSession = (): SessionState => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!mounted) return;
      setSession(next);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
};
