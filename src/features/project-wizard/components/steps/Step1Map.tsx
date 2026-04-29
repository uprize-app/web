"use client";

import { useState } from "react";

import { AddressSearch } from "@/features/site-selection/components/AddressSearch";
import { KakaoMapView } from "@/features/site-selection/components/KakaoMapView";
import { reverseGeocode } from "@/features/site-selection/hooks/useReverseGeocode";

import { DEFAULT_MAP_CENTER } from "../../constants/mockLot";
import { formatArea, formatNumber } from "../../lib/format";
import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import type { LotSummary } from "../../types/wizard.types";

import { WizardStepHead } from "../WizardStepHead";

/**
 * 지도/검색 결과 → LotSummary.
 * VWorld(지목/면적/용도지역 등) 백엔드 연결 전엔 placeholder 값을 0/빈문자열로 둠.
 */
const buildLotFromPick = (params: {
  jibun: string;
  fullAddress: string;
  roadAddress: string | null;
  lat: number;
  lng: number;
}): LotSummary => ({
  jibun: params.jibun,
  address: params.fullAddress,
  roadAddress: params.roadAddress,
  coords: { lat: params.lat, lng: params.lng },
  jimok: "",
  areaSqm: 0,
  zoning: "",
  bcrLimit: 0,
  farLimit: 0,
  groundLevel: "",
});

export const Step1Map = () => {
  const lot = useWizardDraftStore((s) => s.lot);
  const setLot = useWizardDraftStore((s) => s.setLot);
  const [error, setError] = useState<string | null>(null);

  const center = lot?.coords ?? DEFAULT_MAP_CENTER;

  const handlePickCoords = async (lat: number, lng: number) => {
    setError(null);
    try {
      const geo = await reverseGeocode(lat, lng);
      if (!geo) {
        setError("이 좌표의 주소를 확인할 수 없습니다.");
        return;
      }
      setLot(
        buildLotFromPick({
          jibun: geo.jibun,
          fullAddress: geo.fullAddress,
          roadAddress: geo.roadAddress,
          lat,
          lng,
        }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "역지오코딩 실패");
    }
  };

  const handlePickAddress = (params: {
    placeName: string;
    address: string;
    roadAddress: string;
    lat: number;
    lng: number;
  }) => {
    setError(null);
    setLot(
      buildLotFromPick({
        jibun: params.placeName,
        fullAddress: params.address || params.placeName,
        roadAddress: params.roadAddress || null,
        lat: params.lat,
        lng: params.lng,
      }),
    );
  };

  const hasFullInfo = !!lot && lot.areaSqm > 0;
  const jibunHead = lot ? (lot.jibun.split(" ")[0] ?? lot.jibun) : "";
  const jibunTail = lot ? lot.jibun.split(" ").slice(1).join(" ") : "";

  return (
    <div className="animate-fade-up">
      <WizardStepHead
        step={1}
        title={
          <>
            필지를 <em className="not-italic display-italic text-burn-500">선택</em>
            하세요.
          </>
        }
        description="지도에서 사업 대상 필지를 클릭하면 지번과 면적이 자동으로 인식됩니다."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:h-[540px]">
        {/* Map area */}
        <div className="relative overflow-hidden rounded-md border border-line bg-paper-2 lg:h-full">
          <KakaoMapView
            center={center}
            onPickCoords={handlePickCoords}
            className="relative h-full pb-[60%] lg:pb-0"
          />

          <div className="pointer-events-none absolute inset-x-4 top-4 z-10">
            <AddressSearch
              defaultValue={lot?.address ?? ""}
              onPick={handlePickAddress}
              className="pointer-events-auto"
            />
          </div>

          {error ? (
            <div className="absolute inset-x-4 bottom-4 z-10 rounded-md border border-burn-200 bg-burn-50 px-4 py-2.5 text-[12px] text-burn-700 shadow-soft">
              {error}
            </div>
          ) : null}
        </div>

        {/* Side — 선택 전 / 선택 후 */}
        <div className="flex flex-col gap-4">
          <div className="rounded-md border border-line bg-white p-[22px]">
            {lot ? (
              <>
                <h4 className="display-italic mb-1 text-[22px] tracking-[-0.01em]">
                  {jibunHead}{" "}
                  {jibunTail ? (
                    <span className="display-italic text-burn-500">{jibunTail}</span>
                  ) : null}
                </h4>
                <p className="mb-[18px] text-[13px] text-ink-50">{lot.address}</p>

                {hasFullInfo ? (
                  <dl className="flex flex-col gap-2.5">
                    <Row dt="지목" dd={lot.jimok || "—"} />
                    <Row dt="대지면적" dd={formatArea(lot.areaSqm)} />
                    <Row dt="용도지역" dd={lot.zoning || "—"} />
                    <Row dt="건폐율 한도" dd={`${formatNumber(lot.bcrLimit)}%`} />
                    <Row dt="용적률 한도" dd={`${formatNumber(lot.farLimit)}%`} />
                    <Row dt="지반고" dd={lot.groundLevel || "—"} />
                  </dl>
                ) : (
                  <div className="rounded-md border border-dashed border-line bg-paper-2 px-4 py-4 text-[12px] leading-relaxed text-ink-50">
                    필지 상세 정보(지목·면적·용도지역 등)는 백엔드 연결 후 자동으로 불러옵니다.
                    다음 단계에서 직접 입력 가능합니다.
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-50">
                  필지 미선택
                </div>
                <p className="text-[13px] text-ink-50">
                  지도를 클릭하거나 주소를 검색해 사업 대상 필지를 선택하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ dt, dd }: { dt: string; dd: string }) => (
  <div className="flex justify-between text-[13px]">
    <dt className="text-ink-50">{dt}</dt>
    <dd className="font-medium">{dd}</dd>
  </div>
);
