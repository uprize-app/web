"use client";

import { useEffect, useRef } from "react";

import { useKakaoMapLoader } from "../hooks/useKakaoMapLoader";
import type { KakaoMap, KakaoMarker } from "../types/kakao.types";

type Props = {
  /** 지도 중심 + 핀 위치 (없으면 역삼동 기본값으로 fallback) */
  center: { lat: number; lng: number } | undefined | null;
  /** 사용자가 지도를 클릭했을 때 (좌표만 전달, 부모에서 reverseGeocode) */
  onPickCoords: (lat: number, lng: number) => void;
  level?: number;
  className?: string;
};

/** persist 마이그레이션 누락이나 호출자 실수 대비 fallback */
const FALLBACK_CENTER = { lat: 37.500613, lng: 127.036597 };

export const KakaoMapView = ({
  center,
  onPickCoords,
  level = 4,
  className,
}: Props) => {
  const safeCenter = center ?? FALLBACK_CENTER;
  const lat = safeCenter.lat;
  const lng = safeCenter.lng;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<KakaoMap | null>(null);
  const markerRef = useRef<KakaoMarker | null>(null);

  const loader = useKakaoMapLoader();

  // 지도 1회 초기화 (loader.ready 시점)
  useEffect(() => {
    if (loader.status !== "ready") return;
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const { maps } = loader;
    const center0 = new maps.LatLng(lat, lng);

    const map = new maps.Map(container, { center: center0, level });
    const marker = new maps.Marker({ position: center0, map });

    mapRef.current = map;
    markerRef.current = marker;

    maps.event.addListener(map, "click", (event) => {
      const nextLat = event.latLng.getLat();
      const nextLng = event.latLng.getLng();
      const next = new maps.LatLng(nextLat, nextLng);
      marker.setPosition(next);
      map.panTo(next);
      onPickCoords(nextLat, nextLng);
    });
    // dependencies intentionally empty — only init once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loader.status]);

  // center prop 변경 시 지도/마커 동기화 (외부에서 검색 결과로 이동할 때)
  useEffect(() => {
    if (loader.status !== "ready" || !mapRef.current || !markerRef.current) return;
    const next = new loader.maps.LatLng(lat, lng);
    mapRef.current.panTo(next);
    markerRef.current.setPosition(next);
  }, [loader, lat, lng]);

  return (
    <div className={className}>
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />

      {loader.status === "loading" ? (
        <div className="absolute inset-0 grid place-items-center bg-paper-2 font-mono text-[11px] tracking-[0.12em] text-ink-50">
          MAP LOADING…
        </div>
      ) : null}
      {loader.status === "error" ? (
        <div className="absolute inset-0 grid place-items-center bg-paper-2 px-4 text-center text-[13px] text-ink-50">
          지도를 불러오지 못했습니다.
          <br />
          <span className="font-mono text-[11px]">{loader.error.message}</span>
        </div>
      ) : null}
    </div>
  );
};
