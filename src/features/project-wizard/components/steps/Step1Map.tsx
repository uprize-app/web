"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { MapMockSvg } from "../svg/MapMockSvg";
import { MOCK_LOT, RECENT_SEARCHES } from "../../constants/mockLot";
import { formatArea, formatNumber } from "../../lib/format";
import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import { WizardStepHead } from "../WizardStepHead";

export const Step1Map = () => {
  const lot = useWizardDraftStore((s) => s.lot) ?? MOCK_LOT;

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
        {/* Map area (mock SVG) */}
        <div className="relative overflow-hidden rounded-md border border-line bg-paper-2 lg:h-full">
          <div className="relative pb-[60%] lg:pb-0 lg:h-full">
            <MapMockSvg />
          </div>

          <div className="pointer-events-none absolute inset-x-4 top-4 z-10">
            <div className="pointer-events-auto relative">
              <Search
                className="absolute left-[18px] top-1/2 -translate-y-1/2 text-ink-50"
                size={16}
                strokeWidth={1.4}
              />
              <Input
                type="text"
                defaultValue={lot.address}
                placeholder="주소·지번을 검색하세요 (예: 서울 강남구 역삼동 123-4)"
                className="h-12 pl-12 shadow-soft"
              />
            </div>
          </div>
        </div>

        {/* Side */}
        <div className="flex flex-col gap-4">
          <div className="rounded-md border border-line bg-white p-[22px]">
            <h4 className="display-italic mb-1 text-[22px] tracking-[-0.01em]">
              {lot.jibun.split(" ")[0]}{" "}
              <span className="display-italic text-burn-500">
                {lot.jibun.split(" ")[1]}
              </span>
            </h4>
            <p className="mb-[18px] text-[13px] text-ink-50">{lot.address}</p>
            <dl className="flex flex-col gap-2.5">
              <Row dt="지목" dd={lot.jimok} />
              <Row dt="대지면적" dd={formatArea(lot.areaSqm)} />
              <Row dt="용도지역" dd={lot.zoning} />
              <Row dt="건폐율 한도" dd={`${formatNumber(lot.bcrLimit)}%`} />
              <Row dt="용적률 한도" dd={`${formatNumber(lot.farLimit)}%`} />
              <Row dt="지반고" dd={lot.groundLevel} />
            </dl>
          </div>

          <div>
            <h5 className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
              최근 검색
            </h5>
            <ul className="flex flex-col">
              {RECENT_SEARCHES.map((r) => (
                <li
                  key={r.jibun}
                  className="cursor-pointer border-t border-line py-3 text-[13px] transition hover:text-burn-500"
                >
                  {r.jibun}
                  <div className="text-[12px] text-ink-50">{r.tag}</div>
                </li>
              ))}
            </ul>
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
