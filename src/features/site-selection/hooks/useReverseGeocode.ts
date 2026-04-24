"use client";

import { useCallback, useState } from "react";
import type { KakaoGeocoder } from "@/features/site-selection/types/kakao.types";

export type ReverseGeocodeResult = {
  address: string | null;
  roadAddress: string | null;
};

const geocodeOnce = (lat: number, lng: number): Promise<ReverseGeocodeResult> =>
  new Promise((resolve, reject) => {
    const kakao = typeof window !== "undefined" ? window.kakao : undefined;
    if (!kakao?.maps?.services) {
      reject(new Error("카카오 SDK services 라이브러리가 아직 로드되지 않았어요."));
      return;
    }

    const geocoder: KakaoGeocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status !== kakao.maps.services.Status.OK || !result?.length) {
        resolve({ address: null, roadAddress: null });
        return;
      }
      const [first] = result;
      resolve({
        address: first.address?.address_name ?? null,
        roadAddress: first.road_address?.address_name ?? null,
      });
    });
  });

type ReverseGeocodeState = {
  isLoading: boolean;
  error: Error | null;
  data: ReverseGeocodeResult | null;
};

export const useReverseGeocode = () => {
  const [state, setState] = useState<ReverseGeocodeState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const resolve = useCallback(async (lat: number, lng: number): Promise<ReverseGeocodeResult> => {
    setState({ isLoading: true, error: null, data: null });
    try {
      const data = await geocodeOnce(lat, lng);
      setState({ isLoading: false, error: null, data });
      return data;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("역지오코딩 실패");
      setState({ isLoading: false, error, data: null });
      throw error;
    }
  }, []);

  return { ...state, resolve };
};
