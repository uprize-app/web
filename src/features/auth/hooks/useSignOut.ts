"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { getSupabaseBrowser } from "@/shared/lib/supabase/client";

import { signedOutHref } from "../lib/authNavigation";

type UseSignOutState = {
  pending: boolean;
  errorMessage: string | null;
  signOut: () => Promise<void>;
};

export const useSignOut = (): UseSignOutState => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signOut = async () => {
    setPending(true);
    setErrorMessage(null);

    const { error } = await getSupabaseBrowser().auth.signOut({
      scope: "local",
    });

    if (error) {
      setErrorMessage(error.message);
      setPending(false);
      return;
    }

    queryClient.clear();
    router.push(signedOutHref());
    router.refresh();
  };

  return { pending, errorMessage, signOut };
};
