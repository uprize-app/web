"use client";

import { useEffect } from "react";
import { PlaceholderCard } from "@/shared/components/PlaceholderCard";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[app error]", error);
  }, [error]);

  return (
    <PlaceholderCard
      tag="문제가 발생했어요"
      title="페이지를 불러오지 못했습니다."
      action={
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition hover:bg-ink-2"
        >
          다시 시도 <span aria-hidden="true">↗</span>
        </button>
      }
    >
      <p>{error.message || "알 수 없는 오류"}</p>
    </PlaceholderCard>
  );
};

export default ErrorPage;
