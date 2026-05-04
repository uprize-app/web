"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

import { BUILDING_USE_OPTIONS } from "../../constants/buildingUse";
import {
  formatPyeongRange,
  getAreaBandViolation,
  pyeongToSqm,
  SITE_AREA_BAND_LABELS,
  SITE_AREA_BAND_RANGES,
  sqmToPyeong,
} from "../../lib/siteAreaBand";
import {
  formatZoningRuleSummary,
  getZoningDefaults,
  getZoningLimitWarning,
  ZONING_OPTIONS,
} from "../../lib/zoningRules";
import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import { WizardStepHead } from "../WizardStepHead";

const TOAST_DISMISS_MS = 5000;

export const Step3SiteInfo = () => {
  const { background, siteInfo, setSiteInfo } = useWizardDraftStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const areaPyeong = siteInfo.areaSqm > 0 ? sqmToPyeong(siteInfo.areaSqm) : 0;
  const selectedSizeBand = background?.sizeBand;
  const selectedAreaRange = selectedSizeBand
    ? SITE_AREA_BAND_RANGES[selectedSizeBand]
    : null;
  const areaHelp = selectedSizeBand
    ? `선택한 현장 이미지 기준: ${SITE_AREA_BAND_LABELS[selectedSizeBand]} ${formatPyeongRange(selectedSizeBand)}`
    : "현장 이미지를 먼저 선택하면 권장 평수 범위를 확인할 수 있습니다.";
  const zoningRuleSummary = formatZoningRuleSummary(siteInfo.zoning);

  useEffect(
    () => () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    },
    [],
  );

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(
      () => setToastMessage(null),
      TOAST_DISMISS_MS,
    );
  };

  const handleAreaPyeongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");

    if (raw === "") {
      setSiteInfo({ areaSqm: 0 });
      return;
    }

    const value = Number(raw);
    const violation = selectedSizeBand
      ? getAreaBandViolation(selectedSizeBand, value)
      : null;

    if (violation?.kind === "too-large") {
      showToast(violation.message);
      return;
    }

    if (violation?.kind === "too-small") {
      setSiteInfo({ areaSqm: pyeongToSqm(value) });
      if (
        selectedAreaRange &&
        raw.length >= String(selectedAreaRange.min - 1).length
      ) {
        showToast(violation.message);
      }
      return;
    }

    setSiteInfo({ areaSqm: pyeongToSqm(value) });
    setToastMessage(null);
  };

  const handleAreaPyeongBlur = () => {
    if (!selectedSizeBand) return;

    const violation = getAreaBandViolation(selectedSizeBand, areaPyeong);
    if (!violation) return;

    showToast(violation.message);
    if (violation.kind === "too-small") setSiteInfo({ areaSqm: 0 });
  };

  const handleBuildingUseChange = (value: string) => {
    if (!value) return;

    if (value === "hotel") {
      setSiteInfo({ use: "hotel" });
      return;
    }

    showToast("아직 개발중입니다. MVP에서는 호텔만 선택할 수 있습니다.");
  };

  const handleZoningChange = (zoning: string) => {
    const defaults = getZoningDefaults(zoning);

    setSiteInfo({
      zoning,
      ...(defaults ?? {}),
    });
    setToastMessage(null);
  };

  const handleLimitNumberChange = (
    key: "bcr" | "far",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    const value = raw === "" ? 0 : Number(raw);

    setSiteInfo({ [key]: value });

    const warning = getZoningLimitWarning(siteInfo.zoning, key, value);
    if (warning) {
      showToast(warning);
      return;
    }

    setToastMessage(null);
  };

  const handleBcrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleLimitNumberChange("bcr", e);
  };

  const handleFarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleLimitNumberChange("far", e);
  };

  const handleFloorChange = (
    key: "floorsAbove" | "floorsBelow",
    max: number,
    message: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const value = raw === "" ? 0 : Number(raw);

    if (value > max) {
      showToast(message);
      return;
    }

    setSiteInfo({ [key]: value });
    setToastMessage(null);
  };

  const handleFloorsAboveChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleFloorChange(
      "floorsAbove",
      100,
      "지상층은 100층을 초과해 입력할 수 없습니다.",
      e,
    );
  };

  const handleFloorsBelowChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleFloorChange(
      "floorsBelow",
      10,
      "조감도 기준 지하층은 10층까지만 입력할 수 있습니다.",
      e,
    );
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

      {toastMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-5 right-5 top-20 z-50 flex items-start gap-2.5 rounded-md border border-burn-200 bg-white px-4 py-3 text-[13px] text-ink shadow-lift sm:left-auto sm:right-6 sm:top-24 sm:w-[360px]"
        >
          <AlertCircle
            size={16}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-burn-500"
          />
          <span>{toastMessage}</span>
        </div>
      ) : null}

      <div className="grid max-w-[800px] grid-cols-1 gap-6 md:grid-cols-2">
        <Field
          label="대지면적"
          unit="평"
          value={areaPyeong}
          min={selectedAreaRange?.min}
          max={selectedAreaRange?.max ?? undefined}
          inputMode="numeric"
          onChange={handleAreaPyeongChange}
          onBlur={handleAreaPyeongBlur}
          help={areaHelp}
        />

        <FieldSelect
          label="용도지역"
          value={siteInfo.zoning}
          onValueChange={handleZoningChange}
          options={ZONING_OPTIONS}
          help={
            zoningRuleSummary ??
            "용도지역을 선택하면 건폐율/용적률 기본값이 자동 입력됩니다."
          }
        />

        <Field
          label="건폐율"
          unit="%"
          value={siteInfo.bcr}
          onChange={handleBcrChange}
          help={
            zoningRuleSummary
              ? "상한 초과 입력은 가능하지만 인허가 검토가 필요합니다."
              : undefined
          }
        />
        <Field
          label="용적률"
          unit="%"
          value={siteInfo.far}
          onChange={handleFarChange}
          help={
            zoningRuleSummary
              ? "상한 초과 입력은 가능하지만 인허가 검토가 필요합니다."
              : undefined
          }
        />
        <Field
          label="지상층"
          unit="F"
          value={siteInfo.floorsAbove}
          max={100}
          inputMode="numeric"
          onChange={handleFloorsAboveChange}
        />
        <Field
          label="지하층"
          unit="F"
          value={siteInfo.floorsBelow}
          max={10}
          inputMode="numeric"
          onChange={handleFloorsBelowChange}
        />

        <div className="md:col-span-2">
          <span className="block pb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-50">
            주 용도
          </span>
          <ToggleGroup
            type="single"
            value="hotel"
            onValueChange={handleBuildingUseChange}
          >
            {BUILDING_USE_OPTIONS.map((o) => (
              <ToggleGroupItem
                key={o.value}
                value={o.value}
                className={
                  o.value === "hotel"
                    ? undefined
                    : "relative text-ink-40 data-[state=on]:bg-white data-[state=on]:text-ink-40"
                }
              >
                <span>{o.label}</span>
                {o.value === "hotel" ? null : (
                  <span className="ml-1.5 rounded-full bg-paper-2 px-1.5 py-0.5 text-[10px] font-medium text-ink-50">
                    준비중
                  </span>
                )}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

    </div>
  );
};

type FieldNumProps = {
  label: string;
  unit: string;
  value: number;
  min?: number;
  max?: number;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  help?: string;
};

const Field = ({
  label,
  unit,
  value,
  min,
  max,
  inputMode = "decimal",
  onChange,
  onBlur,
  help,
}: FieldNumProps) => {
  const [focused, setFocused] = useState(false);
  const showZeroPlaceholder = value === 0;

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-50">
        {label}
      </label>
      <div className="relative">
        <Input
          value={showZeroPlaceholder ? "" : value}
          placeholder={showZeroPlaceholder && !focused ? "0" : undefined}
          min={min}
          max={max}
          inputMode={inputMode}
          onFocus={() => setFocused(true)}
          onChange={onChange}
          onBlur={handleBlur}
          className="pr-12 placeholder:text-ink-40"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[13px] text-ink-50">
          {unit}
        </span>
      </div>
      {help ? <span className="text-[12px] text-ink-50">{help}</span> : null}
    </div>
  );
};

type FieldSelectProps = {
  label: string;
  value: string;
  options: readonly string[];
  onValueChange: (value: string) => void;
  help?: string;
};

const FieldSelect = ({
  label,
  value,
  options,
  onValueChange,
  help,
}: FieldSelectProps) => {
  const [open, setOpen] = useState(false);
  const listboxId = "zoning-select-options";
  const mergedOptions =
    value && !options.includes(value) ? [value, ...options] : options;

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
  };

  const handleSelect = (option: string) => {
    onValueChange(option);
    setOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-2" onBlur={handleBlur}>
      <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-50">
        {label}
      </label>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
        className="flex h-12 w-full items-center justify-between gap-3 rounded-md border border-line bg-white px-4 text-left text-[15px] text-ink shadow-none outline-none transition-all hover:border-ink focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10"
      >
        <span className={value ? "text-ink" : "text-ink-50"}>
          {value || "용도지역 선택"}
        </span>
        <ChevronDown
          size={17}
          strokeWidth={2}
          className={
            open
              ? "shrink-0 rotate-180 text-ink transition-transform duration-200 ease-out-expo"
              : "shrink-0 text-ink-50 transition-transform duration-200 ease-out-expo"
          }
        />
      </button>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-[72px] z-40 max-h-[260px] overflow-y-auto rounded-md border border-line bg-white p-1 shadow-lift"
        >
          {mergedOptions.map((option) => {
            const selected = option === value;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => handleSelect(option)}
                className={
                  selected
                    ? "flex w-full items-center justify-between rounded-sm bg-ink px-3 py-2.5 text-left text-[13px] font-medium text-paper"
                    : "flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-[13px] text-ink-70 transition-colors hover:bg-paper-2 hover:text-ink"
                }
              >
                <span>{option}</span>
                {selected ? <Check size={14} strokeWidth={2} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}

      {help ? <span className="text-[12px] text-ink-50">{help}</span> : null}
    </div>
  );
};
