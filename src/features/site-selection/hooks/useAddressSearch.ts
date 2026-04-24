"use client";

import { useCallback, useState } from "react";
import type { KakaoAddressSearchResult, KakaoGeocoder } from "@/features/site-selection/types/kakao.types";

export type AddressSearchHit = {
  address: string;
  roadAddress: string | null;
  latitude: number;
  longitude: number;
};

const runSearch = (query: string): Promise<AddressSearchHit[]> =>
  new Promise((resolve, reject) => {
    const kakao = typeof window !== "undefined" ? window.kakao : undefined;
    if (!kakao?.maps?.services) {
      reject(new Error("카카오 SDK services 라이브러리가 아직 로드되지 않았어요."));
      return;
    }

    const geocoder: KakaoGeocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(query, (results: KakaoAddressSearchResult[], status) => {
      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        resolve([]);
        return;
      }
      if (status !== kakao.maps.services.Status.OK) {
        reject(new Error("주소 검색에 실패했어요."));
        return;
      }
      const hits: AddressSearchHit[] = results.map((r) => ({
        address: r.address_name,
        roadAddress: r.road_address?.address_name ?? null,
        latitude: Number.parseFloat(r.y),
        longitude: Number.parseFloat(r.x),
      }));
      resolve(hits);
    });
  });

type SearchState = {
  isLoading: boolean;
  error: Error | null;
  results: AddressSearchHit[];
  lastQuery: string | null;
};

const INITIAL_STATE: SearchState = {
  isLoading: false,
  error: null,
  results: [],
  lastQuery: null,
};

export const useAddressSearch = () => {
  const [state, setState] = useState<SearchState>(INITIAL_STATE);

  const search = useCallback(async (query: string): Promise<AddressSearchHit[]> => {
    const trimmed = query.trim();
    if (!trimmed) {
      setState(INITIAL_STATE);
      return [];
    }
    setState({ isLoading: true, error: null, results: [], lastQuery: trimmed });
    try {
      const results = await runSearch(trimmed);
      setState({ isLoading: false, error: null, results, lastQuery: trimmed });
      return results;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("주소 검색 실패");
      setState({ isLoading: false, error, results: [], lastQuery: trimmed });
      throw error;
    }
  }, []);

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return { ...state, search, reset };
};
