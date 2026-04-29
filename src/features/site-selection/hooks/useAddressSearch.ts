"use client";

import { useEffect, useState } from "react";

import { loadKakaoMaps } from "../lib/kakaoScript";
import type { KakaoPlace } from "../types/kakao.types";

const DEBOUNCE_MS = 250;
const MAX_RESULTS = 8;

type State =
  | { status: "idle";    results: []; error: null }
  | { status: "loading"; results: KakaoPlace[]; error: null }
  | { status: "ready";   results: KakaoPlace[]; error: null }
  | { status: "error";   results: []; error: Error };

const idle: State = { status: "idle", results: [], error: null };

/**
 * 주소/장소 키워드 검색 (카카오 Places).
 * - 빈 query → idle
 * - debounce 250ms
 * - 최대 8건
 */
export const useAddressSearch = (query: string): State => {
  const [state, setState] = useState<State>(idle);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setState(idle);
      return;
    }

    let cancelled = false;
    setState((prev) => ({
      status: "loading",
      results: prev.status === "ready" ? prev.results : [],
      error: null,
    }));

    const timer = window.setTimeout(async () => {
      try {
        const maps = await loadKakaoMaps();
        if (cancelled) return;
        const places = new maps.services.Places();
        places.keywordSearch(
          trimmed,
          (data, status) => {
            if (cancelled) return;
            if (status === maps.services.Status.OK) {
              setState({
                status: "ready",
                results: data.slice(0, MAX_RESULTS),
                error: null,
              });
            } else if (status === maps.services.Status.ZERO_RESULT) {
              setState({ status: "ready", results: [], error: null });
            } else {
              setState({
                status: "error",
                results: [],
                error: new Error("주소 검색 실패"),
              });
            }
          },
          { size: MAX_RESULTS },
        );
      } catch (e) {
        if (cancelled) return;
        setState({
          status: "error",
          results: [],
          error: e instanceof Error ? e : new Error("Unknown"),
        });
      }
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  return state;
};
