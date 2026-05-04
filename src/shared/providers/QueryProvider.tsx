"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { getSupabaseBrowser } from "@/shared/lib/supabase/client";
import { isUnauthorizedApiError } from "@/shared/lib/apiClient";

type Props = {
  children: ReactNode;
};

const AUTH_REJECTED_EVENT = "uprize:auth-rejected";

const emitAuthRejected = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_REJECTED_EVENT));
};

export const QueryProvider = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const authRejectedRef = useRef(false);
  const [authIssueOpen, setAuthIssueOpen] = useState(false);

  const [client] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (isUnauthorizedApiError(error)) emitAuthRejected();
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (isUnauthorizedApiError(error)) emitAuthRejected();
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: (failureCount, error) =>
              !isUnauthorizedApiError(error) && failureCount < 1,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  useEffect(() => {
    const handleAuthRejected = () => {
      if (authRejectedRef.current) return;
      authRejectedRef.current = true;
      setAuthIssueOpen(true);

      try {
        void getSupabaseBrowser()
          .auth.signOut({ scope: "local" })
          .catch((error: unknown) => {
            console.warn("[auth] Supabase 로컬 세션 정리 실패", error);
          });
      } catch (error) {
        console.warn("[auth] Supabase 로컬 세션 정리 실패", error);
      }
    };

    window.addEventListener(AUTH_REJECTED_EVENT, handleAuthRejected);
    return () => {
      window.removeEventListener(AUTH_REJECTED_EVENT, handleAuthRejected);
    };
  }, []);

  const handleLoginAgain = () => {
    authRejectedRef.current = false;
    setAuthIssueOpen(false);
    const nextPath = pathname.startsWith("/login") ? "/projects" : pathname;
    router.push(`/login?next=${encodeURIComponent(nextPath)}`);
  };

  return (
    <QueryClientProvider client={client}>
      {children}
      {authIssueOpen ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/35 px-6 backdrop-blur-sm">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="auth-issue-title"
            className="w-full max-w-[420px] rounded-lg border border-line bg-paper p-7 shadow-lift"
          >
            <h2
              id="auth-issue-title"
              className="display-italic m-0 mb-3 text-2xl text-ink"
            >
              로그인이 완료되지 않았어요
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-ink-50">
              브라우저에는 로그인 정보가 남아 있지만 서버에서 인증을 거절했습니다.
              다시 로그인해 주세요.
            </p>
            <button
              type="button"
              onClick={handleLoginAgain}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-ink px-5 text-sm font-medium text-paper transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:bg-burn-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 active:translate-y-0"
            >
              다시 로그인
            </button>
          </div>
        </div>
      ) : null}
    </QueryClientProvider>
  );
};
