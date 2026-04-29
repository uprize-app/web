"use client";

import { loadKakaoMaps } from "../lib/kakaoScript";
import type { KakaoCoord2AddressResult } from "../types/kakao.types";

export type GeocodedAddress = {
  jibun: string; // "역삼동 123-4"
  fullAddress: string; // "서울 강남구 역삼동 123-4"
  roadAddress: string | null;
  region1: string;
  region2: string;
  region3: string;
};

const toJibun = (a: KakaoCoord2AddressResult["address"]): string => {
  const num = a.sub_address_no
    ? `${a.main_address_no}-${a.sub_address_no}`
    : a.main_address_no;
  return `${a.region_3depth_name} ${num}`.trim();
};

/**
 * 좌표 → 주소 (1회성 함수, 훅 아님).
 * 카카오 services.Geocoder.coord2Address 래핑.
 */
export const reverseGeocode = async (
  lat: number,
  lng: number,
): Promise<GeocodedAddress | null> => {
  const maps = await loadKakaoMaps();
  return new Promise((resolve, reject) => {
    const geocoder = new maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === maps.services.Status.OK && result.length > 0) {
        const first = result[0]!;
        resolve({
          jibun: toJibun(first.address),
          fullAddress: first.address.address_name,
          roadAddress: first.road_address?.address_name ?? null,
          region1: first.address.region_1depth_name,
          region2: first.address.region_2depth_name,
          region3: first.address.region_3depth_name,
        });
      } else if (status === maps.services.Status.ZERO_RESULT) {
        resolve(null);
      } else {
        reject(new Error("역지오코딩 실패"));
      }
    });
  });
};
