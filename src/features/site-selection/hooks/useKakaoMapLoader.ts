"use client";

import { useEffect, useState } from "react";
import { loadKakaoMapsSdk } from "@/features/site-selection/lib/kakaoScript";

type LoaderState = {
  ready: boolean;
  error: Error | null;
};

export const useKakaoMapLoader = (): LoaderState => {
  const [state, setState] = useState<LoaderState>({ ready: false, error: null });

  useEffect(() => {
    let cancelled = false;
    loadKakaoMapsSdk()
      .then(() => {
        if (!cancelled) setState({ ready: true, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            ready: false,
            error: err instanceof Error ? err : new Error("카카오 SDK 로드 오류"),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};
