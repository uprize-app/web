"use client";

import { Input } from "@/components/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

import { BUILDING_USE_OPTIONS } from "../../constants/buildingUse";
import {
  computeMaxBuildArea,
  computeMaxFloorArea,
  estimateBudgetEokWon,
  estimateRooms,
  formatNumber,
} from "../../lib/format";
import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import type { BuildingUse } from "../../types/wizard.types";

import { WizardStepHead } from "../WizardStepHead";

export const Step3SiteInfo = () => {
  const { siteInfo, setSiteInfo } = useWizardDraftStore();

  const maxBuildArea = computeMaxBuildArea(siteInfo.areaSqm, siteInfo.bcr);
  const maxFloorArea = computeMaxFloorArea(siteInfo.areaSqm, siteInfo.far);
  const roomCount = estimateRooms(maxFloorArea);
  const budgetEok = estimateBudgetEokWon(maxFloorArea);

  const onNumChange =
    (key: keyof typeof siteInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^\d.]/g, "");
      const value = raw === "" ? 0 : Number(raw);
      setSiteInfo({ [key]: value } as Partial<typeof siteInfo>);
    };

  return (
    <div className="animate-fade-up">
      <WizardStepHead
        step={3}
        title={
          <>
            필지 <em className="not-italic display-italic text-burn-500">정보</em>
            를 입력합니다.
          </>
        }
        description="지도에서 자동 인식된 정보 외에, 사업 계획에 맞춰 미세 조정하세요."
      />

      <div className="grid max-w-[800px] grid-cols-1 gap-6 md:grid-cols-2">
        <Field
          label="대지면적"
          unit="㎡"
          value={siteInfo.areaSqm}
          onChange={onNumChange("areaSqm")}
          help="자동 인식: 1,240.5㎡ · 지적도 기준"
        />

        <FieldText
          label="용도지역"
          value={siteInfo.zoning}
          onChange={(e) => setSiteInfo({ zoning: e.target.value })}
          help="한도 — 건폐율 60% / 용적률 800%"
        />

        <Field
          label="건폐율"
          unit="%"
          value={siteInfo.bcr}
          onChange={onNumChange("bcr")}
        />
        <Field
          label="용적률"
          unit="%"
          value={siteInfo.far}
          onChange={onNumChange("far")}
        />
        <Field
          label="지상층"
          unit="F"
          value={siteInfo.floorsAbove}
          onChange={onNumChange("floorsAbove")}
        />
        <Field
          label="지하층"
          unit="F"
          value={siteInfo.floorsBelow}
          onChange={onNumChange("floorsBelow")}
        />

        <div className="md:col-span-2">
          <span className="block pb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-50">
            주 용도
          </span>
          <ToggleGroup
            type="single"
            value={siteInfo.use}
            onValueChange={(v) => v && setSiteInfo({ use: v as BuildingUse })}
          >
            {BUILDING_USE_OPTIONS.map((o) => (
              <ToggleGroupItem key={o.value} value={o.value}>
                {o.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="mt-8 max-w-[800px] rounded-md border border-line bg-paper-2 p-6">
        <div className="flex justify-between border-b border-line pb-3.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-50">
          <span>자동 계산 결과</span>
          <span>설계 한도 기준</span>
        </div>
        <div className="mt-1.5 space-y-2">
          <CalcRow label="건축면적 (max)" value={`${formatNumber(maxBuildArea)} ㎡`} />
          <CalcRow
            label="연면적 (max)"
            value={
              <em className="display-italic not-italic text-burn-500">
                {formatNumber(maxFloorArea)} ㎡
              </em>
            }
          />
          <CalcRow
            label="예상 객실 수 (호텔)"
            value={`약 ${formatNumber(roomCount)} 실`}
          />
          <CalcRow
            label="예상 사업비"
            value={`${formatNumber(budgetEok)} 억 원`}
          />
        </div>
      </div>
    </div>
  );
};

type FieldNumProps = {
  label: string;
  unit: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  help?: string;
};

const Field = ({ label, unit, value, onChange, help }: FieldNumProps) => (
  <div className="flex flex-col gap-2">
    <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-50">
      {label}
    </label>
    <div className="relative">
      <Input value={value} onChange={onChange} className="pr-12" />
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[13px] text-ink-50">
        {unit}
      </span>
    </div>
    {help ? <span className="text-[12px] text-ink-50">{help}</span> : null}
  </div>
);

type FieldTextProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  help?: string;
};

const FieldText = ({ label, value, onChange, help }: FieldTextProps) => (
  <div className="flex flex-col gap-2">
    <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-50">
      {label}
    </label>
    <Input value={value} onChange={onChange} />
    {help ? <span className="text-[12px] text-ink-50">{help}</span> : null}
  </div>
);

const CalcRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between py-2 text-[13px]">
    <span>{label}</span>
    <span className="display-italic text-[20px] not-italic text-ink">
      {value}
    </span>
  </div>
);
