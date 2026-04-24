"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZONE_TYPES } from "@/features/project-wizard/constants";
import { siteInfoSchema, type SiteInfoFormValues } from "@/features/project-wizard/schemas/siteInfo.schema";
import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";

const fieldControlClass =
  "block w-full min-w-0 rounded-2xl border border-line bg-paper px-4 py-3 text-[15px] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] outline-none transition placeholder:text-ink-decorative focus:border-ink focus:shadow-[0_10px_24px_-18px_rgba(21,20,15,0.45)]";

const selectChevronClass =
  "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2315140F%22 stroke-width=%221.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:12px_12px] bg-[position:right_1rem_center] bg-no-repeat pr-10";

export const SiteInfoForm = () => {
  const draft = useProjectDraftStore();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<SiteInfoFormValues>({
    resolver: zodResolver(siteInfoSchema),
    mode: "onChange",
    defaultValues: {
      siteArea: draft.siteArea ?? undefined,
      far: draft.far ?? undefined,
      bcr: draft.bcr ?? undefined,
      zoning: draft.zoning ?? "",
      floorsAbove: draft.floorsAbove ?? undefined,
      floorsBelow: draft.floorsBelow ?? 0,
    },
  });

  const values = watch();

  useEffect(() => {
    draft.setSiteMetrics({
      siteArea: Number.isFinite(values.siteArea) ? values.siteArea : null,
      far: Number.isFinite(values.far) ? values.far : null,
      bcr: Number.isFinite(values.bcr) ? values.bcr : null,
      zoning: values.zoning || null,
      floorsAbove: Number.isFinite(values.floorsAbove) ? values.floorsAbove : null,
      floorsBelow: Number.isFinite(values.floorsBelow) ? values.floorsBelow : 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.siteArea, values.far, values.bcr, values.zoning, values.floorsAbove, values.floorsBelow]);

  return (
    <form
      className="grid gap-x-6 gap-y-7 md:grid-cols-2"
      onSubmit={(e) => e.preventDefault()}
      noValidate
    >
      <Field label="대지면적" unit="평" error={errors.siteArea?.message}>
        <input
          type="number"
          step="0.01"
          inputMode="decimal"
          className={fieldControlClass}
          placeholder="500"
          {...register("siteArea", { valueAsNumber: true })}
        />
      </Field>

      <Field label="용도지역" error={errors.zoning?.message}>
        <select className={`${fieldControlClass} ${selectChevronClass}`} {...register("zoning")}>
          <option value="">선택하세요</option>
          {ZONE_TYPES.map((z) => (
            <option key={z.id} value={z.label}>
              {z.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="용적률" unit="%" error={errors.far?.message}>
        <input
          type="number"
          step="1"
          inputMode="numeric"
          className={fieldControlClass}
          placeholder="800"
          {...register("far", { valueAsNumber: true })}
        />
      </Field>

      <Field label="건폐율" unit="%" error={errors.bcr?.message}>
        <input
          type="number"
          step="1"
          inputMode="numeric"
          className={fieldControlClass}
          placeholder="60"
          {...register("bcr", { valueAsNumber: true })}
        />
      </Field>

      <Field label="지상 층수" unit="F" error={errors.floorsAbove?.message}>
        <input
          type="number"
          step="1"
          inputMode="numeric"
          className={fieldControlClass}
          placeholder="20"
          {...register("floorsAbove", { valueAsNumber: true })}
        />
      </Field>

      <Field label="지하 층수" unit="B" error={errors.floorsBelow?.message}>
        <input
          type="number"
          step="1"
          inputMode="numeric"
          className={fieldControlClass}
          placeholder="0"
          {...register("floorsBelow", { valueAsNumber: true })}
        />
      </Field>
    </form>
  );
};

type FieldProps = {
  label: string;
  unit?: string;
  error?: string;
  children: React.ReactNode;
};

const Field = ({ label, unit, error, children }: FieldProps) => (
  <label className="block min-w-0 space-y-2.5">
    <span className="flex items-baseline justify-between gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </span>
      {unit ? (
        <span className="font-display text-[15px] italic leading-none text-ink-faint">
          {unit}
        </span>
      ) : null}
    </span>
    {children}
    {error ? (
      <span className="block text-xs text-red-700" role="alert">
        {error}
      </span>
    ) : null}
  </label>
);
