"use client";

import { useCallback } from "react";
import { AddressSearch } from "@/features/site-selection/components/AddressSearch";
import { KakaoMapView } from "@/features/site-selection/components/KakaoMapView";
import { useReverseGeocode } from "@/features/site-selection/hooks/useReverseGeocode";
import type { AddressSearchHit } from "@/features/site-selection/hooks/useAddressSearch";
import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";

export const MapStep = () => {
  const latitude = useProjectDraftStore((s) => s.latitude);
  const longitude = useProjectDraftStore((s) => s.longitude);
  const address = useProjectDraftStore((s) => s.address);
  const roadAddress = useProjectDraftStore((s) => s.roadAddress);
  const setLocation = useProjectDraftStore((s) => s.setLocation);
  const { isLoading: isGeocoding, error: geocodeError, resolve } = useReverseGeocode();

  const handleAddressSelect = useCallback(
    (hit: AddressSearchHit) => {
      setLocation({
        latitude: hit.latitude,
        longitude: hit.longitude,
        address: hit.address,
        roadAddress: hit.roadAddress,
      });
    },
    [setLocation],
  );

  const handleMapPick = useCallback(
    async (lat: number, lng: number) => {
      setLocation({ latitude: lat, longitude: lng });
      try {
        const result = await resolve(lat, lng);
        setLocation({
          latitude: lat,
          longitude: lng,
          address: result.address,
          roadAddress: result.roadAddress,
        });
      } catch {
        setLocation({ latitude: lat, longitude: lng, address: null, roadAddress: null });
      }
    },
    [resolve, setLocation],
  );

  const hasPicked = latitude !== null && longitude !== null;

  return (
    <div className="space-y-8">
      <AddressSearch onSelect={handleAddressSelect} />

      <div className="grid items-start gap-5 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <KakaoMapView
          latitude={latitude}
          longitude={longitude}
          onPick={handleMapPick}
          className="min-h-[440px] shadow-[0_18px_50px_-30px_rgba(21,20,15,0.4)]"
        />

        <aside className="min-w-0 rounded-[22px] border border-line bg-bg-2/40 p-6 text-sm shadow-[0_10px_30px_-22px_rgba(21,20,15,0.25)]">
          <header className="mb-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">Location</p>
            <h2 className="mt-1 font-display text-2xl text-ink">선택한 위치</h2>
          </header>

          {!hasPicked ? (
            <p className="rounded-2xl border border-dashed border-line bg-bg-2/40 p-5 leading-relaxed text-ink-soft">
              위 검색창에 <strong className="text-ink">주소 또는 도로명</strong>을 입력해 선택하거나,
              지도를 직접 클릭해 필지를 지정하세요.
            </p>
          ) : (
            <dl className="space-y-4">
              <InfoRow label="지번" loading={isGeocoding} value={address ?? "확인 불가"} />
              <InfoRow label="도로명" loading={isGeocoding} value={roadAddress ?? "확인 불가"} />
              <InfoRow
                label="좌표"
                mono
                value={`${latitude?.toFixed(5)}, ${longitude?.toFixed(5)}`}
              />
            </dl>
          )}

          {geocodeError ? (
            <p role="alert" className="mt-4 rounded-xl border border-red-500/40 bg-red-50 p-3 text-xs text-red-700">
              {geocodeError.message}
            </p>
          ) : null}
        </aside>
      </div>

      <p className="text-center text-[11px] leading-relaxed text-ink-faint md:text-xs">
        지도 위를 <strong className="text-ink">클릭</strong>하면 핀을 그 자리로 옮기고, 주소는 자동으로 다시 찾아드려요.
      </p>
    </div>
  );
};

type InfoRowProps = {
  label: string;
  value: string;
  loading?: boolean;
  mono?: boolean;
};

const InfoRow = ({ label, value, loading, mono }: InfoRowProps) => (
  <div className="min-w-0">
    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
    <dd className={`mt-1 break-words text-ink ${mono ? "font-mono text-xs" : ""}`}>
      {loading ? <span className="text-ink-faint">조회 중…</span> : value}
    </dd>
  </div>
);
