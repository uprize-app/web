"use client";

import { useEffect, useState } from "react";

import { loadKakaoMaps } from "../lib/kakaoScript";
import type { KakaoMaps } from "../types/kakao.types";

type LoaderState =
  | { status: "loading"; maps: null; error: null }
  | { status: "ready";   maps: KakaoMaps; error: null }
  | { status: "error";   maps: null; error: Error };

export const useKakaoMapLoader = (): LoaderState => {
  const [state, setState] = useState<LoaderState>({
    status: "loading",
    maps: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    loadKakaoMaps()
      .then((maps) => {
        if (cancelled) return;
        setState({ status: "ready", maps, error: null });
      })
      .catch((error: Error) => {
        if (cancelled) return;
        setState({ status: "error", maps: null, error });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};
