"use client";

import { useEffect, useRef } from "react";
import { useKakaoMapLoader } from "@/features/site-selection/hooks/useKakaoMapLoader";
import type {
  KakaoLatLng,
  KakaoMap,
  KakaoMarker,
  KakaoMouseEvent,
} from "@/features/site-selection/types/kakao.types";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

type KakaoMapViewProps = {
  latitude: number | null;
  longitude: number | null;
  onPick: (lat: number, lng: number) => void;
  className?: string;
};

export const KakaoMapView = ({ latitude, longitude, onPick, className }: KakaoMapViewProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<KakaoMap | null>(null);
  const markerRef = useRef<KakaoMarker | null>(null);
  const { ready, error } = useKakaoMapLoader();
  const onPickRef = useRef(onPick);

  useEffect(() => {
    onPickRef.current = onPick;
  }, [onPick]);

  useEffect(() => {
    if (!ready || !containerRef.current) return;
    const kakao = window.kakao;
    if (!kakao?.maps) return;

    const initCenter = new kakao.maps.LatLng(
      latitude ?? DEFAULT_CENTER.lat,
      longitude ?? DEFAULT_CENTER.lng,
    );

    const map = new kakao.maps.Map(containerRef.current, { center: initCenter, level: 4 });
    mapRef.current = map;

    const marker = new kakao.maps.Marker({ position: initCenter });
    if (latitude !== null && longitude !== null) marker.setMap(map);
    markerRef.current = marker;

    const handleClick = (event: KakaoMouseEvent) => {
      const latlng: KakaoLatLng = event.latLng;
      marker.setPosition(latlng);
      marker.setMap(map);
      onPickRef.current(latlng.getLat(), latlng.getLng());
    };

    kakao.maps.event.addListener(map, "click", handleClick);

    return () => {
      kakao.maps.event.removeListener(map, "click", handleClick);
      marker.setMap(null);
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    if (!ready || !mapRef.current || !markerRef.current) return;
    const kakao = window.kakao;
    if (!kakao?.maps) return;
    if (latitude === null || longitude === null) {
      markerRef.current.setMap(null);
      return;
    }
    const latlng = new kakao.maps.LatLng(latitude, longitude);
    markerRef.current.setPosition(latlng);
    markerRef.current.setMap(mapRef.current);
    mapRef.current.setCenter(latlng);
  }, [ready, latitude, longitude]);

  if (error) {
    return (
      <div
        role="alert"
        className={`flex min-h-[360px] items-center justify-center rounded-2xl border border-red-500/40 bg-red-50 px-6 text-center text-sm text-red-700 ${className ?? ""}`}
      >
        지도를 불러오지 못했어요. ({error.message})
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-[360px] w-full overflow-hidden rounded-2xl border border-line bg-paper ${className ?? ""}`}
      aria-label="카카오맵 - 클릭하여 필지 선택"
      role="application"
    />
  );
};
