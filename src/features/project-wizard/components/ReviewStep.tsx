"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { HOTEL_STYLES } from "@/features/project-wizard/constants";
import { buildCreatePayload, DraftIncompleteError } from "@/features/project-wizard/lib/buildCreatePayload";
import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";
import { useCreateProject } from "@/features/project-list/hooks/useCreateProject.query";
import { isAllowedImageUrl } from "@/shared/lib/imageHost";

const summaryRowClass =
  "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-3 text-sm last:border-b-0";

export const ReviewStep = () => {
  const router = useRouter();
  const draft = useProjectDraftStore();
  const reset = useProjectDraftStore((s) => s.reset);
  const createProject = useCreateProject();
  const [missing, setMissing] = useState<string[] | null>(null);

  const styleLabel = useMemo(
    () => HOTEL_STYLES.find((s) => s.id === draft.designStyle)?.label ?? draft.designStyle ?? "—",
    [draft.designStyle],
  );

  const canPreview = isAllowedImageUrl(draft.siteImageUrl);

  const handleSubmit = async () => {
    try {
      setMissing(null);
      const payload = buildCreatePayload(draft);
      const project = await createProject.mutateAsync(payload);
      reset();
      router.push(`/studio/${project.id}/result`);
    } catch (err: unknown) {
      if (err instanceof DraftIncompleteError) {
        setMissing(err.missing);
      }
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <aside className="overflow-hidden rounded-2xl border border-line bg-paper">
        {canPreview && draft.siteImageUrl ? (
          <div className="relative aspect-[4/3]">
            <Image src={draft.siteImageUrl} alt="선택한 배경" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center text-sm text-ink-faint">
            배경 미리보기 없음
          </div>
        )}
        <div className="space-y-1 p-5 text-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">Style</p>
          <p className="text-lg font-semibold text-ink">{styleLabel}</p>
        </div>
      </aside>

      <div>
        <h2 className="mb-4 text-sm uppercase tracking-[0.25em] text-ink-soft">입력 요약</h2>
        <dl className="rounded-2xl border border-line bg-paper p-5">
          <Row label="주소">{draft.address ?? "—"}</Row>
          <Row label="도로명">{draft.roadAddress ?? "—"}</Row>
          <Row label="좌표">
            {draft.latitude !== null && draft.longitude !== null
              ? `${draft.latitude.toFixed(5)}, ${draft.longitude.toFixed(5)}`
              : "—"}
          </Row>
          <Row label="대지면적">{draft.siteArea !== null ? `${draft.siteArea} 평` : "—"}</Row>
          <Row label="용적률 / 건폐율">
            {draft.far !== null && draft.bcr !== null ? `${draft.far}% / ${draft.bcr}%` : "—"}
          </Row>
          <Row label="용도지역">{draft.zoning ?? "—"}</Row>
          <Row label="층수 (지상/지하)">
            {draft.floorsAbove !== null ? `${draft.floorsAbove}F / B${draft.floorsBelow}` : "—"}
          </Row>
          <Row label="주변환경">{draft.surroundings.length ? draft.surroundings.join(" · ") : "—"}</Row>
          <Row label="용도">호텔</Row>
        </dl>

        {missing ? (
          <p role="alert" className="mt-4 rounded-xl border border-amber-500/40 bg-amber-50 p-3 text-xs text-amber-700">
            아직 채워지지 않은 항목이 있어요: {missing.join(", ")}. 이전 단계에서 입력해 주세요.
          </p>
        ) : null}

        {createProject.isError ? (
          <p role="alert" className="mt-4 rounded-xl border border-red-500/40 bg-red-50 p-3 text-xs text-red-700">
            {createProject.error instanceof Error ? createProject.error.message : "프로젝트 저장에 실패했어요."}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={createProject.isPending}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-paper shadow-[0_16px_36px_-18px_rgba(21,20,15,0.55)] transition hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
        >
          {createProject.isPending ? "저장 중…" : "프로젝트 생성"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
};

type RowProps = {
  label: string;
  children: React.ReactNode;
};

const Row = ({ label, children }: RowProps) => (
  <div className={summaryRowClass}>
    <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
      {label}
    </dt>
    <dd className="min-w-0 flex-1 break-words text-right text-ink">{children}</dd>
  </div>
);
