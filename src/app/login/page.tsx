"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getSupabaseBrowser } from "@/shared/lib/supabase/client";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/projects";
  const error = searchParams.get("error");
  const [loading, setLoading] = useState(false);

  const handleKakao = async () => {
    setLoading(true);
    const supabase = getSupabaseBrowser();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo },
    });
    if (signInError) {
      setLoading(false);
      console.error(signInError);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-line bg-paper p-10 text-center">
      <h1 className="display-italic mb-2 text-3xl text-ink">Uprize</h1>
      <p className="mb-8 text-sm text-ink-50">
        시작하려면 카카오 계정으로 로그인해주세요.
      </p>

      {error ? (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
          로그인에 실패했어요: {decodeURIComponent(error)}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleKakao}
        disabled={loading}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] text-sm font-medium text-[#191919] transition hover:brightness-95 disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
          <path
            fill="#191919"
            d="M9 1.5C4.86 1.5 1.5 4.13 1.5 7.39c0 2.06 1.36 3.87 3.42 4.94l-.74 2.7c-.07.25.21.45.42.31l3.24-2.16c.38.04.77.06 1.16.06 4.14 0 7.5-2.63 7.5-5.85S13.14 1.5 9 1.5z"
          />
        </svg>
        {loading ? "이동 중…" : "카카오로 시작하기"}
      </button>
    </div>
  );
};

const LoginPage = () => (
  <main className="mx-auto flex min-h-[calc(100dvh-72px)] max-w-md flex-col items-center justify-center px-6">
    <Suspense fallback={<div className="text-sm text-ink-50">불러오는 중…</div>}>
      <LoginForm />
    </Suspense>
  </main>
);

export default LoginPage;
